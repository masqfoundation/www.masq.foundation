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
// GA4 measurement ID, read at build time. Either name works; the GA tag is
// left out of the pages when neither is set.
export const GOOGLE_ANALYTICS_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY ||
  process.env.GOOGLE_ANALYTICS_KEY ||
  "";

if (!GOOGLE_ANALYTICS_KEY && NODE_ENV === "production") {
  console.warn(
    "NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY is not set; pages will be built without Google Analytics.",
  );
}
export const PLASMIC_PROJECT_ID = process.env.PLASMIC_PROJECT_ID ?? "MISSING";
export const PLASMIC_PROJECT_API_TOKEN =
  process.env.PLASMIC_PROJECT_API_TOKEN ?? "MISSING";
