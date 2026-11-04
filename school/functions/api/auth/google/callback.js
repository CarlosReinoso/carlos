// Google redirects here. Exchange the code, read the verified e-mail, then sign the user in.
import { getCookie, cookie, normalizeEmail, upsertUser, startSession } from "../../../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url), fail = (e) => Response.redirect(url.origin + "/login/?error=" + e, 302);
  const state = url.searchParams.get("state"), saved = getCookie(request, "sc_oauth");
  if (!state || state !== saved) return fail("state");
  const tok = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: url.searchParams.get("code") || "", client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET, redirect_uri: url.origin + "/api/auth/google/callback", grant_type: "authorization_code" }),
  }).then((r) => r.json());
  if (!tok.access_token) return fail("google");
  const info = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${tok.access_token}` } }).then((r) => r.json());
  if (!info.email || !info.email_verified) return fail("unverified");
  const user = await upsertUser(env, { email: normalizeEmail(info.email), name: info.name || info.given_name, googleSub: info.sub, avatarUrl: info.picture });
  const h = new Headers({ Location: url.origin + (state.split("|")[1] || "/community/") });
  h.append("Set-Cookie", await startSession(env, user.id));
  h.append("Set-Cookie", cookie("sc_oauth", "", 0));
  return new Response(null, { status: 302, headers: h });
}
