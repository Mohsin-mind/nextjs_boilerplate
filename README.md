# Next.js 16 Boilerplate

A production-ready Next.js 16 boilerplate with authentication, database, state management, and a clean architecture.

## Stack

| Layer           | Technology                          |
| --------------- | ----------------------------------- |
| Framework       | Next.js 16 (App Router, JavaScript) |
| Styling         | Tailwind CSS v4 + shadcn/ui         |
| Auth            | Better Auth                         |
| Database ORM    | Prisma + PostgreSQL                 |
| Client State    | Redux Toolkit                       |
| Server State    | TanStack Query v5                   |
| Forms           | React Hook Form + Zod               |
| Package Manager | pnpm                                |

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, Register pages (minimal layout)
│   ├── (main)/           # Protected pages with Navbar + Footer
│   ├── api/auth/         # Better Auth API handler
│   ├── layout.js         # Root layout with Providers
│   └── page.js           # Root redirect
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Navbar, Footer
│   ├── auth/             # LoginForm, RegisterForm
│   └── common/           # LoadingSpinner, etc.
├── config/               # Environment-based config objects
├── constants/            # Routes, messages, app constants
├── hooks/                # useAuth, useMediaQuery, useToast
├── lib/                  # Singletons: prisma, auth, api, utils, helpers
├── providers/            # Redux + TanStack Query providers
├── services/
│   ├── api/              # Raw API functions (no React)
│   └── queries/          # TanStack Query hooks + key factories
├── store/                # Redux store + slices
├── types/                # JSDoc type definitions
├── validations/          # Zod schemas
└── middleware.js         # Route protection
```

## Getting Started

### 1. Clone and install

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000
```

### 3. Set up the database

```bash
pnpm db:generate   # Generate Prisma client
pnpm db:migrate    # Run migrations
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Patterns

### Adding a new API resource

1. Create `src/services/api/post.api.js` — plain async functions using `api.get()`, `api.post()` etc.
2. Create `src/services/queries/post.queries.js` — TanStack Query hooks + key factory
3. Components import from `queries/` only

### Adding a new page

- **Protected page**: Add to `src/app/(main)/your-page/page.js`
- **Public page**: Add to `src/app/(auth)/your-page/page.js` and add route to `PUBLIC_ROUTES` in `src/constants/routes.js`

### Adding a new Redux slice

1. Create `src/store/slices/yourSlice.js`
2. Add reducer to `src/store/index.js`

### Adding a new Zod schema

- Reuse field schemas from `src/validations/common.schema.js`
- Create domain-specific schemas in `src/validations/your-domain.schema.js`

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start development server           |
| `pnpm build`       | Build for production               |
| `pnpm start`       | Start production server            |
| `pnpm lint`        | Run ESLint                         |
| `pnpm db:generate` | Generate Prisma client             |
| `pnpm db:migrate`  | Run database migrations            |
| `pnpm db:push`     | Push schema changes (no migration) |
| `pnpm db:studio`   | Open Prisma Studio                 |
