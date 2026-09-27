# The Matcha House

A responsive website for **The Matcha House**, a specialty matcha and coffee café. Built with vanilla HTML, CSS, and JavaScript, bundled with Vite.

## Pages

- **Home** (`index.html`) — hero, branding, navigation
- **Menu** (`sections/menu.html`) — drink and food menu with item detail popups (Matcha, Coffee, Signature Matcha, Cloud Series, Vietnam Series, Food, Pasta & Salad)
- **Location** (`sections/location.html`) — embedded Google Map and venue photos
- **Contact** (`sections/contact.html`) — contact info and inquiry form

## Tech Stack

- Vite (build tool / dev server)
- Vanilla HTML, CSS, JS — no frameworks
- Google Fonts (DM Sans & Fraunces)
- Google Maps embed

## Getting Started

```bash
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Project Structure

```
├── index.html          # Home page
├── sections/           # Menu, Location, Contact pages
├── src/
│   ├── assets/          # Images (brand, menu items, venue photos)
│   ├── *.css            # Page and global styles
│   ├── menu.js          # Menu modal logic
│   └── script.js         # Shared/home page logic
├── public/              # Static assets (favicon)
├── vite.config.js       # Multi-page Vite config
└── vercel.json          # Vercel routing/deploy config
```

## Deployment

Deployed on **Vercel**, with routes for `/menu`, `/location`, and `/contact` mapped via `vercel.json`.

## License

Private project — all rights reserved.
