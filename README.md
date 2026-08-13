# GooseART Website

## Run with npm

```bash
npm install
npm start
```

The site is configured for Vite and can be deployed on Render.

## Contact form

The Contact page is connected to Formspree using the provided endpoint:

`https://formspree.io/f/xqpzbdyq`

The form uses vanilla JavaScript/AJAX with `fetch()` and sends an `Accept: application/json` header, so visitors stay on the GooseART site after submitting. The form also includes a Formspree subject and honeypot field.

Formspree controls where submissions are delivered. The recipient email addresses are configured in the Formspree dashboard, not in the website code. The current website is ready to submit to the supplied Formspree form ID (`xqpzbdyq`). If both `blcarlisle3@gmail.com` and `perickson0222@gmail.com` should receive notifications, add both as notification recipients in Formspree if the account/plan supports multiple recipients. Do not put those recipient addresses into the frontend form; that would not control delivery securely.

## Other commands

- `npm run dev`
- `npm run build`
- `npm run preview`


## Cloudflare Workers deployment

This version is configured for Cloudflare Workers Static Assets.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Output directory: `dist`
- Root directory: `/` (repository root)
- `wrangler.toml` defines the Worker and serves the Vite `dist` folder as static assets.
- The site remains a client-side hash-routed Vite site, so the existing visual design and navigation are unchanged.
- The contact form continues to submit directly to the configured Formspree endpoint from the browser.


### Cloudflare image fix
The Paige hero wordmark is explicitly imported into the Vite bundle so it is hashed/copied into `dist/assets` during production builds. This avoids broken image paths caused by JavaScript string-based asset references.


### Cloudflare asset handling
All site-wide images used by HTML/JavaScript are copied into `public/assets` and referenced with root-relative `/assets/...` URLs. Vite copies these files unchanged into `dist/assets`, and Cloudflare Workers Static Assets serves them directly. Project images added later should be placed under `public/assets/work/` and referenced as `/assets/work/filename.ext` in `data.js`.
