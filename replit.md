# Hajra Kareem Hospital

Professional, mobile-responsive informational website for Hajra Kareem Hospital in Faisalabad, Pakistan.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/hajra-kareem-hospital/src/App.tsx` — single-page website layout and interactions
- `artifacts/hajra-kareem-hospital/src/data/hospitalData.ts` — editable hospital, doctor, service, contact, and location data
- `artifacts/hajra-kareem-hospital/src/index.css` — site theme, responsive styling, and motion
- `artifacts/hajra-kareem-hospital/public/assets/hajra-karim-logo.png` — supplied hospital logo

## Architecture decisions

- The site is frontend-only because the requested inquiry flow is informational, not a payment or appointment-booking system.
- Hospital content is separated from layout code in a commented data file so non-technical updates are localized.
- The site uses the supplied logo and its black, red, and white identity rather than introducing unrelated branding.

## Product

The site helps patients and families quickly understand the hospital, browse services and doctor timings, locate the facility, call or WhatsApp the hospital, and send a simple inquiry.

## User preferences

- Use clear, simple English only.
- Do not invent medical claims, doctor details, timings, testimonials, statistics, or pricing.

## Gotchas

- Only Emergency and Gynecology services are stated as available 24 hours a day; do not add general hospital opening hours.
- Cosmetic gynecology copy must keep the supplied consultation disclaimer and avoid guarantees or before/after claims.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
