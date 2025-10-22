/**
 * API 에러 타입 정의
 */
export enum ApiErrorType {
  // 4xx 클라이언트 에러
  BAD_REQUEST = 'BAD_REQUEST', // 400
  UNAUTHORIZED = 'UNAUTHORIZED', // 401
  FORBIDDEN = 'FORBIDDEN', // 403
  NOT_FOUND = 'NOT_FOUND', // 404
  CONFLICT = 'CONFLICT', // 409
  VALIDATION_ERROR = 'VALIDATION_ERROR', // 422

  // 5xx 서버 에러
  SERVER_ERROR = 'SERVER_ERROR', // 500
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE', // 503

  // 네트워크 에러
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',

  // 기타
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * 사용자 친화적인 에러 메시지 매핑
 */
const ERROR_MESSAGES: Record<ApiErrorType, string> = {
  [ApiErrorType.BAD_REQUEST]: '잘못된 요청입니다. 입력 내용을 확인해주세요.',
  [ApiErrorType.UNAUTHORIZED]: '로그인이 필요합니다.',
  [ApiErrorType.FORBIDDEN]: '접근 권한이 없습니다.',
  [ApiErrorType.NOT_FOUND]: '요청한 정보를 찾을 수 없습니다.',
  [ApiErrorType.CONFLICT]: '이미 존재하는 데이터입니다.',
  [ApiErrorType.VALIDATION_ERROR]: '입력 정보가 올바르지 않습니다.',
  [ApiErrorType.SERVER_ERROR]: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  [ApiErrorType.SERVICE_UNAVAILABLE]: '서비스를 일시적으로 사용할 수 없습니다.',
  [ApiErrorType.NETWORK_ERROR]: '네트워크 연결을 확인해주세요.',
  [ApiErrorType.TIMEOUT_ERROR]: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  [ApiErrorType.UNKNOWN_ERROR]: '알 수 없는 오류가 발생했습니다.',
};

/**
 * HTTP 상태 코드를 에러 타입으로 변환
 */
function getErrorTypeFromStatus(status: number): ApiErrorType {
  switch (status) {
    case 400:
      return ApiErrorType.BAD_REQUEST;
    case 401:
      return ApiErrorType.UNAUTHORIZED;
    case 403:
      return ApiErrorType.FORBIDDEN;
    case 404:
      return ApiErrorType.NOT_FOUND;
    case 409:
      return ApiErrorType.CONFLICT;
    case 422:
      return ApiErrorType.VALIDATION_ERROR;
    case 500:
      return ApiErrorType.SERVER_ERROR;
    case 503:
      return ApiErrorType.SERVICE_UNAVAILABLE;
    default:
      if (status >= 500) return ApiErrorType.SERVER_ERROR;
      if (status >= 400) return ApiErrorType.BAD_REQUEST;
      return ApiErrorType.UNKNOWN_ERROR;
  }
}

/**
 * 커스텀 API 에러 클래스
 */
export class ApiError extends Error {
  public readonly type: ApiErrorType;
  public readonly status?: number;
  public readonly userMessage: string;
  public readonly timestamp: Date;

  constructor(
    type: ApiErrorType,
    message?: string,
    status?: number,
    originalError?: unknown
  ) {
    // 개발자용 메시지
    const devMessage = message || ERROR_MESSAGES[type];
    super(devMessage);

    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.userMessage = ERROR_MESSAGES[type]; // 사용자에게 보여줄 메시지
    this.timestamp = new Date();

    // 스택 트레이스 유지
    if (originalError instanceof Error) {
      this.stack = originalError.stack;
    }

    // prototype 체인 유지 (TypeScript)
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * HTTP 응답으로부터 ApiError 생성
   */
  static fromResponse(status: number, data?: any): ApiError {
    const type = getErrorTypeFromStatus(status);
    const message = data?.message || data?.error || `HTTP ${status}`;
    return new ApiError(type, message, status);
  }

  /**
   * 네트워크 에러로부터 ApiError 생성
   */
  static fromNetworkError(error: unknown): ApiError {
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return new ApiError(ApiErrorType.TIMEOUT_ERROR, error.message, undefined, error);
      }
      return new ApiError(ApiErrorType.NETWORK_ERROR, error.message, undefined, error);
    }
    return new ApiError(ApiErrorType.NETWORK_ERROR);
  }

  /**
   * 알 수 없는 에러로부터 ApiError 생성
   */
  static fromUnknown(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }
    if (error instanceof Error) {
      return new ApiError(ApiErrorType.UNKNOWN_ERROR, error.message, undefined, error);
    }
    return new ApiError(ApiErrorType.UNKNOWN_ERROR, String(error));
  }

  /**
   * 로그용 정보 반환
   */
  toJSON() {
    return {
      name: this.name,
      type: this.type,
      message: this.message,
      userMessage: this.userMessage,
      status: this.status,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
