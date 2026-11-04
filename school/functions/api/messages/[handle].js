// GET: the conversation with one person (marks their messages to you as read). POST: send them a message.
// Any logged-in account can message members; members can reply to anyone who has messaged them.
import { json, fail, body, guard, publicUser, isOwner } from "../../_lib/auth.js";

async function other(env, handle, me) {
  const u = await env.DB.prepare("SELECT u.*, m.status AS membership FROM users u LEFT JOIN memberships m ON m.user_id = u.id WHERE u.handle = ?").bind(handle).first();
  if (!u) return null;
  if (u.membership === "active" || isOwner(env, u)) return u;
  const talked = await env.DB.prepare("SELECT 1 FROM messages WHERE (sender_id = ?1 AND recipient_id = ?2) OR (sender_id = ?2 AND recipient_id = ?1) LIMIT 1").bind(me.id, u.id).first();
  return talked ? u : null;
}

export async function onRequestGet({ request, env, params }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  const o = await other(env, params.handle, user);
  if (!o) return fail("No member with that name.", 404);
  const since = Number(new URL(request.url).searchParams.get("since")) || 0;
  const [rows] = await env.DB.batch([
    env.DB.prepare("SELECT id, sender_id, body, created_at, read_at FROM messages WHERE ((sender_id = ?1 AND recipient_id = ?2) OR (sender_id = ?2 AND recipient_id = ?1)) AND created_at > ?3 ORDER BY created_at DESC LIMIT 200").bind(user.id, o.id, since),
    env.DB.prepare("UPDATE messages SET read_at = ? WHERE sender_id = ? AND recipient_id = ? AND read_at IS NULL").bind(Date.now(), o.id, user.id),
  ]);
  return json({
    user: { ...publicUser(o, env), lastActiveAt: o.last_active_at },
    messages: rows.results.reverse().map((m) => ({ id: m.id, mine: m.sender_id === user.id, body: m.body, createdAt: m.created_at, read: !!m.read_at })),
  });
}

export async function onRequestPost({ request, env, params }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  const o = await other(env, params.handle, user);
  if (!o) return fail("No member with that name.", 404);
  if (o.id === user.id) return fail("You can't message yourself.");
  const text = String((await body(request)).body || "").trim().slice(0, 5000);
  if (!text) return fail("Write a message first.");
  const recent = await env.DB.prepare("SELECT COUNT(*) n FROM messages WHERE sender_id = ? AND created_at > ?").bind(user.id, Date.now() - 60e3).first();
  if (recent.n >= 20) return fail("You're sending messages very fast. Wait a minute and try again.", 429);
  const m = await env.DB.prepare("INSERT INTO messages (sender_id, recipient_id, body, created_at) VALUES (?, ?, ?, ?) RETURNING id, created_at").bind(user.id, o.id, text, Date.now()).first();
  return json({ message: { id: m.id, mine: true, body: text, createdAt: m.created_at, read: false } });
}
