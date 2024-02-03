import type { Config } from "@/models/AuthModel";
import type { JWTInput } from "google-auth-library";
import { google } from "googleapis";

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
