// Public numbers for the About cards: members of each space, online now (active in the last 5 minutes), admins.
import { json } from "../_lib/auth.js";

export async function onRequestGet({ env }) {
  const r = await env.DB.prepare(
    "SELECT (SELECT COUNT(*) FROM memberships WHERE status = 'active') members, (SELECT COUNT(*) FROM memberships WHERE status = 'active' AND tier = 'pro') pro, " +
    "(SELECT COUNT(*) FROM users WHERE last_active_at > ?) online"
  ).bind(Date.now() - 5 * 60e3).first();
  return json({ members: r.members, pro: r.pro, online: Math.max(r.online, 1), admins: 1 }, { headers: { "Cache-Control": "public, max-age=60" } });
}
