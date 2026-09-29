# The Matcha House

> Good things come in green.

A fast, mobile-friendly, installable website for **The Matcha House (TMH)** — a matcha and coffee cafe. Visitors can browse the full menu with prices and descriptions, find the shop on a map, and reach the team through social media or email.

![Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?logo=pwa&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![Deployed on Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Updating the Menu](#updating-the-menu)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contact](#contact)

## About the Project

The Matcha House site is a lightweight multi-page website with no front-end framework. It focuses on presenting the cafe's menu clearly and getting customers to the door.

Pages:

| Route       | File                     | Purpose                                              |
| ----------- | ------------------------ | ---------------------------------------------------- |
| `/`         | `index.html`             | Landing page with hero and a link to the menu        |
| `/menu`     | `sections/menu.html`     | Menu grouped by series, with item detail pop-ups     |
| `/location` | `sections/location.html` | Embedded Google Map and photos of the shop           |
| `/contact`  | `sections/contact.html`  | Facebook, Instagram, TikTok and email links          |

### Built With

- [Vite](https://vite.dev/) — dev server and bundler
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — web app manifest and service worker
- HTML, CSS and vanilla JavaScript (ES modules)
- [Google Fonts](https://fonts.google.com/) — DM Sans and Fraunces
- [Vercel](https://vercel.com/) — hosting

## Features

- **Menu browser** — items organized into Matcha, Signature Coffee, Signature Matcha, Cloud, Vietnam, Food and Pasta & Salad series (50+ items).
- **Item detail modal** — click any item to see its photo, description and size-based prices, built on the native `<dialog>` element.
- **Installable PWA** — standalone display mode, app icons (including a maskable icon) and auto-updating service worker.
- **Responsive layout** — mobile-first with an accessible burger navigation (`aria-expanded` is kept in sync).
- **Clean URLs** — `/menu`, `/location` and `/contact` work in dev, preview and production.
- **Hashed assets** — item images are imported through Vite so production builds are cache-friendly.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (a current LTS release; recent Vite versions require Node 20.19+ or 22.12+)
- npm (bundled with Node.js)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/adAstra144/the-matcha-house.git
   cd the-matcha-house
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```
4. Open the URL printed in your terminal (usually `http://localhost:5173`).

## Usage

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload         |
| `npm run build`   | Create an optimized production build in `dist/`   |
| `npm run preview` | Serve the production build locally                |

> **Tip:** test PWA behavior (install prompt, offline caching) with `npm run build && npm run preview`, since the service worker is generated at build time.

## Project Structure

```
.
├── index.html              # Home page
├── sections/               # Additional pages
│   ├── menu.html
│   ├── location.html
│   └── contact.html
├── src/
│   ├── assets/             # Images and icons
│   │   ├── icons/          # Social/email icons
│   │   └── items/          # Menu item photos, grouped by series
│   ├── reset.css           # CSS reset
│   ├── style.css           # Shared styles and design tokens
│   ├── index.css           # Home page styles
│   ├── menu.css            # Menu page styles
│   ├── location.css        # Location page styles
│   ├── contact.css         # Contact page styles
│   ├── script.js           # Shared script (mobile navigation)
│   └── menu.js             # Menu data and item modal logic
├── public/                 # Favicon and PWA icons
├── vite.config.js          # Multi-page build, route rewrites, PWA config
├── vercel.json             # Production route rewrites
└── package.json
```

## Updating the Menu

Menu data lives in `src/menu.js` in the `menuItems` object. To add an item:

1. Add the photo (PNG) to the matching folder in `src/assets/items/<series>/`. The **file name without extension** is the image key, so keep names unique, e.g. `mango-matcha-latte.png`.
2. Add an entry to `menuItems` in `src/menu.js`:
   ```js
   "mango-matcha-latte": {
     name: "Mango Matcha Latte",
     prices: [
       { label: "Regular", amount: "₱255" },
       { label: "Grande", amount: "₱295" },
     ],
     description: "Short, appetizing description.",
     image: imageMap["mango-matcha-latte"],
   },
   ```
3. Add a button to the right section of `sections/menu.html`, using the same key in `data-item`:
   ```html
   <button type="button" data-item="mango-matcha-latte" class="item" aria-label="View Mango Matcha Latte details">
     <img src="/src/assets/items/matcha-sig/mango-matcha-latte.png" alt="Mango Matcha Latte">
     <span>Mango Matcha Latte</span>
   </button>
   ```

## Deployment

The site is set up for [Vercel](https://vercel.com/):

1. Import the repository into Vercel.
2. Use the **Vite** framework preset (build command `npm run build`, output directory `dist`).
3. Deploy. The rewrites in `vercel.json` map `/menu`, `/location` and `/contact` to their HTML files.

Any static host works too, as long as it serves the contents of `dist/` and provides equivalent route rewrites.

## Contact

**The Matcha House**

- Email: [thematchahousejph@gmail.com](mailto:thematchahousejph@gmail.com)
- Instagram: [@thematchahouse.ph](https://www.instagram.com/thematchahouse.ph)
- TikTok: [@thematchahouse.ph](https://www.tiktok.com/@thematchahouse.ph)
- Facebook: [The Matcha House](https://www.facebook.com/profile.php?id=61575086252716)
