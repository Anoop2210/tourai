# TourAI — AI Tour Planner Website

Production-ready scaffold built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Prisma + PostgreSQL, OpenAI, and Razorpay.

## What's included

| Page | Path |
|---|---|
| Home | `/` |
| Tour Planner | `/planner` |
| Budget Calculator | `/budget` |
| Destination Guide (SEO) | `/goa-trip-cost`, `/manali-trip-budget`, ... → rewrites to `/destinations/[slug]` |
| Pricing | `/pricing` |
| Blog | `/blog`, `/blog/[slug]` |
| User Dashboard | `/dashboard` |
| Admin Panel | `/admin` |

API routes: `/api/generate-itinerary`, `/api/budget-calc`, `/api/payment/create-order`, `/api/export-pdf`.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in:
- `DATABASE_URL` — your PostgreSQL connection string (local, Supabase, Neon, Railway, etc.)
- `OPENAI_API_KEY` — from https://platform.openai.com
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — from https://dashboard.razorpay.com
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`

## 3. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed   # adds a sample Goa destination + blog post
```

## 4. Run locally

```bash
npm run dev
```

Visit http://localhost:3000

## 5. Build for production

```bash
npm run build
npm run start
```

## Deployment (Vercel — recommended)

1. Push this project to a GitHub repo.
2. Import the repo on https://vercel.com/new.
3. Add the same environment variables from `.env` in **Project Settings → Environment Variables**.
4. Use a managed Postgres provider (Vercel Postgres, Neon, or Supabase) for `DATABASE_URL`.
5. Add a build command override if needed: `prisma generate && next build`.
6. Deploy. Run `npx prisma migrate deploy` against the production database (via a one-off script, Vercel's CLI, or a CI step) before first traffic.

## Architecture notes / what to extend next

- **Auth**: `next-auth` is included as a dependency but routes/providers aren't wired yet — add `src/app/api/auth/[...nextauth]/route.ts` with a credentials or OAuth provider, then connect `userId` in the planner/dashboard to the logged-in session.
- **AI Prompt Engine**: prompt templates live in `src/lib/openai.ts` (`buildItineraryPrompt`, `buildBudgetPrompt`). The itinerary route always requests `response_format: json_object` so output is structured.
- **Budget Calculator**: works without OpenAI — deterministic logic in `src/lib/budget.ts`. Swap in `buildBudgetPrompt` + OpenAI call if you want AI-tuned estimates instead.
- **PDF Export**: client-side via `jspdf` + `jspdf-autotable` in `ItineraryResult` (instant download, no server load). `/api/export-pdf` returns trip JSON if you want to generate PDFs server-side instead (e.g. with `pdf-lib`) for the Dashboard's saved trips.
- **Razorpay**: order creation is server-side (`/api/payment/create-order`); add a `/api/payment/verify` route with signature verification (`razorpay.validateWebhookSignature`) before marking a `Payment` as `PAID` and unlocking premium fields on the `Trip`.
- **Admin Panel**: metrics cards are live (Prisma counts/aggregates). The "Manage Users/Trips/Blogs/Destinations" cards are placeholders — wire up Server Actions or table components (e.g. shadcn `DataTable`) for full CRUD.
- **SEO**: `sitemap.ts`, `robots.ts`, per-page `generateMetadata`, and Open Graph tags are implemented. Add `JSON-LD` schema (`TouristTrip` / `FAQPage`) on the destination page for rich results.

## Folder structure

```
tourai/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-itinerary/route.ts
│   │   │   ├── budget-calc/route.ts
│   │   │   ├── payment/create-order/route.ts
│   │   │   └── export-pdf/route.ts
│   │   ├── planner/page.tsx
│   │   ├── budget/page.tsx
│   │   ├── destinations/[slug]/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── admin/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/ (button, card, input)
│   │   ├── layout/ (navbar, footer)
│   │   ├── home/ (hero-form)
│   │   ├── planner/ (planner-form, itinerary-result)
│   │   └── budget/ (budget-calculator-form)
│   └── lib/ (prisma, openai, razorpay, budget, utils)
├── .env.example
├── package.json
└── tailwind.config.ts
```
