<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust_frontend

Next.js 16.4.3 App Router + React 19 + Tailwind 4 + shadcn (`base-nova` style). Routes in `src/app`, page sections in `src/components/site`, shadcn primitives in `src/components/ui`, shared helpers in `src/lib` and `src/hooks`. No tests, CI, formatter, or frontend env files.

## Commands

- Dev: `npm run dev` (Turbopack)
- Lint all: `npm run lint` (bare `eslint`; currently passes). Single file: `npx eslint src/app/page.tsx`
- Verify: `npm run lint` then `npm run build` — build runs TypeScript and fails on type errors (there is no `typecheck` script)
- Regenerate route types (`PageProps`/`LayoutProps` globals) without a full build: `npx next typegen`

## Backend

Data is live, from a sibling Express + MongoDB service hardcoded at `http://localhost:5000` in `src/app/destinations/page.tsx`, `src/app/destinations/[id]/page.tsx`, and `src/app/add-destinations/page.tsx`.

- Start it from `../wanderlust_backend` with `node index.js` (no npm start script); it needs `MONGODB_URI` in its `.env`.
- Endpoints: `GET /destinations`, `GET /destination/:id`, `POST /add-destination`, `PATCH /destination/:id`; records are keyed by Mongo `_id`.
- Backend down: `/destinations` logs and renders the empty state (fetch is caught); `/destinations/[id]` throws (unguarded fetch).
- `next build` exits 0 but prints `Dynamic server usage ... revalidate: 0` for `/destinations` — expected from the caught `cache: "no-store"` fetch during prerender, not a build failure.
- Incomplete: `EditDestination` submit is a TODO and persists nothing; the list accepts an `id` fallback but still links `destination._id`.

## Non-default config — don't "fix"

- `cacheComponents: false` + `partialPrefetching: false`: Cache Components is off, so `"use cache"`/`cacheLife`/`cacheTag` do not apply. Keep `fetch(..., { cache: "no-store" })` for live data, and don't enable one flag without the other (Next docs pair both as `true`).
- `reactCompiler: true`: skip manual `useMemo`/`useCallback`/`React.memo`.
- `images.remotePatterns` accepts any `https` host on purpose — destination image URLs come from Mongo.
- Tailwind 4 runs through `turbopack.rules` (`@tailwindcss/turbopack`); there is no `postcss.config.*` or `tailwind.config.*`. Theme and CSS variables live in `src/app/globals.css`.

## shadcn / UI

- Style `base-nova`: primitives wrap `@base-ui/react` (Base UI), not Radix. Compose via the `render` prop — `<Button render={<Link href="/destinations" />}>`; there is no `asChild`. Base UI callbacks can pass `null` (e.g. `Select` `onValueChange` is `string | null`).
- Add components with `npx shadcn@latest add <name>` instead of porting Radix examples from shadcn docs; treat `src/components/ui/*` as generated and avoid reformatting it wholesale.
- `cn()` re-exports the standalone `cn` package from `src/lib/utils.ts`; alias `@/*` → `src/*`.
- `src/app/layout.tsx` already renders `Navbar` and `Footer` around every route — don't add them per page.

## Gotchas

- `README.md` is create-next-app boilerplate (`app/page.tsx`, Geist, Vercel) and is wrong for this repo — trust code and config.
- Fonts: `Josefin_Sans` is applied via `josefinSans.className` on `<html>`; `globals.css` maps `--font-mono` to an undefined `--font-geist-mono` and `--font-sans` to itself, so add a real `next/font` variable before relying on either.
- Only `/`, `/destinations`, `/destinations/[id]`, and `/add-destinations` exist. `Navbar` links to unimplemented `/bookings`, `/admin`, `/profile`, `/login`, and `/signup` (404s).
- No frontend env vars exist (no `NEXT_PUBLIC_*` reads); the API base URL is hardcoded in the three pages above. `.env*` and `next-env.d.ts` are gitignored.
