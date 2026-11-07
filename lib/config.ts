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
