import type { Data } from "./ResponseModel";

export interface Config {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

export type Cookie = [string, string];

export interface CookieData extends Data {
  values: Cookie[];
}

export interface CookieResponse extends Response {
  data: CookieData | null;
}

export interface ActiveCookies {
  created_at: string;
  value: string;
}

export type ActiveCookiesResponse = ActiveCookies | null;
