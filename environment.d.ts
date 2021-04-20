declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      API_URL: string;
      NODE_ENV: 'development' | 'production';
      STACK9_API_URL: string;
      STACK9_API_TOKEN: string;
      QUICKSTREAM_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_WESTPAC_URL: string;
      NEXT_PUBLIC_GOOGLE_RECAPTCHA_URL: string;
      NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITEKEY: string;
      NEXT_PUBLIC_API_URL: string;
      FIREBASE_SERVICE_ACCOUNT_ADMIN_SDK: string;
      NEXT_PUBLIC_FIREBASE_SERVICE_WEB_APP_JS_SDK: string;
    }
  }

  interface Window {
    dataLayer?: any[];
    opera?: any;

    ga?(
      send: string,
      event: string,
      category: string,
      action: string,
      label: string,
      value: string,
    ): any;

    gtag?(event: string, action: string, options: any): any;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
