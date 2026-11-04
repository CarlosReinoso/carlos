// Shared helpers for accounts: sessions in an HttpOnly cookie, hashed tokens in D1.
import { owner, levels } from "../../src/site.mjs";

export const SESSION_COOKIE = "sc_sess";
const SESSION_DAYS = 60;

export const json = (data, init = {}) => Response.json(data, { ...init, headers: { "Cache-Control": "no-store", ...(init.headers || {}) } });
export const fail = (error, status = 400) => json({ error }, { status });
export const body = (request) => request.json().catch(() => ({}));

export function randomToken(bytes = 32) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...a)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sha256(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getCookie(request, name) {
  const m = (request.headers.get("Cookie") || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : null;
}

export function cookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export const normalizeEmail = (e) => String(e || "").trim().toLowerCase();
export const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254;

// Owner accounts (ADMIN_EMAILS, comma-separated) run the school: full access, the "carlos" handle, announcements.
export const isOwner = (env, user) => !!user && (env.ADMIN_EMAILS || "").split(",").map(normalizeEmail).filter(Boolean).includes(normalizeEmail(user.email));

// A Skool-style handle: "malik-ahmed-7804". The owner gets the short one from src/site.mjs.
async function freeHandle(env, name, email) {
  const base = (name || email.split("@")[0]).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "member";
  for (let i = 0; i < 5; i++) {
    const h = `${base}-${1000 + (crypto.getRandomValues(new Uint16Array(1))[0] % 9000)}`;
    if (!(await env.DB.prepare("SELECT 1 FROM users WHERE handle = ?").bind(h).first())) return h;
  }
  return `${base}-${randomToken(4).toLowerCase()}`;
}

// Finds the user for an e-mail, creating one if needed. Optionally links a Google account.
export async function upsertUser(env, { email, name, googleSub, avatarUrl }) {
  let u = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
  if (!u) {
    const own = isOwner(env, { email });
    u = {
      id: crypto.randomUUID(), email,
      name: own ? owner.name : name || null,
      handle: own ? owner.handle : await freeHandle(env, name, email),
      bio: own ? owner.bio : null, location: own ? owner.location : null,
      avatar_url: own ? owner.avatar : avatarUrl || null,
      google_sub: googleSub || null, created_at: Date.now(),
    };
    await env.DB.prepare("INSERT INTO users (id, email, name, handle, bio, location, avatar_url, google_sub, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(u.id, u.email, u.name, u.handle, u.bio, u.location, u.avatar_url, u.google_sub, u.created_at).run();
  } else if (googleSub && !u.google_sub) {
    await env.DB.prepare("UPDATE users SET google_sub = ?, name = COALESCE(name, ?), avatar_url = COALESCE(avatar_url, ?) WHERE id = ?").bind(googleSub, name || null, avatarUrl || null, u.id).run();
  }
  return u;
}

export async function startSession(env, userId) {
  const token = randomToken();
  await env.DB.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)").bind(await sha256(token), userId, Date.now() + SESSION_DAYS * 864e5).run();
  return cookie(SESSION_COOKIE, token, SESSION_DAYS * 86400);
}

export async function currentUser(request, env) {
  const token = getCookie(request, SESSION_COOKIE);
  if (!token) return null;
  const u = await env.DB.prepare("SELECT u.*, m.status AS membership, m.tier FROM sessions s JOIN users u ON u.id = s.user_id LEFT JOIN memberships m ON m.user_id = u.id WHERE s.token_hash = ? AND s.expires_at > ?")
    .bind(await sha256(token), Date.now()).first();
  if (!u) return null;
  // "Active 5m ago" and the online count; written at most once a minute per user.
  if (!u.last_active_at || Date.now() - u.last_active_at > 60e3) await env.DB.prepare("UPDATE users SET last_active_at = ? WHERE id = ?").bind(Date.now(), u.id).run();
  u.owner = isOwner(env, u);
  u.member = u.owner || u.membership === "active";
  u.pro = u.owner || (u.member && u.tier === "pro");
  return u;
}

// Resolves the signed-in user for an API route, or returns the Response to send back.
// need: "user" (signed in), "member" (in AI Builders, or the owner) or "pro" (in AI Builders Pro).
export async function guard(request, env, need = "member") {
  const u = await currentUser(request, env);
  if (!u) return { res: fail("Please log in.", 401) };
  if (need !== "user" && !u.member) return { res: fail("Join AI Builders to do that.", 403) };
  if (need === "pro" && !u.pro) return { res: fail("That's in AI Builders Pro.", 403) };
  return { user: u };
}

// Who may read and write in a space ("free" or "pro").
export const canUse = (user, space) => space === "pro" ? !!user?.pro : !!user?.member;

export function levelOf(points) {
  let i = 0;
  while (i + 1 < levels.length && points >= levels[i + 1].at) i++;
  const next = levels[i + 1];
  return { level: i + 1, name: levels[i].name, toNext: next ? next.at - points : 0 };
}

// What anyone may see about a person. Never includes the e-mail.
export const publicUser = (u, env) => u && ({
  handle: u.handle, name: u.name || u.handle, avatar: u.avatar_url || null, points: u.points || 0,
  level: levelOf(u.points || 0).level, owner: env ? isOwner(env, u) : undefined,
});
