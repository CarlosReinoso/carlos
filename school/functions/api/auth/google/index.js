// Starts "Continue with Google": redirects to Google's consent screen with a CSRF state cookie.
import { randomToken, cookie } from "../../../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.GOOGLE_CLIENT_ID) return Response.redirect(url.origin + "/login/?error=google_not_configured", 302);
  const next = url.searchParams.get("next") || "/community/";
  const state = randomToken(18) + "|" + (next.startsWith("/") && !next.startsWith("//") ? next : "/community/");
  const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  auth.search = new URLSearchParams({ client_id: env.GOOGLE_CLIENT_ID, redirect_uri: url.origin + "/api/auth/google/callback", response_type: "code", scope: "openid email profile", state, prompt: "select_account" });
  return new Response(null, { status: 302, headers: { Location: auth.toString(), "Set-Cookie": cookie("sc_oauth", state, 600) } });
}
