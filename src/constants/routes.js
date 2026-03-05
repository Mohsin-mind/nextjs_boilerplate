// All app route paths as constants — import these everywhere instead of hardcoding strings

export const ROUTES = {
  // Public
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected
  HOME: "/home",
  DASHBOARD: "/dashboard",

  // API
  AUTH_API: "/api/auth",
};

// Routes that do NOT require authentication
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

// Auth routes — redirect to app if already logged in
export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

// Default redirect after successful login
export const DEFAULT_LOGIN_REDIRECT = ROUTES.HOME;
