<!-- Copilot Instructions: Tailored guidance for AI coding agents working in this repo -->
# Copilot / AI agent instructions

Purpose: quick, actionable guidance to get productive in this Fusion Starter codebase.

- **Stack & intent**: pnpm + Vite (frontend) + Express (backend) + TypeScript + Tailwind. The dev server mounts the Express app into Vite (`vite.config.ts`) so `pnpm dev` runs both client and server on port 8080.

- **Start / Build / Test**:
  - Dev: `pnpm dev` (runs Vite dev server with Express middleware from `server/createServer()`)
  - Build: `pnpm build` (runs `vite build` for client and `vite build --config vite.config.server.ts` for server)
  - Start (prod): `pnpm start` -> runs `node dist/server/node-build.mjs`
  - Tests: `pnpm test` (Vitest)
  - Typecheck: `pnpm typecheck`

- **Where to look first**:
  - Frontend entry and routes: `client/App.tsx`, `client/pages/*`
  - Reusable UI components: `client/components/ui/` (Radix + Tailwind wrappers)
  - Classnames utility: `client/lib/utils.ts` (use `cn()` to merge classes)
  - Server entry & routes: `server/index.ts`, `server/routes/*`
  - Production server runner: `server/node-build.ts` (served from `dist/server`)
  - Shared types between client & server: `shared/api.ts` (import as `@shared/api`)

- **Important repo-specific patterns**:
  - Path aliases: `@` -> `client/`, `@shared` -> `shared/` (defined in `vite.config.ts` and `vite.config.server.ts`). Use these imports in new code.
  - API convention: server endpoints are under `/api/*`. Use `shared/api.ts` to place and consume TypeScript interfaces.
  - Dev server integration: `vite.config.ts` registers an `expressPlugin()` that calls `createServer()` from `server/index.ts` and mounts the Express app on Vite dev middleware — changing `server/` code will hot-reload in dev.
  - Server build: `vite.config.server.ts` builds a Node-targeted bundle into `dist/server` and keeps `express` and `cors` external.

- **How to add an API route (explicit example)**:
  1. Add a type to `shared/api.ts` (e.g., `export interface MyResponse { ... }`).
 2. Create `server/routes/my-route.ts` and export a `RequestHandler`.
 3. Import and register the handler in `server/index.ts`: `app.get('/api/my-route', myHandler)`.
 4. Consume in frontend: `const res = await fetch('/api/my-route'); const data = await res.json()` and type as `MyResponse`.

- **Netlify / serverless**:
  - `netlify/functions/api.ts` wraps the same Express `createServer()` via `serverless-http`. Keep server logic generic so it runs both in Vite dev and Netlify function.

- **Build & deploy notes**:
  - Client output: `dist/spa` (built with `vite build`).
  - Server output: `dist/server` (built with `vite build --config vite.config.server.ts`).
  - Prod start serves `dist/spa` static files from `dist/server` via `server/node-build.ts`.

- **Coding conventions for agents**:
  - Follow existing file patterns; reuse `client/components/ui/*` patterns for new UI.
  - Use `cn()` from `client/lib/utils.ts` for conditional Tailwind classes.
  - Keep changes minimal and scoped; avoid reformatting unrelated files.
  - Prefer adding shared types to `shared/api.ts` instead of duplicating interfaces.

- **Quick navigation hints**:
  - Example API handler: `server/routes/demo.ts`
  - Dev server integration: `vite.config.ts` -> `expressPlugin()`
  - Server build settings: `vite.config.server.ts`

If anything in these instructions is unclear or you want more examples (tests, adding routes, component conventions), tell me which area to expand.
