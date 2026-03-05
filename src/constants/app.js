// App-wide constants — pagination limits, feature flags, theme values, etc.

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'My App';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Next.js 16 Boilerplate';

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const SESSION = {
  EXPIRES_IN_SECONDS: 60 * 60 * 24 * 7, // 7 days
  UPDATE_AGE_SECONDS: 60 * 60 * 24, // 1 day
};

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};
