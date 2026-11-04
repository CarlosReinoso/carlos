// The inbox: one row per person you've messaged, newest first, with the last message and unread count.
import { json, guard } from "../../_lib/auth.js";
import { authorOf } from "../../_lib/feed.js";

export async function onRequestGet({ request, env }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const rows = await env.DB.prepare(
    "WITH conv AS (SELECT CASE WHEN sender_id = ?1 THEN recipient_id ELSE sender_id END other, MAX(created_at) last_at, " +
    "SUM(CASE WHEN recipient_id = ?1 AND read_at IS NULL THEN 1 ELSE 0 END) unread FROM messages WHERE sender_id = ?1 OR recipient_id = ?1 GROUP BY other) " +
    "SELECT conv.*, u.handle a_handle, u.name a_name, u.avatar_url a_avatar, u.points a_points, u.email a_email, " +
    "(SELECT body FROM messages m WHERE (m.sender_id = ?1 AND m.recipient_id = conv.other) OR (m.sender_id = conv.other AND m.recipient_id = ?1) ORDER BY m.created_at DESC LIMIT 1) last_body " +
    "FROM conv JOIN users u ON u.id = conv.other ORDER BY last_at DESC LIMIT 50"
  ).bind(user.id).all();
  return json({ conversations: rows.results.map((r) => ({ user: authorOf(r, env), lastAt: r.last_at, lastBody: r.last_body, unread: r.unread })) });
}
