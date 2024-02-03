import { getAuth } from "@/lib/auth";
import { SHEET_ID } from "@/lib/constants";
import type { ActiveCookiesResponse, CookieData } from "@/models/AuthModel";
import { google } from "googleapis";

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
