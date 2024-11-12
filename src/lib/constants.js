export const heroVideoUrlPortrait =
  "https://storage.googleapis.com/luminous-bucket/Snapinsta.app_video_F04C40BEA817F2BD323B720C3EC82989_video_dashinit.mp4";

export const prodBaseUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL;
export const devBaseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL;

export const isProd = process.env.NODE_ENV === "production" ? true : false;

export const baseURL = isProd ? prodBaseUrl : devBaseUrl;
