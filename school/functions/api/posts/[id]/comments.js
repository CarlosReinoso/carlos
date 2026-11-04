// Adds a comment (or a reply to a comment) and notifies the post's author and the person replied to.
import { json, fail, body, guard, canUse } from "../../../_lib/auth.js";
import { notify } from "../../../_lib/notify.js";

export async function onRequestPost({ request, env, params }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const b = await body(request), text = String(b.body || "").trim().slice(0, 5000);
  if (!text) return fail("Write a comment first.");
  const post = await env.DB.prepare("SELECT id, user_id, space FROM posts WHERE id = ?").bind(params.id).first();
  if (!post) return fail("That post was deleted.", 404);
  if (!canUse(user, post.space)) return fail("That's in AI Builders Pro.", 403);
  const parent = b.parentId ? await env.DB.prepare("SELECT id, user_id FROM comments WHERE id = ? AND post_id = ?").bind(b.parentId, post.id).first() : null;
  const now = Date.now();
  const c = await env.DB.prepare("INSERT INTO comments (post_id, user_id, parent_id, body, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id").bind(post.id, user.id, parent?.id || null, text, now).first();
  await env.DB.batch([
    env.DB.prepare("UPDATE posts SET comment_count = comment_count + 1, last_comment_at = ? WHERE id = ?").bind(now, post.id),
    notify(env, { to: post.user_id, actor: user.id, type: "comment", postId: post.id, commentId: c.id }),
    parent && parent.user_id !== post.user_id && notify(env, { to: parent.user_id, actor: user.id, type: "reply", postId: post.id, commentId: c.id }),
  ].filter(Boolean));
  return json({ id: c.id });
}
