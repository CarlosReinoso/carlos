// One canonical host: once CANONICAL_HOST is set (school.carlosreinoso.co.uk), the production
// *.pages.dev address redirects to it (301). Preview deployments (<hash>.<project>.pages.dev) are left alone.
export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  if (env.CANONICAL_HOST && url.hostname.endsWith(".pages.dev") && url.hostname.split(".").length === 3) {
    url.hostname = env.CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
