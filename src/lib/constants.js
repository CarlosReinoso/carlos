export const prodBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_PROD;
export const devBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;

export const isProd = process.env.NODE_ENV === "production" ? true : false;

export const baseUrl = isProd ? prodBaseUrl : devBaseUrl;

