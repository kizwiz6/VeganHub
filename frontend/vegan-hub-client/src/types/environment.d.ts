declare namespace NodeJS {
    interface ProcessEnv {
      VITE_FACEBOOK_APP_ID: string;
    }
  }
  
  interface Window {
    FB: {
      init(options: {
        appId: string;
        cookie?: boolean;
        xfbml?: boolean;
        version: string;
      }): void;
      login(callback: (response: { authResponse?: { accessToken: string } }) => void): void;
    }
  }