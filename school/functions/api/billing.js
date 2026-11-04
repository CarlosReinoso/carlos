// Opens the Stripe Customer Portal so a member can update their card or cancel.
import { json, fail, guard } from "../_lib/auth.js";
import { stripe } from "../_lib/stripe.js";

export async function onRequestPost({ request, env }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  const m = await env.DB.prepare("SELECT stripe_customer_id FROM memberships WHERE user_id = ?").bind(user.id).first();
  if (!m?.stripe_customer_id) return fail("There's no billing on this account.", 404);
  try {
    const s = await stripe(env, "billing_portal/sessions", { customer: m.stripe_customer_id, return_url: new URL(request.url).origin + "/settings/" });
    return json({ url: s.url });
  } catch (e) {
    return fail(e.message, 502);
  }
}
