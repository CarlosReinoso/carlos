// Follow or unfollow someone. Any logged-in account can follow; joining isn't required.
import { json, fail, body, guard } from "../_lib/auth.js";
import { notify } from "../_lib/notify.js";

export async function onRequestPost({ request, env }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  const t = await env.DB.prepare("SELECT id FROM users WHERE handle = ?").bind((await body(request)).handle || "").first();
  if (!t) return fail("No member with that name.", 404);
  if (t.id === user.id) return fail("You can't follow yourself.");
  const had = await env.DB.prepare("SELECT 1 FROM follows WHERE follower_id = ? AND followee_id = ?").bind(user.id, t.id).first();
  if (had) await env.DB.prepare("DELETE FROM follows WHERE follower_id = ? AND followee_id = ?").bind(user.id, t.id).run();
  else await env.DB.batch([
    env.DB.prepare("INSERT INTO follows (follower_id, followee_id, created_at) VALUES (?, ?, ?)").bind(user.id, t.id, Date.now()),
    notify(env, { to: t.id, actor: user.id, type: "follow" }),
  ]);
  const n = await env.DB.prepare("SELECT COUNT(*) c FROM follows WHERE followee_id = ?").bind(t.id).first();
  return json({ following: !had, followers: n.c });
}
