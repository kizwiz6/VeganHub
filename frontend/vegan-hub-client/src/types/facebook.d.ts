// src/types/facebook.d.ts
declare global {
    interface Window {
      FB: {
        login(callback: (response: { authResponse?: { accessToken: string } }) => void): void;
      }
    }
  }