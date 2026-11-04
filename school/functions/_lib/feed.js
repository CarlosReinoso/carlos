// Query helpers shared by the feed, post pages and profiles.
import { publicUser } from "./auth.js";

// Selects the author of a post/comment/message (joined as "u") alongside the row.
export const AUTHOR = "u.handle AS a_handle, u.name AS a_name, u.avatar_url AS a_avatar, u.points AS a_points, u.email AS a_email";
export const authorOf = (r, env) => publicUser({ handle: r.a_handle, name: r.a_name, avatar_url: r.a_avatar, points: r.a_points, email: r.a_email }, env);

// Turns post rows into what the client renders: author, whether I liked it, and up to 5 recent commenters.
export async function shapePosts(env, rows, me) {
  if (!rows.length) return [];
  const ids = rows.map((r) => r.id), qs = ids.map(() => "?").join(",");
  const [liked, commenters] = await env.DB.batch([
    env.DB.prepare(`SELECT target_id FROM likes WHERE user_id = ? AND target_type = 'post' AND target_id IN (${qs})`).bind(me?.id || "", ...ids),
    env.DB.prepare(`SELECT c.post_id, ${AUTHOR} FROM comments c JOIN users u ON u.id = c.user_id WHERE c.post_id IN (${qs}) ORDER BY c.created_at DESC`).bind(...ids),
  ]);
  const likedSet = new Set(liked.results.map((r) => r.target_id)), faces = {};
  for (const c of commenters.results) {
    const list = (faces[c.post_id] ||= []);
    if (list.length < 5 && !list.some((f) => f.handle === c.a_handle)) list.push(authorOf(c, env));
  }
  return rows.map((r) => ({
    id: r.id, space: r.space, category: r.category, title: r.title, body: r.body, pinned: !!r.pinned,
    likes: r.like_count, comments: r.comment_count, lastCommentAt: r.last_comment_at, createdAt: r.created_at,
    author: authorOf(r, env), liked: likedSet.has(r.id), commenters: faces[r.id] || [],
  }));
}
