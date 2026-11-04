// Sends a 6-digit login code to an e-mail address.
import { json, fail, body, normalizeEmail, validEmail } from "../../../_lib/auth.js";
import { issueCode } from "../../../_lib/email.js";

export async function onRequestPost({ request, env }) {
  const email = normalizeEmail((await body(request)).email);
  if (!validEmail(email)) return fail("Enter a valid e-mail address.");
  const res = await issueCode(env, email, request.headers.get("CF-Connecting-IP") || "local");
  return res.error ? fail(res.error, res.status) : json(res);
}
