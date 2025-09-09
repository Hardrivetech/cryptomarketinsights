# Crypto Market Insights (11ty)

A zero-cost, programmatic static site that fetches daily crypto market data from CoinGecko, builds pages with Eleventy (11ty), and deploys to GitHub Pages via GitHub Actions. Monetization via Google AdSense and optional affiliate links.

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Local dev:
   ```bash
   npm run dev
   ```
   Visit http://localhost:8080
3. Build:
   ```bash
   npm run build
   ```

## Configure

- Edit `src/_data/site.json`:
  - `baseUrl` → your GitHub Pages URL
  - `adsense.publisherId` → your publisher ID
  - `adsense.slotId` → your ad slot id
  - affiliate URLs optional

## Deploy to GitHub Pages

- Ensure default branch is `main` and Pages source is GitHub Actions.
- The workflow runs daily at 03:00 UTC and on each push.

## Notes

- Data source: CoinGecko (no API key). Respect their ToS and rate limits.
- Builds cache API response for ~24h to reduce calls.
- Use the `url` filter and `PATH_PREFIX` for project pages under a subpath.
