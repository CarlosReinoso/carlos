// GET: your latest notifications. POST { id } marks one read, POST { all: true } marks all read.
import { json, body, guard } from "../_lib/auth.js";
import { authorOf } from "../_lib/feed.js";

export async function onRequestGet({ request, env }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  const rows = await env.DB.prepare(
    "SELECT n.*, u.handle a_handle, u.name a_name, u.avatar_url a_avatar, u.points a_points, u.email a_email, p.title post_title, c.body comment_body " +
    "FROM notifications n LEFT JOIN users u ON u.id = n.actor_id LEFT JOIN posts p ON p.id = n.post_id LEFT JOIN comments c ON c.id = n.comment_id " +
    "WHERE n.user_id = ? ORDER BY n.created_at DESC LIMIT 50"
  ).bind(user.id).all();
  return json({
    notifications: rows.results.map((n) => ({
      id: n.id, type: n.type, read: !!n.read_at, createdAt: n.created_at, postId: n.post_id, commentId: n.comment_id,
      postTitle: n.post_title, snippet: n.comment_body ? n.comment_body.slice(0, 140) : null, actor: n.a_handle ? authorOf(n, env) : null,
    })),
  });
}

export async function onRequestPost({ request, env }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  const b = await body(request);
  if (b.all) await env.DB.prepare("UPDATE notifications SET read_at = ? WHERE user_id = ? AND read_at IS NULL").bind(Date.now(), user.id).run();
  else await env.DB.prepare("UPDATE notifications SET read_at = ? WHERE user_id = ? AND id = ?").bind(Date.now(), user.id, b.id).run();
  return json({ ok: true });
}
