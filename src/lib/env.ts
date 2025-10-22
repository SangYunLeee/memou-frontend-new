/**
 * 환경변수 타입 정의 및 검증
 */

interface Env {
  NEXT_PUBLIC_API_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

/**
 * 환경변수 검증 함수
 */
function validateEnv(): Env {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.'
    );
  }

  // URL 형식 검증
  try {
    new URL(apiUrl);
  } catch (error) {
    throw new Error(
      `NEXT_PUBLIC_API_URL이 올바른 URL 형식이 아닙니다: ${apiUrl}`
    );
  }

  return {
    NEXT_PUBLIC_API_URL: apiUrl,
    NODE_ENV: (process.env.NODE_ENV as Env['NODE_ENV']) || 'development',
  };
}

// 환경변수를 앱 시작 시 한 번만 검증
export const env = validateEnv();

// 개발 환경에서만 환경변수 출력
if (env.NODE_ENV === 'development') {
  console.log('✅ 환경변수 검증 완료:', {
    NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
    NODE_ENV: env.NODE_ENV,
  });
}