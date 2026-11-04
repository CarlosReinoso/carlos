# carlosreinoso.co.uk

Two apps side by side, run from the `Makefile` at the repo root:

| Folder    | Site                         | Stack                                  | Hosted on        |
|-----------|------------------------------|----------------------------------------|------------------|
| `nextjs/` | carlosreinoso.co.uk          | Next.js 14 + Supabase (pnpm)           | Vercel           |
| `school/` | school.carlosreinoso.co.uk   | static build + Pages Functions + D1    | Cloudflare Pages |

Needs Node, pnpm and `make`. Wrangler runs through `npx`, so nothing else to install.

## Commands

Run `make help` to list them all.

| Command                    | What it does                                                        |
|----------------------------|---------------------------------------------------------------------|
| `make install`             | Install the nextjs dependencies (school has none)                   |
| `make dev`                 | Run both apps: nextjs on http://localhost:3000, school on http://localhost:8788 |
| `make next`                | Run only nextjs                                                     |
| `make school`              | Build and run only school                                           |
| `make db-local`            | Apply school's D1 migrations to the local database                  |
| `make db-remote`           | Apply school's D1 migrations to the live Cloudflare database        |
| `make build`               | Build both apps                                                     |
| `make deploy-school`       | Build and deploy school to Cloudflare Pages                         |
| `make deploy-next`         | Push to GitHub; Vercel builds and deploys nextjs on push to `master` |
| `make deploy`              | Deploy both                                                         |
| `make commit MSG="..."`    | Stage everything and commit with that message                       |
| `make push`                | Push the current branch                                             |
| `make ship MSG="..."`      | Commit, then deploy both                                            |

## First run

```sh
make install
cp school/.dev.vars.example school/.dev.vars   # local secrets for school; use Stripe test keys here
make db-local
make dev
```

## Everyday

```sh
make dev                                  # work locally
make commit MSG="what changed"            # commit
make deploy                               # school → Cloudflare, nextjs → Vercel (via push)
```

Pushing to `master` deploys automatically: Vercel deploys `nextjs/`, and the GitHub Action
`.github/workflows/deploy-school.yml` applies new D1 migrations and deploys `school/` whenever a push changes it
(repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`). `make deploy-school` still works for a manual deploy.

If you add a file to `school/migrations/`, run `make db-local` before `make dev`, and `make db-remote` before `make deploy-school`.

## Hosting notes

- **Vercel:** the project's Root Directory must be `nextjs`.
- **Cloudflare:** Pages project `carlos-school` (production branch `master`), D1 database `school`. Secrets go under
  carlos-school → Settings → Variables and Secrets; see `school/README.md` for the list.
- **DNS** is on Squarespace: `@` → Vercel (A `76.76.21.21`), `www` → `cname.vercel-dns.com`, `school` → `carlos-school.pages.dev`.
