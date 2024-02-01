import type {
  ActiveCookiesResponse,
  Config,
  CookieData,
} from "@/models/AuthModel";
import type { JWTInput } from "google-auth-library";
import { google } from "googleapis";
import { SHEET_ID } from "./constants";

export const getConfig = (): Config | null => {
  const config = process.env.NEXT_PUBLIC_SHEETS_CONFIG ?? null;
  return config ? JSON.parse(config) : null;
};

export const getCredentials = (): JWTInput => {
  const config = getConfig();
  return {
    client_email: config?.client_email,
    client_id: config?.client_id,
    private_key: config?.private_key,
  };
};

export const getAuth = () => {
  return new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
};

export const getCookies = async (): Promise<CookieData | null> => {
  const auth = getAuth();
  const sheets = google.sheets({ auth, version: "v4" });

  let cookies: CookieData | null = null;
  console.info("[GET_COOKIES]: request");
  try {
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SHEET_ID,
      range: "cookies",
    });
    cookies = response.data as CookieData;
    console.info("[GET_COOKIES]: complete");
  } catch (error) {
    console.error("[GET_COOKIES]: error", error);
  }

  return cookies;
};

export const getActiveCookies = async (): Promise<ActiveCookiesResponse> => {
  const auth = getAuth();
  const sheets = google.sheets({ auth, version: "v4" });

  console.info("[GET_ACTIVE_COOKIES]: request");
  try {
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SHEET_ID,
      range: "cookies!A1:C1",
    });
    const cookies = response.data as CookieData;
    if (!cookies.values || cookies.values.length === 0) {
      console.info("[GET_ACTIVE_COOKIES]: values not found");
      return null;
    }
    const [created_at, value] = cookies.values[0];
    console.info("[GET_ACTIVE_COOKIES]: complete");
    return { created_at, value };
  } catch (error) {
    console.error("[GET_ACTIVE_COOKIES]: error", error);
    return null;
  }
};
