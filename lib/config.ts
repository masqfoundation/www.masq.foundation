export const NODE_ENV = process.env.NODE_ENV ?? "development";

// GA4 measurement IDs are public (they ship in the page HTML), so default to
// the site's ID and let either env var name override it.
export const GOOGLE_ANALYTICS_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY ||
  process.env.GOOGLE_ANALYTICS_KEY ||
  "G-NZK0JWJV36";
