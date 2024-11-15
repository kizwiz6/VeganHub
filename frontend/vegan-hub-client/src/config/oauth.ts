// src/config/oauth.ts
export const oauthConfig = {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      appId: import.meta.env.VITE_FACEBOOK_APP_ID,
      appSecret: import.meta.env.VITE_FACEBOOK_APP_SECRET,
    }
  };