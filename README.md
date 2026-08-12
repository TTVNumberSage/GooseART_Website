# GooseART Website

Static, responsive artist portfolio website for Paige / GooseART.

## Files
- `index.html` — site shell and navigation
- `styles.css` — visual design
- `app.js` — routing and page rendering
- `data.js` — editable portfolio, pricing, and social configuration
- `assets/` — supplied GooseART branding/reference images

## Editing content
Open `data.js` to:
- Add portfolio projects under `GOOSEART.projects`.
- Add image paths such as `assets/work/my-art.jpg`.
- Add social URLs in `GOOSEART.socials`.
- Change intro copy.
- Adjust pricing entries if Paige changes packages.

## Portfolio project example
```js
'logos': [
  {
    title: 'Example Logo',
    description: 'Short project description.',
    image: 'assets/work/example.jpg',
    client: 'Client Name',
    date: '2026',
    tools: 'Photoshop / Illustrator'
  }
]
```

The site uses the supplied Paige wordmark and P mark without recreating them. Discord is connected to `https://discord.gg/FRrZpU6bXH` as requested.

The contact form is intentionally front-end only until a real form/email backend is connected.
