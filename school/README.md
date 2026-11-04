# school.carlosreinoso.co.uk

Carlos's AI school: a Skool-style community (about page, join questions, Stripe membership, feed, likes and
levels, profiles with an activity map, follows, DMs, notifications). Same stack as notaryexampractice:
static HTML built by `build.mjs` + Cloudflare Pages Functions (`functions/`) + Cloudflare D1 (SQLite).

The repo has two apps side by side: `nextjs/` (carlosreinoso.co.uk, deployed by Vercel with Root Directory
`nextjs`) and `school/` (this, deployed to Cloudflare Pages). Neither build touches the other folder.

```
src/site.mjs        name, price label, categories, levels, join questions, owner profile  ← edit copy here
src/pages/*.mjs     the HTML pages (about, /carlos, app shells)
src/components/     layout + icons
public/             CSS, browser JS, images, _redirects
functions/api/      the API (auth, join + Stripe, posts, comments, likes, follow, messages, notifications)
migrations/         D1 schema
```

## Run locally

From the repo root (see the root `README.md` for every `make` command):

```sh
cp school/.dev.vars.example school/.dev.vars   # DEV_UNLOCK=1 shows login codes on screen (remove RESEND_API_KEY to use it); set ADMIN_EMAILS
make db-local                                  # create the local SQLite tables
make school                                    # http://localhost:8788
```

## Deploy

Already set up (database, Pages project with production branch `master`, custom domain). To ship changes:
`make db-remote` if there are new migrations, then `make deploy-school`.

Setting it up from scratch:

1. `npx wrangler login`
2. `npx wrangler d1 create school` → paste the `database_id` into `wrangler.toml`
3. `make db-remote`
4. `npx wrangler pages project create carlos-school --production-branch master`
5. `make deploy-school`
6. Cloudflare dashboard → Workers & Pages → carlos-school → Settings → Variables and Secrets: add
   `ADMIN_EMAILS`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`,
   `EMAIL_FROM` (and `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` for Google login). Redeploy after.
7. Custom domain: carlos-school → Custom domains → `school.carlosreinoso.co.uk`, then add the CNAME it
   shows (`school` → `carlos-school.pages.dev`) where the domain's DNS lives.

Stripe webhook: `https://school.carlosreinoso.co.uk/api/stripe/webhook` with events
`checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
