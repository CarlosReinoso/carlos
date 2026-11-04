// Minimal Stripe REST client (no SDK needed on Workers) and webhook signature check.
export async function stripe(env, path, params, method = params ? "POST" : "GET") {
  const r = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params ? new URLSearchParams(params) : undefined,
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error?.message || "Stripe error");
  return data;
}

// Verifies the Stripe-Signature header (HMAC-SHA256 of "t.payload") and rejects events older than 5 minutes.
export async function verifyWebhook(env, payload, header) {
  const parts = Object.fromEntries((header || "").split(",").map((p) => p.split("=")));
  const t = Number(parts.t), sigs = (header || "").split(",").filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.STRIPE_WEBHOOK_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${payload}`));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return sigs.includes(hex);
}

// A subscription in one of these states keeps the member in the school.
export const LIVE_STATUSES = new Set(["active", "trialing", "past_due"]);
