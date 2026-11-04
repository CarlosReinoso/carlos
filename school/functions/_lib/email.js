// Creates a 6-digit login code for an e-mail address and sends it with Resend.
// Limits: 5 codes per e-mail and 15 per IP address per hour. Codes expire after 15 minutes.
import { sha256 } from "./auth.js";
import { site } from "../../src/site.mjs";

export async function issueCode(env, email, ip) {
  const hourAgo = Date.now() - 3600e3;
  const byEmail = await env.DB.prepare("SELECT COUNT(*) n FROM login_codes WHERE email = ? AND created_at > ?").bind(email, hourAgo).first();
  const byIp = await env.DB.prepare("SELECT COUNT(*) n FROM login_codes WHERE ip = ? AND created_at > ?").bind(ip, hourAgo).first();
  if (byEmail.n >= 5 || byIp.n >= 15) return { error: "Too many codes requested. Please try again in an hour.", status: 429 };

  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1e6).padStart(6, "0");
  await env.DB.prepare("INSERT INTO login_codes (email, code_hash, ip, expires_at, created_at) VALUES (?, ?, ?, ?, ?)").bind(email, await sha256(email + ":" + code), ip, Date.now() + 15 * 60e3, Date.now()).run();

  if (!env.RESEND_API_KEY) {
    // Local development only: hand the code back instead of e-mailing it.
    if (env.DEV_UNLOCK === "1") { console.log(`[dev] login code for ${email}: ${code}`); return { ok: true, devCode: code }; }
    return { error: "E-mail isn't set up yet. Please use Google.", status: 503 };
  }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.EMAIL_FROM || `${site.name} <school@carlosreinoso.co.uk>`,
      to: email,
      subject: `${code} is your ${site.name} login code`,
      text: `Your login code is\n\n${code}\n\nIt expires in 15 minutes. If you didn't ask for it, you can ignore this e-mail.`,
      html: `<p>Your login code is</p><p style="font-size:30px;font-weight:700;letter-spacing:6px">${code}</p><p>It expires in 15 minutes. If you didn't ask for it, you can ignore this e-mail.</p>`,
    }),
  });
  if (!r.ok) return { error: "We couldn't send the e-mail. Please try again or use Google.", status: 502 };
  return { ok: true };
}
