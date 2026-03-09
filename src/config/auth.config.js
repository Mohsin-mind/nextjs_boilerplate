import { SESSION } from '@/constants/app';
import { oneTap } from 'better-auth/plugins';

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const hasGoogleOAuth = Boolean(googleClientId && googleClientSecret);

// Centralised auth config — consumed by Better Auth server (src/lib/auth.js)
export const authConfig = {
  session: {
    expiresIn: SESSION.EXPIRES_IN_SECONDS,
    updateAge: SESSION.UPDATE_AGE_SECONDS,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      firstName: { type: 'string', required: false },
      lastName: { type: 'string', required: false },
    },
  },
  socialProviders: hasGoogleOAuth
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
          redirectURI: `${process.env.NEXT_PUBLIC_APP_URL}/home`,
        },
      }
    : undefined,
  plugins: hasGoogleOAuth ? [oneTap()] : [],
};
