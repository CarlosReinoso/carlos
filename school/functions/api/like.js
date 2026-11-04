// Toggles a like on a post or comment. Each like is a point for the author (not for liking yourself).
import { json, fail, body, guard, canUse } from "../_lib/auth.js";
import { notify } from "../_lib/notify.js";

export async function onRequestPost({ request, env }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const { type, id } = await body(request);
  if (type !== "post" && type !== "comment") return fail("Unknown thing to like.");
  const table = type === "post" ? "posts" : "comments";
  const t = await env.DB.prepare(type === "post" ? "SELECT id, user_id, id AS post_id, space FROM posts WHERE id = ?"
    : "SELECT c.id, c.user_id, c.post_id, p.space FROM comments c JOIN posts p ON p.id = c.post_id WHERE c.id = ?").bind(id).first();
  if (!t) return fail("That was deleted.", 404);
  if (!canUse(user, t.space)) return fail("That's in AI Builders Pro.", 403);
  const had = await env.DB.prepare("SELECT 1 FROM likes WHERE user_id = ? AND target_type = ? AND target_id = ?").bind(user.id, type, t.id).first();
  const d = had ? -1 : 1, self = t.user_id === user.id;
  await env.DB.batch([
    had ? env.DB.prepare("DELETE FROM likes WHERE user_id = ? AND target_type = ? AND target_id = ?").bind(user.id, type, t.id)
        : env.DB.prepare("INSERT INTO likes (user_id, target_type, target_id, author_id, created_at) VALUES (?, ?, ?, ?, ?)").bind(user.id, type, t.id, t.user_id, Date.now()),
    env.DB.prepare(`UPDATE ${table} SET like_count = MAX(0, like_count + ?) WHERE id = ?`).bind(d, t.id),
    !self && env.DB.prepare("UPDATE users SET points = MAX(0, points + ?) WHERE id = ?").bind(d, t.user_id),
    !had && notify(env, { to: t.user_id, actor: user.id, type: "like_" + type, postId: t.post_id, commentId: type === "comment" ? t.id : null }),
  ].filter(Boolean));
  const n = await env.DB.prepare(`SELECT like_count FROM ${table} WHERE id = ?`).bind(t.id).first();
  return json({ liked: !had, likes: n.like_count });
}
