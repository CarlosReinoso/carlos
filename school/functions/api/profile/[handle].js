// A member's profile: public card, stats and activity map for anyone; their posts and comments for members.
import { json, fail, currentUser, publicUser, levelOf, isOwner } from "../../_lib/auth.js";
import { AUTHOR, shapePosts } from "../../_lib/feed.js";

export async function onRequestGet({ request, env, params }) {
  const me = await currentUser(request, env);
  const u = await env.DB.prepare("SELECT u.*, m.status AS membership, m.tier, m.joined_at FROM users u LEFT JOIN memberships m ON m.user_id = u.id WHERE u.handle = ?").bind(params.handle).first();
  if (!u || (!isOwner(env, u) && u.membership !== "active" && me?.id !== u.id)) return fail("No member with that name.", 404);
  const yearAgo = Date.now() - 371 * 864e5;
  const [stats, heat, following] = await env.DB.batch([
    env.DB.prepare(
      "SELECT (SELECT COUNT(*) FROM posts WHERE user_id = ?1) + (SELECT COUNT(*) FROM comments WHERE user_id = ?1) contributions, " +
      "(SELECT COUNT(*) FROM follows WHERE followee_id = ?1) followers, (SELECT COUNT(*) FROM follows WHERE follower_id = ?1) following"
    ).bind(u.id),
    // Activity = posts, comments and likes given, per day (UTC).
    env.DB.prepare(
      "SELECT strftime('%Y-%m-%d', created_at / 1000, 'unixepoch') d, COUNT(*) n FROM (" +
      "SELECT created_at FROM posts WHERE user_id = ?1 AND created_at > ?2 UNION ALL SELECT created_at FROM comments WHERE user_id = ?1 AND created_at > ?2 " +
      "UNION ALL SELECT created_at FROM likes WHERE user_id = ?1 AND created_at > ?2) GROUP BY d"
    ).bind(u.id, yearAgo),
    env.DB.prepare("SELECT 1 f FROM follows WHERE follower_id = ? AND followee_id = ?").bind(me?.id || "", u.id),
  ]);
  const out = {
    user: { ...publicUser(u, env), pro: isOwner(env, u) || u.tier === "pro", bio: u.bio, location: u.location, createdAt: u.joined_at || u.created_at, lastActiveAt: u.last_active_at, levelInfo: levelOf(u.points) },
    stats: stats.results[0], heatmap: Object.fromEntries(heat.results.map((r) => [r.d, r.n])),
    following: !!following.results.length, isMe: me?.id === u.id, viewerMember: !!me?.member,
  };
  if (me?.member) {
    const spaces = me.pro ? "('free', 'pro')" : "('free')";
    const [posts, comments] = await env.DB.batch([
      env.DB.prepare(`SELECT p.*, ${AUTHOR} FROM posts p JOIN users u ON u.id = p.user_id WHERE p.user_id = ? AND p.space IN ${spaces} ORDER BY p.created_at DESC LIMIT 20`).bind(u.id),
      env.DB.prepare(`SELECT c.id, c.body, c.like_count, c.created_at, c.post_id, p.title AS post_title, p.category FROM comments c JOIN posts p ON p.id = c.post_id WHERE c.user_id = ? AND p.space IN ${spaces} ORDER BY c.created_at DESC LIMIT 20`).bind(u.id),
    ]);
    out.posts = await shapePosts(env, posts.results, me);
    out.comments = comments.results.map((c) => ({ id: c.id, body: c.body, likes: c.like_count, createdAt: c.created_at, postId: c.post_id, postTitle: c.post_title, category: c.category }));
  }
  return json(out);
}
