export class BaseResponseDto<T> {
  data: T;
  status: number;
  error: boolean;
  message?: string;
}
