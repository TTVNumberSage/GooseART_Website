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
