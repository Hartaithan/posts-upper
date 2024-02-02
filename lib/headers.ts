import { HOST, USER_AGENT } from "./constants";

export const baseHeaders = new Headers({
  Host: HOST,
  "User-Agent": USER_AGENT,
});

export const getAuthHeaders = (cookies: string | undefined): Headers => {
  const headers = baseHeaders;
  if (cookies) headers.set("Cookie", cookies);
  return headers;
};
