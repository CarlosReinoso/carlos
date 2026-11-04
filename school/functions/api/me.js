// Who is signed in, whether they're a member, unread counts for the header, and which login methods are set up.
import { json, currentUser, publicUser, levelOf } from "../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const methods = { google: !!env.GOOGLE_CLIENT_ID, email: !!env.RESEND_API_KEY || env.DEV_UNLOCK === "1" };
  const u = await currentUser(request, env);
  if (!u) return json({ user: null, methods });
  const [n, m] = await env.DB.batch([
    env.DB.prepare("SELECT COUNT(*) c FROM notifications WHERE user_id = ? AND read_at IS NULL").bind(u.id),
    env.DB.prepare("SELECT COUNT(*) c FROM messages WHERE recipient_id = ? AND read_at IS NULL").bind(u.id),
  ]);
  return json({
    user: { ...publicUser(u, env), email: u.email, bio: u.bio, location: u.location, levelInfo: levelOf(u.points) },
    member: u.member, pro: u.pro, owner: u.owner, needsName: !u.name, membership: u.membership || null,
    unread: { notifications: n.results[0].c, messages: m.results[0].c },
    methods,
  });
}
