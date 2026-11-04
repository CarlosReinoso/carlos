# carlosreinoso.co.uk monorepo: nextjs/ (Vercel) + school/ (Cloudflare Pages)
# Usage: make help

MSG ?= update

.PHONY: help install dev next school db-local db-remote build deploy deploy-school deploy-next commit push ship

help: ## List targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*## "}{printf "  \033[36m%-14s\033[0m %s\n",$$1,$$2}'

install: ## Install nextjs deps
	cd nextjs && pnpm install

dev: ## Run both apps (next :3000, school :8788)
	$(MAKE) -j2 next school

next: ## Run nextjs dev server on :3000
	cd nextjs && pnpm dev

school: ## Build + run school on :8788 (wrangler pages dev)
	cd school && npm run dev

db-local: ## Apply school D1 migrations locally
	cd school && npm run db:local

db-remote: ## Apply school D1 migrations to Cloudflare
	cd school && npm run db:remote

build: ## Build both apps
	cd nextjs && pnpm build
	cd school && npm run build

deploy-school: ## Deploy school to Cloudflare Pages
	cd school && npm run deploy

deploy-next: push ## Deploy nextjs (Vercel builds on push to master)

deploy: deploy-school deploy-next ## Deploy both

commit: ## Commit everything: make commit MSG="message"
	git add -A
	git commit -m "$(MSG)"

push: ## Push current branch
	git push origin HEAD

ship: commit deploy ## Commit, push (Vercel) and deploy school
