export interface Data {
  majorDimension: string;
  range: string;
}

export type Result = "success" | "error";

export interface ResponseBase<T = unknown> {
  data: T;
  msg: string;
}

export interface SuccessResponse<T = unknown> extends ResponseBase<T> {
  result: "success";
}
export interface ErrorResponse<T = unknown> extends ResponseBase<T> {
  result: "error";
  code: number;
}

export type Response<T = unknown> = SuccessResponse<T> | ErrorResponse<T>;

export interface Action<S = 200, D = Object> {
  status: S;
  data: D;
}
