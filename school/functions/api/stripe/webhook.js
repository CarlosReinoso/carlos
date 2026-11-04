// Stripe webhook: keeps AI Builders Pro in step with payments and subscriptions. Ending a subscription drops
// the member back to AI Builders (free); they stay in the community.
// Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted.
// Env: STRIPE_WEBHOOK_SECRET (whsec_…). Endpoint: https://school.carlosreinoso.co.uk/api/stripe/webhook
import { verifyWebhook, LIVE_STATUSES } from "../../_lib/stripe.js";
import { upsertUser, normalizeEmail, validEmail } from "../../_lib/auth.js";

// The account a paid Checkout Session belongs to: the logged-in buyer (client_reference_id), or for a guest
// checkout the account for the e-mail they typed into Stripe, created if new. Returns null if there's no e-mail.
export async function buyerOf(env, s) {
  if (s.client_reference_id) return await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(s.client_reference_id).first();
  const email = normalizeEmail(s.customer_details?.email);
  if (!validEmail(email)) return null;
  return await upsertUser(env, { email, name: s.customer_details?.name });
}

export async function activate(env, s, userId = s.client_reference_id) {
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO memberships (user_id, status, tier, stripe_customer_id, stripe_subscription_id, applied_at, joined_at, updated_at) VALUES (?, 'active', 'pro', ?, ?, ?, ?, ?) " +
    "ON CONFLICT(user_id) DO UPDATE SET status = 'active', tier = 'pro', stripe_customer_id = excluded.stripe_customer_id, stripe_subscription_id = COALESCE(excluded.stripe_subscription_id, memberships.stripe_subscription_id), joined_at = COALESCE(memberships.joined_at, excluded.joined_at), updated_at = excluded.updated_at"
  ).bind(userId, s.customer || null, s.subscription || null, now, now, now).run();
}

export async function onRequestPost({ request, env }) {
  const payload = await request.text();
  if (!(await verifyWebhook(env, payload, request.headers.get("Stripe-Signature")))) return new Response("bad signature", { status: 400 });
  const { type, data } = JSON.parse(payload), o = data.object;
  if (type === "checkout.session.completed" && ["paid", "no_payment_required"].includes(o.payment_status)) {
    const u = await buyerOf(env, o);
    if (u) await activate(env, o, u.id);
  } else if (type === "customer.subscription.updated" || type === "customer.subscription.deleted") {
    const tier = type.endsWith("deleted") || !LIVE_STATUSES.has(o.status) ? "free" : "pro";
    await env.DB.prepare("UPDATE memberships SET tier = ?, updated_at = ? WHERE stripe_subscription_id = ?").bind(tier, Date.now(), o.id).run();
  }
  return new Response("ok");
}
