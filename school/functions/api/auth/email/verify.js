// Checks a 6-digit code and starts a session. Each code allows 5 attempts and expires after 15 minutes.
import { json, fail, body, sha256, normalizeEmail, upsertUser, startSession } from "../../../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  const { email: raw, code } = await body(request);
  const email = normalizeEmail(raw);
  const row = await env.DB.prepare("SELECT * FROM login_codes WHERE email = ? AND expires_at > ? ORDER BY created_at DESC LIMIT 1").bind(email, Date.now()).first();
  if (!row || row.attempts >= 5) return fail("That code has expired. Request a new one.");
  if ((await sha256(email + ":" + String(code || "").trim())) !== row.code_hash) {
    await env.DB.prepare("UPDATE login_codes SET attempts = attempts + 1 WHERE id = ?").bind(row.id).run();
    return fail("That code isn't right. Check the e-mail and try again.");
  }
  await env.DB.prepare("DELETE FROM login_codes WHERE email = ?").bind(email).run();
  const user = await upsertUser(env, { email });
  return json({ ok: true }, { headers: { "Set-Cookie": await startSession(env, user.id) } });
}
