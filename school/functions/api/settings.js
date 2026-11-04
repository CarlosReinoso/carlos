// Edit your own profile: name, handle (your URL), bio, location and photo URL.
import { json, fail, body, guard } from "../_lib/auth.js";
import { owner } from "../../src/site.mjs";

const RESERVED = new Set(["about", "login", "join", "community", "members", "messages", "notifications", "settings", "profile", "api", "u", "admin", "privacy", "terms", owner.handle]);

export async function onRequestPost({ request, env }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  const b = await body(request);
  const name = String(b.name || "").trim().slice(0, 60);
  const bio = String(b.bio || "").trim().slice(0, 300) || null;
  const location = String(b.location || "").trim().slice(0, 60) || null;
  const avatar = String(b.avatar || "").trim().slice(0, 500) || null;
  let handle = String(b.handle || "").trim().toLowerCase();
  if (name.length < 2) return fail("Enter your name.");
  if (avatar && !/^(https:\/\/|\/)[^\s"'<>]+$/.test(avatar)) return fail("The photo must be an https:// link.");
  if (user.owner) handle = owner.handle; // /carlos is built into the site
  else {
    if (!/^[a-z0-9][a-z0-9-]{2,29}$/.test(handle)) return fail("Your handle needs 3–30 letters, numbers or dashes.");
    if (RESERVED.has(handle)) return fail("That handle is taken.");
    const taken = await env.DB.prepare("SELECT 1 FROM users WHERE handle = ? AND id != ?").bind(handle, user.id).first();
    if (taken) return fail("That handle is taken.");
  }
  await env.DB.prepare("UPDATE users SET name = ?, handle = ?, bio = ?, location = ?, avatar_url = ? WHERE id = ?").bind(name, handle, bio, location, avatar, user.id).run();
  return json({ ok: true, handle });
}
