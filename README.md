# www.masq.foundation

The MASQ Foundation website: a Next.js app exported as a static site (`output: 'export'`) and deployed on Cloudflare Pages.

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static site written to ./out
pnpm start    # build, then serve ./out
```

## Layout

- `app/` holds one folder per route (`/`, `/about`, `/projects`, `/grants`, `/donate`). Page-specific styles sit next to each page as CSS Modules.
- `components/` holds the shared page frame (`PageShell`, `SiteHeader`, `SiteFooter`), the `SimplePage` title-and-copy template, the `Reveal` fade-in wrapper, and SVG icons.
- `app/globals.css` holds the color tokens and base element resets.
- `public/images/` holds the logo, card images and background photos.

Layouts switch to mobile at 768px and below.

## Configuration

Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY` to the GA4 measurement ID (see `.env.local.example`). It's read at build time, so on Cloudflare Pages it must be set as a build environment variable for both Production and Preview. The GA tag is left out when it's unset.
