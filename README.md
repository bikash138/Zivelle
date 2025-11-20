# Zivelle — E‑Commerce Platform

A modern, full‑stack e‑commerce platform built for performance, scalability and a smooth buyer/seller experience.

## Folder Structure

```text
Zivelle/
├─ apps/
│  └─ next-app/                 # Next.js application (App Router)
│     ├─ src/
│     │  ├─ app/               # Routes: landing, dashboard, auth, API
│     │  │  ├─ (landing)/      # Public pages: catalog, product, cart, confirm
│     │  │  ├─ (dahboard)/     # Seller & user dashboards (layouts + pages)
│     │  │  └─ api/            # Route handlers (Auth, Customer, Seller, S3)
│     │  ├─ components/        # UI, core widgets, loaders, pages
│     │  ├─ lib/               # Helpers: Redis, S3 client, JWT helpers, utils
│     │  ├─ redux/             # Redux store and slices (cart, auth, profile)
│     │  ├─ hooks/             # Custom hooks (debounce, query params)
│     │  ├─ types/             # Shared TypeScript types
│     │  ├─ assets/            # Static assets
│     │  └─ middleware.ts      # Route protection using JWT
│     ├─ eslint.config.mjs
│     ├─ tsconfig.json
│     └─ package.json
├─ packages/
│  ├─ database/                # Prisma schema and migrations for PostgreSQL
│  │  ├─ prisma/
│  │  │  ├─ schema.prisma
│  │  │  └─ migrations/        # Includes full‑text search setup
│  │  └─ src/index.ts          # Prisma client re‑export
│  ├─ ui/                      # Shared UI components
│  ├─ zod/                     # Shared Zod validation schemas
│  ├─ eslint-config/           # Shared ESLint configs (with Prettier compatibility)
│  └─ typescript-config/       # Shared TS configs for apps/packages
├─ docker-compose.yml          # Production compose (app + Valkey/Redis)
├─ docker-compose.dev.yml      # Development compose
├─ Dockerfile                  # Production image build
├─ Dockerfile.dev              # Development image build
├─ pnpm-workspace.yaml         # Monorepo workspaces
├─ turbo.json                  # Turborepo pipeline
├─ .prettierrc                 # Prettier formatting config
└─ package.json                # Workspace scripts (build, dev, lint, format)
```

## Technologies Used

- `Next.js` (App Router) for frontend and API route handlers
- `React 19` and `TypeScript` for type‑safe UI and logic
- `Tailwind CSS 4` and `shadcn/ui` for modern, consistent UI components
- `SWR` for client‑side data fetching and caching
- `Redux Toolkit` for cart/auth/profile state management
- `Prisma` + `PostgreSQL` for data modeling and access
- `AWS SDK (S3)` with `Tigris` endpoints for asset storage (presigned uploads)
- `Razorpay` for payments and server‑side signature verification
- `ioredis` with `Valkey` (Redis‑compatible) for caching seller dashboard metrics
- `Turborepo` + `pnpm` for monorepo management and fast builds
- `ESLint` + `eslint-config-prettier` + `Prettier` for consistent code quality

## Application Workflow

- Authentication
  - Users and sellers sign up/sign in via route handlers under `src/app/api/(Auth)`.
  - Input validated with Zod; passwords hashed with bcrypt; JWT issued via `jsonwebtoken`.
  - JWT stored in an HTTP‑only cookie; `src/middleware.ts` protects private routes.

- Catalog & Search
  - Client pages (e.g., `catalog/page.tsx`) use `SWR` to call `GET /api/items`.
  - Server performs paginated queries and PostgreSQL full‑text search (`to_tsquery`/`ts_rank`).
  - Results include items and pagination metadata rendered by `PaginationComponent`.

- Cart & Order Reservation
  - Cart state in Redux (`redux/slices/cartSlice.ts`).
  - On checkout, `POST /api/user/reserve-stock` atomically decrements stock and creates an order with `expiresAt`.
  - If any item is out of stock, the transaction aborts and returns `409` with the failing item.

- Payment & Verification
  - Client requests a Razorpay order via `POST /api/user/orders`, then opens the Razorpay widget.
  - Server verifies the payment signature in `POST /api/verify-payment`; on success, marks `paymentStatus=Success`, increments `soldCount`, and finalizes the order.
  - Cancellation flow `POST /api/user/restore-stock` restores item stock, cancels order items, and sets `orderStatus=Cancelled`.

- Seller Dashboard
  - Metrics (recent orders, top sellers, revenue, counts) computed via Prisma.
  - Cached in Redis/Valkey for 60s to reduce load (`lib/redis.ts`, `getSellerMetrices.ts`).

- Asset Storage (S3/Tigris)
  - `POST /api/s3/upload` returns a presigned URL and a permanent Tigris URL.
  - `DELETE /api/s3/delete` removes objects by key.

## Features

- Product listing with pagination and full‑text search
- Robust cart and checkout with stock reservation
- Razorpay payments with server‑side verification
- Seller dashboard with cached metrics and recent activity
- Image upload to S3/Tigris via presigned URLs
- Address management for customers
- JWT‑protected routes via Next.js middleware
- Shared UI library and shared validation/types across packages

## Further Improvements

- Testing: add unit/integration/e2e tests (API, reducers, components) and CI
- Observability: structured logging, metrics, tracing, error reporting
- Security & Hardening: rate limiting, CSRF protections for sensitive endpoints, stricter JWT handling
- Performance: server‑side rendering for critical pages, HTTP caching, Redis caching for catalog/search
- Payments: Razorpay webhooks for asynchronous confirmations and reconciliation
- Search: keep `searchVector` updated via triggers; add facets and typo‑tolerant search
- UX: accessibility audits, skeletons everywhere, optimistic updates, better empty/loading states
- Config: centralize environment variables and robust validation
- Data & Domain: role‑based access control and stricter seller/customer boundaries
