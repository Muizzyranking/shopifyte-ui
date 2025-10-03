export type ApiResponse<TData = null, TErrors = unknown, TMeta = unknown> = {
  message?: string;
  data?: TData | null;
  errors?: TErrors | null;
  meta?: TMeta | null;
};

export type ApiErrorDetails = Record<string, unknown> | null;
