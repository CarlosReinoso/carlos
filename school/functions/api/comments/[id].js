// Deletes a comment (the author or the owner), with its replies.
import { json, fail, guard } from "../../_lib/auth.js";

export async function onRequestDelete({ request, env, params }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const c = await env.DB.prepare("SELECT user_id, post_id FROM comments WHERE id = ?").bind(params.id).first();
  if (!c) return json({ ok: true });
  if (c.user_id !== user.id && !user.owner) return fail("You can only delete your own comments.", 403);
  const ids = (await env.DB.prepare("SELECT id FROM comments WHERE id = ? OR parent_id = ?").bind(params.id, params.id).all()).results.map((r) => r.id);
  const qs = ids.map(() => "?").join(",");
  await env.DB.batch([
    env.DB.prepare(`DELETE FROM likes WHERE target_type = 'comment' AND target_id IN (${qs})`).bind(...ids),
    env.DB.prepare(`DELETE FROM notifications WHERE comment_id IN (${qs})`).bind(...ids),
    env.DB.prepare("DELETE FROM comments WHERE id = ?").bind(params.id),
    env.DB.prepare("UPDATE posts SET comment_count = MAX(0, comment_count - ?) WHERE id = ?").bind(ids.length, c.post_id),
  ]);
  return json({ ok: true });
}
