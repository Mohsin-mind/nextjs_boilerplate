import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, oneTapClient } from 'better-auth/client/plugins';
import { auth } from './auth';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const hasGoogleOneTap = Boolean(googleClientId);

const plugins = [inferAdditionalFields(auth)];
if (hasGoogleOneTap) {
  plugins.push(
    oneTapClient({
      clientId: googleClientId,
      uxMode: 'popup',
      context: 'signin',
      autoSelect: true,
    })
  );
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins,
});

export const { signIn, signUp, signOut, useSession, oneTap } = authClient;
