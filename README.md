# GooseART Website

## Run locally

```bash
npm install
npm start
```

Then open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## Contact form setup

The contact page is wired for **Formspree**, so you do not need to build or maintain your own email server.

1. Create a Formspree account at https://formspree.io/
2. Create a new form and set the notification email to:
   `perickson0222@gmail.com`
3. Copy the form endpoint Formspree gives you. It will look like:
   `https://formspree.io/f/xxxxxxxx`
4. Open `data.js`.
5. Put that endpoint into:
   `GOOSEART.contact.formEndpoint`
6. Deploy the site again.

After that, visitors can submit the contact form normally. Formspree will forward each inquiry to Paige's email and the submissions can also be viewed in the Formspree dashboard.

### Current direct contact

Email: `perickson0222@gmail.com`

Discord: `https://discord.gg/FRrZpU6bXH`

The form intentionally does not fake a successful submission when the Formspree endpoint is missing. Until the endpoint is added, it tells visitors to email Paige directly.

## Render

For the current static/Vite setup:

Build command:
```bash
npm install && npm run build
```

Start command:
```bash
npm start
```

The included `vite.config.js` allows `gooseart-website.onrender.com`.
