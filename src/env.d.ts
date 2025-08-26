declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}

// Error 타입 확장
declare global {
  interface Error {
    response?: {
      data?: {
        message?: string;
      };
    };
  }
}

export {};
