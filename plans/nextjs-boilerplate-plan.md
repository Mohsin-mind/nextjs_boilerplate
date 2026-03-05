# Next.js 16 Boilerplate — Architecture Plan

## Stack Summary

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, JavaScript) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | Better Auth |
| Database ORM | Prisma + PostgreSQL |
| Client State | Redux Toolkit |
| Server State | TanStack Query (React Query v5) |
| Forms | React Hook Form + Zod |
| Package Manager | pnpm |

---

## Project Folder Structure

```
nextjs_boilerplate/
├── plans/                          # Architecture plans (this file)
├── prisma/
│   ├── schema.prisma               # Prisma schema (User, Session, Account, Verification)
│   └── migrations/                 # Auto-generated migration files
├── public/
│   └── images/                     # Static images
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Auth route group (no layout header)
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── register/
│   │   │   │   └── page.js
│   │   │   └── layout.js           # Minimal auth layout (centered card)
│   │   ├── (main)/                 # Main app route group (with nav/header)
│   │   │   ├── home/
│   │   │   │   └── page.js         # Protected home page
│   │   │   ├── dashboard/
│   │   │   │   └── page.js         # Protected dashboard (placeholder)
│   │   │   └── layout.js           # Main layout with Navbar + Footer
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.js    # Better Auth catch-all API handler
│   │   ├── globals.css             # Tailwind v4 global styles + CSS vars
│   │   ├── layout.js               # Root layout (Providers wrapper)
│   │   ├── page.js                 # Root redirect → /home or /login
│   │   └── not-found.js            # Custom 404 page
│   ├── components/
│   │   ├── ui/                     # shadcn/ui generated components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── form.jsx
│   │   │   └── ...                 # Other shadcn components as needed
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   └── Sidebar.jsx         # Optional sidebar (placeholder)
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx       # Login form (RHF + Zod)
│   │   │   └── RegisterForm.jsx    # Register form (RHF + Zod)
│   │   └── common/
│   │       ├── LoadingSpinner.jsx  # Reusable loading state
│   │       └── ErrorBoundary.jsx   # Error boundary wrapper
│   ├── lib/
│   │   ├── auth.js                 # Better Auth server instance
│   │   ├── auth-client.js          # Better Auth browser client
│   │   ├── prisma.js               # Prisma client singleton
│   │   ├── query-client.js         # TanStack Query client (uses queryConfig)
│   │   ├── api.js                  # Reusable fetch wrapper (base HTTP client)
│   │   ├── utils.js                # cn() + general pure helpers
│   │   └── helpers.js              # App-specific helpers (formatDate, truncate, etc.)
│   ├── store/
│   │   ├── index.js                # Redux store configuration
│   │   └── slices/
│   │       ├── uiSlice.js          # UI state (modals, sidebar, theme)
│   │       └── userSlice.js        # User preferences / client-side user state
│   ├── hooks/
│   │   ├── useAuth.js              # Auth state hook (wraps Better Auth client)
│   │   ├── useMediaQuery.js        # Responsive breakpoint hook
│   │   └── useToast.js             # Toast notification hook (wraps shadcn toast)
│   ├── providers/
│   │   ├── QueryProvider.jsx       # TanStack Query Provider
│   │   ├── ReduxProvider.jsx       # Redux Provider
│   │   └── index.jsx               # Combined Providers wrapper
│   ├── services/
│   │   ├── api/
│   │   │   └── user.api.js         # Raw API call functions (uses lib/api.js)
│   │   └── queries/
│   │       └── user.queries.js     # TanStack Query hooks (useQuery/useMutation wrappers)
│   ├── constants/
│   │   ├── routes.js               # All app route paths as constants
│   │   ├── messages.js             # UI strings, error/success messages
│   │   └── app.js                  # App-wide constants (pagination, limits, etc.)
│   ├── config/
│   │   ├── app.config.js           # Environment-based app config (URL, name, etc.)
│   │   ├── auth.config.js          # Auth-specific config (session duration, providers)
│   │   └── query.config.js         # TanStack Query default options
│   ├── validations/
│   │   ├── auth.schema.js          # Zod schemas for login/register
│   │   └── common.schema.js        # Shared Zod schemas (email, id, pagination)
│   ├── types/
│   │   └── index.js                # JSDoc @typedef for shared types (User, ApiResponse, etc.)
│   └── middleware.js               # Next.js middleware (route protection)
├── .env.example                    # Environment variable template
├── .env.local                      # Local secrets (gitignored)
├── .gitignore
├── components.json                 # shadcn/ui config
├── eslint.config.mjs
├── jsconfig.json                   # Path aliases (@/*)
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── pnpm-workspace.yaml
```

---

## Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",

    // Auth
    "better-auth": "^1.x",

    // Database
    "@prisma/client": "^6.x",

    // State Management
    "@reduxjs/toolkit": "^2.x",
    "react-redux": "^9.x",

    // Server State / Data Fetching
    "@tanstack/react-query": "^5.x",

    // Forms & Validation
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x",

    // UI
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "lucide-react": "^0.x",
    "@radix-ui/react-slot": "^1.x",
    "@radix-ui/react-label": "^2.x",
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-dropdown-menu": "^2.x",
    "@radix-ui/react-toast": "^1.x"
  }
}
```

### Dev Dependencies

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "prisma": "^6.x"
  }
}
```

---

## Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Better Auth required models
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  sessions      Session[]
  accounts      Account[]
}

model Session {
  id        String   @id @default(cuid())
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                    String    @id @default(cuid())
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}

model Verification {
  id         String    @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime? @default(now())
  updatedAt  DateTime? @updatedAt
}
```

---

## Key File Implementations

### `src/lib/auth.js` — Better Auth Server

```js
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/config/auth.config";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  ...authConfig,
});
```

### `src/lib/auth-client.js` — Better Auth Browser Client

```js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

### `src/lib/prisma.js` — Prisma Singleton

```js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### `src/lib/utils.js` — Utility Functions

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### `src/app/api/auth/[...all]/route.js` — Better Auth API Handler

```js
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### `src/constants/routes.js` — Route Constants

```js
// All app route paths as constants — import these everywhere instead of hardcoding strings
export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected
  DASHBOARD: "/dashboard",
  APP_HOME: "/home",

  // API
  AUTH_API: "/api/auth",
};

// Routes that do NOT require authentication
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

// Auth routes — redirect to app if already logged in
export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

// Default redirect after login
export const DEFAULT_LOGIN_REDIRECT = ROUTES.APP_HOME;
```

### `src/constants/messages.js` — UI Messages

```js
// Centralised UI strings — avoids magic strings scattered across components
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  LOGIN_ERROR: "Invalid email or password.",
  REGISTER_SUCCESS: "Account created successfully.",
  REGISTER_ERROR: "Failed to create account. Please try again.",
  LOGOUT_SUCCESS: "You have been logged out.",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
};

export const FORM_MESSAGES = {
  REQUIRED: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_MIN: "Password must be at least 8 characters.",
  PASSWORDS_MISMATCH: "Passwords do not match.",
};

export const GENERAL_MESSAGES = {
  LOADING: "Loading...",
  ERROR_GENERIC: "Something went wrong. Please try again.",
  NOT_FOUND: "The page you are looking for does not exist.",
};
```

### `src/constants/app.js` — App-Wide Constants

```js
// App-wide constants — pagination limits, feature flags, etc.
export const APP_NAME = "My App";
export const APP_DESCRIPTION = "Next.js 16 Boilerplate";

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const SESSION = {
  EXPIRES_IN_SECONDS: 60 * 60 * 24 * 7, // 7 days
  UPDATE_AGE_SECONDS: 60 * 60 * 24,      // 1 day
};

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};
```

### `src/config/app.config.js` — Environment-Based App Config

```js
// Reads from environment variables — single source of truth for runtime config
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "My App",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Next.js 16 Boilerplate",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
};
```

### `src/config/auth.config.js` — Auth Configuration

```js
import { SESSION } from "@/constants/app";

// Centralised auth config — consumed by both Better Auth server and middleware
export const authConfig = {
  session: {
    expiresIn: SESSION.EXPIRES_IN_SECONDS,
    updateAge: SESSION.UPDATE_AGE_SECONDS,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  // Add OAuth providers here when needed:
  // socialProviders: { google: { ... } }
};
```

### `src/config/query.config.js` — TanStack Query Config

```js
// Centralised TanStack Query defaults — imported by query-client.js
export const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,        // 1 minute — data considered fresh
      gcTime: 5 * 60 * 1000,       // 5 minutes — cache garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
};
```

### `src/middleware.js` — Route Protection

```js
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { AUTH_ROUTES, PUBLIC_ROUTES, DEFAULT_LOGIN_REDIRECT, ROUTES } from "@/constants/routes";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  // Protect all other routes
  if (!PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
```

### `src/store/index.js` — Redux Store

```js
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});
```

### `src/store/slices/uiSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  theme: "system",
  activeModal: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { toggleSidebar, setTheme, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
```

### `src/providers/index.jsx` — Combined Providers

```jsx
"use client";

import { ReduxProvider } from "./ReduxProvider";
import { QueryProvider } from "./QueryProvider";

export function Providers({ children }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ReduxProvider>
  );
}
```

### `src/providers/QueryProvider.jsx`

```jsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### `src/lib/query-client.js`

```js
import { QueryClient } from "@tanstack/react-query";
import { queryConfig } from "@/config/query.config";

export const queryClient = new QueryClient(queryConfig);
```

### `src/lib/api.js` — Reusable Fetch Wrapper

This is the **single HTTP client** used by all `services/api/*.js` files. It handles base URL, JSON parsing, and standardised error throwing — so no component ever calls `fetch()` directly.

```js
import { appConfig } from "@/config/app.config";

/**
 * Base fetch wrapper — all API calls go through this.
 * @param {string} endpoint - Path relative to base URL e.g. "/api/users"
 * @param {RequestInit} options - Standard fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${appConfig.url}${endpoint}`;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  get: (endpoint, options) =>
    apiFetch(endpoint, { method: "GET", ...options }),

  post: (endpoint, body, options) =>
    apiFetch(endpoint, { method: "POST", body: JSON.stringify(body), ...options }),

  put: (endpoint, body, options) =>
    apiFetch(endpoint, { method: "PUT", body: JSON.stringify(body), ...options }),

  patch: (endpoint, body, options) =>
    apiFetch(endpoint, { method: "PATCH", body: JSON.stringify(body), ...options }),

  delete: (endpoint, options) =>
    apiFetch(endpoint, { method: "DELETE", ...options }),
};
```

### `src/lib/helpers.js` — App-Specific Helper Functions

Pure utility functions reused across the app. Unlike `utils.js` (UI-focused with `cn()`), `helpers.js` contains data/string/date helpers.

```js
/**
 * Format a Date object or ISO string to a readable date string.
 * @param {Date|string} date
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(new Date(date));
}

/**
 * Truncate a string to a max length and append ellipsis.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(str, maxLength = 100) {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate initials from a full name (e.g. "John Doe" to "JD").
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Sleep for a given number of milliseconds (useful in dev/testing).
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely parse JSON — returns null on failure instead of throwing.
 * @param {string} str
 * @returns {any|null}
 */
export function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}
```

### `src/services/api/user.api.js` — Raw API Functions

These are **plain async functions** — no React, no hooks. They use `lib/api.js` and are called by TanStack Query hooks.

```js
import { api } from "@/lib/api";

/**
 * Fetch the current authenticated user's profile.
 * @returns {Promise<import("@/types").User>}
 */
export async function getCurrentUser() {
  return api.get("/api/users/me");
}

/**
 * Update the current user's profile.
 * @param {Partial<import("@/types").User>} data
 * @returns {Promise<import("@/types").User>}
 */
export async function updateUserProfile(data) {
  return api.patch("/api/users/me", data);
}
```

### `src/services/queries/user.queries.js` — TanStack Query Hooks

These are the **React hooks** that wrap TanStack Query around the raw API functions. Components import these — never the raw API functions directly.

```js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, updateUserProfile } from "@/services/api/user.api";

// Query key factory — centralised, prevents typos and enables targeted invalidation
export const userKeys = {
  all: ["users"],
  me: () => [...userKeys.all, "me"],
};

/**
 * Hook to fetch the current user's profile.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getCurrentUser,
  });
}

/**
 * Hook to update the current user's profile.
 * Automatically invalidates the "me" query on success.
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
```

### `src/types/index.js` — JSDoc Type Definitions

Since this is a JavaScript project, JSDoc `@typedef` provides IDE autocomplete and type safety without TypeScript.

```js
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {string|null} image
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {any} [data]
 * @property {string} [message]
 * @property {string} [error]
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {any[]} data
 * @property {number} total
 * @property {number} page
 * @property {number} pageSize
 * @property {boolean} hasNextPage
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page=1]
 * @property {number} [pageSize=10]
 */
```

### `src/hooks/useToast.js` — Toast Hook

Wraps shadcn's `useToast` with pre-configured success/error/info helpers so components don't repeat toast config.

```js
import { useToast as useShadcnToast } from "@/components/ui/use-toast";

export function useToast() {
  const { toast } = useShadcnToast();

  return {
    success: (message, description) =>
      toast({ title: message, description, variant: "default" }),

    error: (message, description) =>
      toast({ title: message, description, variant: "destructive" }),

    info: (message, description) =>
      toast({ title: message, description }),
  };
}
```

### `src/validations/common.schema.js` — Shared Zod Schemas

```js
import { z } from "zod";
import { PAGINATION } from "@/constants/app";

// Reusable field schemas — compose these into larger schemas
export const emailSchema = z.string().email("Invalid email address");
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");
export const nameSchema = z.string().min(2, "Name must be at least 2 characters").max(100);
export const idSchema = z.string().cuid("Invalid ID format");

// Reusable pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
});
```

### `src/validations/auth.schema.js` — Zod Schemas

```js
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
```

### `src/app/layout.js` — Root Layout

```jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: { default: "App", template: "%s | App" },
  description: "Next.js 16 Boilerplate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### `src/app/page.js` — Root Redirect

```jsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function RootPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/home");
  }
  redirect("/login");
}
```

---

## Environment Variables

```bash
# .env.example

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000
```

---

## `next.config.mjs` Updates

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    // Enable if using server actions heavily
    // serverActions: { allowedOrigins: ["localhost:3000"] },
  },
};

export default nextConfig;
```

---

## `components.json` — shadcn/ui Config

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## Route Architecture

```mermaid
graph TD
    A[/ Root] --> B{Session?}
    B -->|Yes| C[/home Protected]
    B -->|No| D[/login Public]
    D --> E[LoginForm]
    E -->|Success| C
    F[/register Public] --> G[RegisterForm]
    G -->|Success| C
    C --> H[Navbar + Layout]
    H --> I[/dashboard Protected]
    H --> J[/home Protected]
```

---

## Data Flow Architecture

```mermaid
graph LR
    A[Page/Component] --> B[services/queries/*.queries.js]
    B --> C[services/api/*.api.js]
    C --> D[lib/api.js fetch wrapper]
    D --> E[Next.js API Route]
    E --> F[Prisma]
    F --> G[PostgreSQL]
    A --> H[Redux Store]
    H --> I[UI State / User Prefs]
    A --> J[Better Auth Client]
    J --> K[/api/auth/* Route]
    K --> L[Better Auth Server]
    L --> F
```

### Service Layer Pattern

```
Component
  └── imports useCurrentUser()          ← services/queries/user.queries.js
        └── calls getCurrentUser()      ← services/api/user.api.js
              └── calls api.get()       ← lib/api.js
                    └── fetch()         ← /api/users/me route handler
                          └── prisma    ← PostgreSQL
```

This strict layering means:
- Components never call `fetch()` directly
- Raw API functions are reusable outside React (e.g. in server actions)
- Query keys are centralised in key factories — no string duplication
- Swapping the HTTP client only requires changing `lib/api.js`

---

## Auth Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as LoginForm
    participant BA as Better Auth Client
    participant API as /api/auth/sign-in
    participant DB as PostgreSQL

    U->>F: Enter email + password
    F->>F: Zod validation
    F->>BA: signIn.email()
    BA->>API: POST /api/auth/sign-in/email
    API->>DB: Verify credentials
    DB-->>API: User record
    API-->>BA: Session cookie set
    BA-->>F: Success
    F->>U: Redirect to /home
```

---

## Implementation Steps (for Code Mode)

### Phase 1 — Foundation Setup
1. Install all dependencies via pnpm
2. Initialize shadcn/ui (`pnpm dlx shadcn@latest init`)
3. Set up `components.json`
4. Update `jsconfig.json` with all path aliases
5. Update `next.config.mjs`
6. Create `.env.example` and `.env.local`

### Phase 2 — Database & Auth
7. Create `prisma/schema.prisma` with Better Auth models
8. Run `pnpm prisma generate` and `pnpm prisma migrate dev`
9. Create `src/lib/prisma.js` singleton
10. Create `src/lib/auth.js` Better Auth server config
11. Create `src/lib/auth-client.js` browser client
12. Create `src/app/api/auth/[...all]/route.js`

### Phase 3 — State Management
13. Create `src/store/index.js` Redux store
14. Create `src/store/slices/uiSlice.js`
15. Create `src/store/slices/userSlice.js`
16. Create `src/lib/query-client.js`
17. Create `src/providers/ReduxProvider.jsx`
18. Create `src/providers/QueryProvider.jsx`
19. Create `src/providers/index.jsx`

### Phase 4 — Constants & Config
20. Create `src/constants/routes.js` (ROUTES, PUBLIC_ROUTES, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT)
21. Create `src/constants/messages.js` (AUTH_MESSAGES, FORM_MESSAGES, GENERAL_MESSAGES)
22. Create `src/constants/app.js` (APP_NAME, PAGINATION, SESSION, THEME)
23. Create `src/config/app.config.js` (environment-based app config)
24. Create `src/config/auth.config.js` (auth session + email config)
25. Create `src/config/query.config.js` (TanStack Query defaults)

### Phase 5 — Utilities, Hooks & Types
26. Create `src/lib/utils.js` with `cn()` helper
27. Create `src/lib/helpers.js` (formatDate, truncate, capitalize, getInitials, sleep, safeJsonParse)
28. Create `src/lib/api.js` reusable fetch wrapper
29. Create `src/types/index.js` JSDoc type definitions
30. Create `src/hooks/useAuth.js`
31. Create `src/hooks/useMediaQuery.js`
32. Create `src/hooks/useToast.js`
33. Create `src/validations/common.schema.js` (reusable field schemas + pagination)
34. Create `src/validations/auth.schema.js`
35. Create `src/services/api/user.api.js` (raw API functions)
36. Create `src/services/queries/user.queries.js` (TanStack Query hooks + key factory)

### Phase 6 — UI Components
37. Add shadcn/ui components: `button`, `card`, `input`, `label`, `form`, `toast`
38. Create `src/components/layout/Navbar.jsx`
39. Create `src/components/layout/Footer.jsx`
40. Create `src/components/common/LoadingSpinner.jsx`
41. Create `src/components/auth/LoginForm.jsx` (uses ROUTES + FORM_MESSAGES constants)
42. Create `src/components/auth/RegisterForm.jsx` (uses ROUTES + FORM_MESSAGES constants)

### Phase 7 — Pages & Layouts
43. Update `src/app/layout.js` root layout with Providers
44. Update `src/app/page.js` root redirect (uses ROUTES constants)
45. Create `src/app/(auth)/layout.js` auth layout
46. Create `src/app/(auth)/login/page.js`
47. Create `src/app/(auth)/register/page.js`
48. Create `src/app/(main)/layout.js` main layout
49. Create `src/app/(main)/home/page.js`
50. Create `src/app/not-found.js` (uses GENERAL_MESSAGES constants)

### Phase 8 — Middleware & Final Config
51. Create `src/middleware.js` route protection (uses ROUTES constants)
52. Update `src/app/globals.css` with shadcn CSS variables
53. Final review and README update

---

## Key Best Practices Applied

| Practice | Implementation |
|---|---|
| Route Groups | `(auth)` and `(main)` groups for layout separation |
| Server Components by default | Pages are RSC; only interactive parts use `"use client"` |
| Prisma singleton | Prevents connection pool exhaustion in dev |
| Better Auth cookie-based sessions | Secure, httpOnly cookies via middleware |
| Zod schemas co-located | `src/validations/` for reusable schemas |
| Path aliases | `@/*` maps to `src/*` for clean imports |
| Redux for client state only | TanStack Query handles all server/async state |
| shadcn/ui non-tsx | JavaScript project uses `.jsx` not `.tsx` |
| Environment variable prefix | `NEXT_PUBLIC_` only for browser-safe vars |
| No magic strings | All routes, messages, limits in `src/constants/` |
| Environment-based config | All env-dependent values in `src/config/` files |
| Config consumed by lib | `auth.js` uses `authConfig`, `query-client.js` uses `queryConfig` |
| Single HTTP client | `lib/api.js` wraps all fetch calls — no raw `fetch()` in components |
| Service layer separation | `services/api/` = plain functions, `services/queries/` = React hooks |
| Query key factories | `userKeys.me()` pattern prevents typos and enables targeted invalidation |
| JSDoc types | `src/types/index.js` provides IDE autocomplete without TypeScript |
| Reusable Zod fields | `common.schema.js` exports `emailSchema`, `passwordSchema` etc. for composition |
| Toast abstraction | `useToast()` hook wraps shadcn toast with success/error/info helpers |
| Pure helpers separated | `helpers.js` for data/string/date utils, `utils.js` only for `cn()` |
