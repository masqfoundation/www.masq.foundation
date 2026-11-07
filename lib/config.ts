//import dotenv from "dotenv";
//const envPath = [__dirname, "../.env.local"].join("/");
//dotenv.config();
//dotenv.config({ path: envPath, override: true });

export const requireEnv = (value: string | undefined, identifier: string) => {
  if (!value) {
    throw new Error(`Required env var ${identifier} does not exist`);
  }
  return value;
};

export const NODE_ENV = process.env.NODE_ENV ?? "development";
// GA4 measurement IDs are public (they ship in the page HTML), so default to
// the site's ID and let either env var name override it.
export const GOOGLE_ANALYTICS_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY ||
  process.env.GOOGLE_ANALYTICS_KEY ||
  "G-NZK0JWJV36";
export const PLASMIC_PROJECT_ID = process.env.PLASMIC_PROJECT_ID ?? "MISSING";
export const PLASMIC_PROJECT_API_TOKEN =
  process.env.PLASMIC_PROJECT_API_TOKEN ?? "MISSING";
