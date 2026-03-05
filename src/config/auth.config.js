import { SESSION } from '@/constants/app';

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
  // Uncomment to add OAuth providers:
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   },
  // },
};
