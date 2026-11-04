// GET: one post with all its comments. PATCH: pin/unpin (owner). DELETE: the author or the owner.
import { json, fail, body, guard, canUse } from "../../_lib/auth.js";
import { AUTHOR, authorOf, shapePosts } from "../../_lib/feed.js";

export async function onRequestGet({ request, env, params }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const row = await env.DB.prepare(`SELECT p.*, ${AUTHOR} FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = ?`).bind(params.id).first();
  if (!row) return fail("That post was deleted.", 404);
  if (!canUse(user, row.space)) return fail("That's in AI Builders Pro.", 403);
  const [comments, liked] = await env.DB.batch([
    env.DB.prepare(`SELECT c.*, ${AUTHOR} FROM comments c JOIN users u ON u.id = c.user_id WHERE c.post_id = ? ORDER BY c.created_at`).bind(params.id),
    env.DB.prepare("SELECT target_id FROM likes WHERE user_id = ? AND target_type = 'comment' AND target_id IN (SELECT id FROM comments WHERE post_id = ?)").bind(user.id, params.id),
  ]);
  const likedSet = new Set(liked.results.map((r) => r.target_id));
  const [post] = await shapePosts(env, [row], user);
  post.mine = row.user_id === user.id;
  post.commentList = comments.results.map((c) => ({
    id: c.id, parentId: c.parent_id, body: c.body, likes: c.like_count, createdAt: c.created_at,
    author: authorOf(c, env), liked: likedSet.has(c.id), mine: c.user_id === user.id,
  }));
  return json({ post });
}

export async function onRequestPatch({ request, env, params }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  if (!user.owner) return fail("Only Carlos can pin posts.", 403);
  await env.DB.prepare("UPDATE posts SET pinned = ? WHERE id = ?").bind((await body(request)).pinned ? 1 : 0, params.id).run();
  return json({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const p = await env.DB.prepare("SELECT user_id FROM posts WHERE id = ?").bind(params.id).first();
  if (!p) return json({ ok: true });
  if (p.user_id !== user.id && !user.owner) return fail("You can only delete your own posts.", 403);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM likes WHERE (target_type = 'post' AND target_id = ?) OR (target_type = 'comment' AND target_id IN (SELECT id FROM comments WHERE post_id = ?))").bind(params.id, params.id),
    env.DB.prepare("DELETE FROM notifications WHERE post_id = ?").bind(params.id),
    env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(params.id),
  ]);
  return json({ ok: true });
}
