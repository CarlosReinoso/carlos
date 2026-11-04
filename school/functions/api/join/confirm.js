// After Stripe Checkout: verifies the session is paid, then turns on AI Builders Pro.
// The webhook (api/stripe/webhook) does the same thing, so whichever arrives first wins.
// Guest checkouts (no account yet) get an account from the e-mail they gave Stripe and are logged straight in,
// but only if that account was created by this checkout; an existing account still has to log in by code.
import { json, fail, body, currentUser, startSession } from "../../_lib/auth.js";
import { stripe } from "../../_lib/stripe.js";
import { activate, buyerOf } from "../stripe/webhook.js";

const CLAIM_WINDOW = 60 * 60e3;

export async function onRequestPost({ request, env }) {
  const me = await currentUser(request, env);
  const id = String((await body(request)).session_id || "");
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return fail("That payment link isn't valid.");
  let s;
  try { s = await stripe(env, `checkout/sessions/${id}`); } catch { return fail("We couldn't confirm that payment.", 402); }
  if (s.client_reference_id && s.client_reference_id !== me?.id) return fail("That payment belongs to another account.", 403);
  if (s.status !== "complete" || !["paid", "no_payment_required"].includes(s.payment_status)) return fail("That payment hasn't gone through yet.", 402);
  const user = await buyerOf(env, s);
  if (!user) return fail("We couldn't find the e-mail for that payment.", 400);
  await activate(env, s, user.id);
  if (me?.id === user.id) return json({ ok: true });

  const createdByCheckout = user.created_at >= s.created * 1000 && Date.now() - s.created * 1000 < CLAIM_WINDOW;
  if (!createdByCheckout) return json({ ok: true, login: true, email: user.email });
  return json({ ok: true }, { headers: { "Set-Cookie": await startSession(env, user.id) } });
}
