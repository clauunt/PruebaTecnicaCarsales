export interface ApiResponse<T> {
  info: PaginationInfo;
  data: Array<T>;
  message?: string;
  errors?: string[];
}

export interface PaginationInfo {
  count: number;
  pages: number;
  currentPage: number;
  next?: string;
  prev?: string;
}

export interface PaginationFilter {
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  details?: string;
  timestamp?: Date;
}
