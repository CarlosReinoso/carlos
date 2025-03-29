export const prodBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_PROD;
export const devBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;

export const isProd = process.env.NODE_ENV === "production" ? true : false;

export const baseUrl = isProd ? prodBaseUrl : devBaseUrl;

export const githubUrl = "https://github.com/CarlosReinoso";
export const instagramUrl = "https://www.instagram.com/carlos.reinoso_/?hl=en";
export const linkedInUrl = "https://www.linkedin.com/in/carlos-reinoso-bless/";
export const whatsAppUrl = "https://wa.me/447456531337";
export const helloEmailUrl = "mailto:hello@carlosreinoso.co.uk";
export const webEmailUrl = "mailto:web@carlosreinoso.co.uk";
export const propertyEmailUrl = "mailto:property@carlosreinoso.co.uk";
