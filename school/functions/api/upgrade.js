// Upgrade to AI Builders Pro: sends anyone to Stripe Checkout. Guests (not logged in) get their account from the
// e-mail they give Stripe (api/join/confirm and the webhook). Env: STRIPE_SECRET_KEY, STRIPE_PRICE_ID (a recurring
// Price for the monthly membership; set STRIPE_MODE=payment for a one-time Price instead).
import { json, fail, currentUser } from "../_lib/auth.js";
import { stripe } from "../_lib/stripe.js";
import { spaces } from "../../src/site.mjs";

export async function onRequestPost({ request, env }) {
  const user = await currentUser(request, env);
  if (user?.pro) return json({ url: "/community/?space=pro" });
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PRICE_ID) return fail("Payments aren't set up yet. Please check back soon.", 503);

  const origin = new URL(request.url).origin, mode = env.STRIPE_MODE === "payment" ? "payment" : "subscription";
  const params = {
    mode,
    "line_items[0][price]": env.STRIPE_PRICE_ID,
    "line_items[0][quantity]": "1",
    success_url: `${origin}/join/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${spaces.pro.slug}/?canceled=1`,
    allow_promotion_codes: "true",
    "custom_text[submit][message]": `${spaces.pro.priceNote} You'll land in ${spaces.pro.name} right after paying.`,
  };
  if (user) {
    const m = await env.DB.prepare("SELECT stripe_customer_id FROM memberships WHERE user_id = ?").bind(user.id).first();
    Object.assign(params, { client_reference_id: user.id, "metadata[user_id]": user.id });
    if (m?.stripe_customer_id) params.customer = m.stripe_customer_id; else params.customer_email = user.email;
    if (mode === "subscription") params["subscription_data[metadata][user_id]"] = user.id;
  }
  if (mode === "payment" && !params.customer) params.customer_creation = "always";
  try {
    const s = await stripe(env, "checkout/sessions", params);
    return json({ url: s.url });
  } catch (e) {
    return fail(e.message, 502);
  }
}
