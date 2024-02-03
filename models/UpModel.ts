import type { CookiesStatus } from "./AuthModel";

export type PostsUpStatus = "up_completed" | "up_empty" | "up_error";

export type UpRequestStatus =
  | "completed"
  | "get_posts_error"
  | "unknown"
  | PostsUpStatus;

export type UpResponseStatus = UpRequestStatus | CookiesStatus;

export interface UpResponse {
  message: string;
  status: UpResponseStatus;
}

export interface UpRequest {
  status: UpRequestStatus;
  response?: unknown;
}
