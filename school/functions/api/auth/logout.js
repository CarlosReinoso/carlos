import { json, getCookie, sha256, cookie, SESSION_COOKIE } from "../../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  const t = getCookie(request, SESSION_COOKIE);
  if (t) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(t)).run();
  return json({ ok: true }, { headers: { "Set-Cookie": cookie(SESSION_COOKIE, "", 0) } });
}
