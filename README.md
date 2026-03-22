# ClearPaws

AI-powered pet travel compliance planner for Australia. Enter where you're moving from, when you want to travel, and what pet you have — get a personalised step-by-step DAFF compliance timeline with exact dates, cost estimates, and a downloadable checklist.

**Live:** [clearpaws.com.au](https://clearpaws.com.au)

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Database & Auth | Supabase (PostgreSQL + RLS) |
| AI | Anthropic Claude API |
| Payments | Stripe (one-time + subscription) |
| Email | Resend |
| PDF | @react-pdf/renderer (server-side) |
| Deployment | Vercel |
| Testing | Vitest + happy-dom |

---

## Getting started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- An [Anthropic](https://console.anthropic.com) API key
- A [Stripe](https://stripe.com) account (test mode is fine locally)
- A [Resend](https://resend.com) account (for email)

### 1. Clone and install

```bash
git clone https://github.com/your-org/clearpaws.git
cd clearpaws
npm install
```

### 2. Set up environment variables

```bash
cp .env.production.example .env.local
```

Open `.env.local` and fill in all values. See the comments in that file for where to find each one.

### 3. Set up the database

Apply migrations in order using the Supabase dashboard SQL editor or the CLI:

```bash
# With Supabase CLI
supabase db push

# Or apply manually in order:
# supabase/migrations/001_phase2_schema.sql
# supabase/migrations/002_phase3_schema.sql
# supabase/migrations/003_phase4_schema.sql
# supabase/migrations/004_daff_monitoring.sql
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/
│   ├── (marketing)/        # Landing page
│   ├── admin/              # Admin dashboard (role-gated)
│   ├── agency-portal/      # B2B agency lead dashboard
│   ├── api/                # All API routes
│   │   ├── generate-timeline/  # Core AI timeline endpoint
│   │   ├── checkout/           # Stripe one-time payment
│   │   ├── subscription/       # Stripe recurring billing
│   │   ├── webhook/stripe/     # Stripe webhook handler
│   │   ├── cron/               # Scheduled jobs (reminders, DAFF scraper)
│   │   ├── v1/                 # Public REST API (API key auth)
│   │   └── ...
│   ├── auth/               # OAuth callback handler
│   ├── dashboard/          # User dashboard + saved timelines
│   ├── generate/           # 3-step timeline generator form
│   ├── login/ signup/      # Auth pages
│   ├── vet-portal/         # Vet registration and client management
│   └── wl/[slug]/          # White-label agency subpages
├── components/
│   ├── auth/               # Login and signup forms
│   ├── dashboard/          # Dashboard components
│   ├── layout/             # Header, Footer, NavigationProgress
│   ├── timeline/           # Timeline form and result display
│   └── ui/                 # Shared primitives (Button, Input, Alert)
├── lib/
│   ├── anthropic.ts        # Claude API client + system prompt
│   ├── countries.ts        # DAFF country group classification
│   ├── daff-rules.ts       # Hardcoded DAFF rules (Layer 1 accuracy)
│   ├── stripe.ts           # Stripe client + price IDs
│   ├── email.ts            # Resend email helpers
│   └── supabase/           # Supabase client factories
├── types/                  # TypeScript interfaces
└── proxy.ts                # Next.js 16 routing middleware
supabase/
└── migrations/             # Ordered SQL migration files
__tests__/                  # Vitest unit tests
```

---

## Available scripts

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm test             # Run unit tests (Vitest)
npm run test:coverage  # Run tests with coverage report
```

---

## Environment variables

See `.env.production.example` for the full list with descriptions.

| Variable | Required | Notes |
|----------|----------|-------|
| `ANTHROPIC_API_KEY` | Yes | Timeline generation |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only admin key |
| `STRIPE_SECRET_KEY` | Yes | Payments |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Client-side Stripe |
| `STRIPE_WEBHOOK_SECRET` | Yes | Webhook signature verification |
| `STRIPE_PRICE_ID` | Yes | $49 AUD document pack |
| `STRIPE_SUBSCRIPTION_PRICE_ID` | Yes | $9.90/mo subscription |
| `B2B_STRIPE_PRICE_ID` | Yes | $299/mo agency portal |
| `RESEND_API_KEY` | Yes | Deadline reminder emails |
| `NEXT_PUBLIC_BASE_DOMAIN` | Yes | e.g. `clearpaws.com.au` |
| `ADMIN_EMAIL` | Yes | DAFF alert recipient |
| `CRON_SECRET` | Yes | Secures cron endpoints |

---

## Key architectural decisions

**Accuracy system (three layers)**

1. **Hardcoded rules** — `src/lib/daff-rules.ts` contains all stable DAFF rules with source URLs. Claude is never asked to recall rules from training data — it receives the full rule set as context in every API call.
2. **Weekly DAFF monitoring** — `GET /api/cron/daff-scrape` scrapes official DAFF pages, hashes content, and emails the admin if anything changes.
3. **Live data** — Mickleham quarantine availability is fetched at query time and cached.

**API key authentication (public API)**

API keys are stored as bcrypt hashes — raw keys are never persisted. Keys are validated on every request via `src/lib/api-middleware.ts`.

**White-label routing**

Subdomains (`agency.clearpaws.com.au`, `vet.clearpaws.com.au`, `[slug].clearpaws.com.au`) are handled by `src/proxy.ts` which rewrites requests to the correct app route.

---

## Cron jobs (Vercel)

Configured in `vercel.json`:

| Endpoint | Schedule | Purpose |
|----------|----------|---------|
| `/api/cron/reminders` | Daily 9am UTC | Email users with steps due in 14 days |
| `/api/cron/daff-scrape` | Sunday 11pm UTC | Detect DAFF rule changes |

Both endpoints require `Authorization: Bearer <CRON_SECRET>` — Vercel adds this automatically.

---

## Deployment

See `.env.production.example` for all required environment variables.

```bash
# Build passes locally before pushing
npm run build

# Deploy via Vercel (auto-deploys on push to main)
git push origin main
```

Make sure the Stripe webhook endpoint is registered at:
`https://clearpaws.com.au/api/webhook/stripe`

---

## Disclaimer

ClearPaws provides general guidance only. Always verify requirements with the [Australian Department of Agriculture, Fisheries and Forestry (DAFF)](https://www.agriculture.gov.au/biosecurity-trade/cats-dogs) before booking travel for your pet.
