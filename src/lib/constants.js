export const prodBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_PROD;
export const devBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;

export const isProd = process.env.NODE_ENV === "production" ? true : false;

export const baseUrl = isProd ? prodBaseUrl : devBaseUrl;

// Gelato API constants
export const prodGelatoBaseUrl = "https://ecommerce.gelatoapis.com/v1";
export const devGelatoBaseUrl = "https://sandbox.gelatoapis.com/v4"; // Use Gelato's sandbox for dev

export const gelatoBaseUrl = isProd ? prodGelatoBaseUrl : devGelatoBaseUrl;

export const gelatoStoreId = process.env.NEXT_PUBLIC_GELATO_STORE_ID; // Store this in your .env.local

export const gelatoApiKey = process.env.GELATO_API_KEY;

// STRIPE
export const stripeSecretKey = isProd
  ? process.env.STRIPE_SECRET_KEY_PROD
  : process.env.STRIPE_SECRET_KEY_DEV;

export const stripePublishableKey = isProd
  ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_PROD
  : process.env.NEXT_PUBLIC_STRIPE_PUBLIC_DEV;

export const stripeWebhookSignature = isProd
  ? process.env.STRIPE_WEBHOOK_SECRET_PROD
  : process.env.STRIPE_WEBHOOK_SECRET_DEV;
