// The member directory (?sort=new|points; points doubles as the leaderboard; ?tier=pro for Pro members only).
// The owner also sees e-mails and join answers.
import { json, guard, publicUser, levelOf, isOwner } from "../_lib/auth.js";
import { owner } from "../../src/site.mjs";

export async function onRequestGet({ request, env }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const p = new URL(request.url).searchParams;
  const order = p.get("sort") === "points" ? "u.points DESC, m.joined_at" : "COALESCE(m.joined_at, m.applied_at, u.created_at) DESC";
  const rows = await env.DB.prepare(
    `SELECT u.*, m.status, m.tier, m.answers, m.joined_at, m.applied_at FROM users u LEFT JOIN memberships m ON m.user_id = u.id ` +
    `WHERE (m.status = 'active'${p.get("tier") === "pro" ? " AND m.tier = 'pro'" : ""}) OR u.handle = ? ORDER BY ${order} LIMIT 500`
  ).bind(owner.handle).all();
  return json({
    members: rows.results.map((u) => ({
      ...publicUser(u, env), pro: isOwner(env, u) || u.tier === "pro", bio: u.bio, location: u.location, levelName: levelOf(u.points).name,
      joinedAt: u.joined_at || u.created_at, lastActiveAt: u.last_active_at,
      ...(user.owner ? { email: u.email, status: u.status, appliedAt: u.applied_at, answers: u.answers ? JSON.parse(u.answers) : null } : {}),
    })),
    owner: user.owner,
  });
}
