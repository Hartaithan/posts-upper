export interface Data {
  majorDimension: string;
  range: string;
}

export type Status = "success" | "error";

export interface Response {
  status: Status;
}

export interface Error {
  value: string;
  type: string;
}

export interface ErrorResponse {
  description: string;
  errors: Error[];
  request_id: string;
}
