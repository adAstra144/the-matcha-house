# The Matcha House

> Good things come in green.

The Matcha House is a responsive, installable website for a 24/7 matcha and coffee café. Customers can explore the menu, view item details and prices, pickup or delivery order, find the café, and connect on social media.

![Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?logo=pwa&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)

## Features

- Full menu across seven drink and food categories, with photos, descriptions, and size-based prices.
- Accessible item dialog with quantity and size selection, plus quick-add controls.
- Session-persisted demo cart with quantity controls, pickup/delivery selection, and order totals.
- Responsive navigation, menu-category drawer/chips, and active-section highlighting.
- Location, contact, café photography, social links, and embedded reviews.
- Installable Progressive Web App with generated manifest, icons, and an auto-updating service worker.
- Clean routes for `/menu`, `/location`, `/contact`, and `/cart` in development, preview, and Vercel deployments.

## Built with

- [Vite](https://vite.dev/) and [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- HTML, CSS, and vanilla JavaScript ES modules
- [vite-plugin-qrcode](https://www.npmjs.com/package/vite-plugin-qrcode) for sharing the local development URL
- [Google Fonts](https://fonts.google.com/) (DM Sans and Fraunces)
- [Vercel](https://vercel.com/) hosting configuration

## Running it in your machine

### Prerequisites

- Node.js 20.19+ or 22.12+ (compatible with the current Vite release)
- npm

### Installation

```sh
git clone https://github.com/adAstra144/the-matcha-house.git
cd the-matcha-house
npm install
npm run dev
```

Open the URL printed by Vite—typically `http://localhost:5173`. The dev server listens on the local network too, and displays a QR code for testing from a phone.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |

For the most representative PWA check, build and preview the site:

```sh
npm run build
npm run preview
```

## Routes

| Route | Source | What it contains |
| --- | --- | --- |
| `/` | `index.html` | Café introduction, atmosphere, hours, and reviews. |
| `/menu` | `sections/menu.html` | Menu browser, item dialog, and add-to-cart actions. |
| `/cart` | `sections/cart.html` | Demo order cart, fulfilment choice, and totals. |
| `/location` | `sections/location.html` | Café location and imagery. |
| `/contact` | `sections/contact.html` | Social profiles and email contact. |

## Project structure

```text
.
├── index.html
├── sections/                 # Menu, cart, location, and contact pages
├── src/
│   ├── assets/               # Brand, café, menu-item, and icon assets
│   ├── cart.js               # Session-persisted cart store
│   ├── cart-page.js          # Cart-page rendering and interactions
│   ├── cart-ui.js            # Shared cart badge and toast UI
│   ├── menu.js               # Menu data, rendering, modal, and category UI
│   ├── script.js             # Shared responsive navigation
│   └── *.css                 # Shared and page-specific styles
├── public/                   # Favicon and PWA icons
├── vite.config.js            # Multi-page build, routes, QR code, and PWA config
└── vercel.json               # Production route rewrites
```

## Updating menu items

Menu content has a single source of truth in [`src/menu.js`](src/menu.js). Each item needs an ID that matches its PNG filename in `src/assets/items/`.

```js
item(
  'mango-matcha-latte',
  'Mango Matcha Latte',
  sized(255, 295, 305),
  'A bright mango twist on a smooth iced matcha latte.'
)
```

Add the matching image at the appropriate path—for example, `src/assets/items/matcha-sig/mango-matcha-latte.png`. The menu is rendered from this data, so no separate HTML menu card is needed.

## Ordering note

The cart is a front-end demo. It retains items in the current browser session and shows a confirmation dialog, but it does not submit orders or process payments.

## Deployment

The project is ready for Vercel:

1. Import the repository into Vercel.
2. Select the Vite framework preset.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy.

[`vercel.json`](vercel.json) rewrites the clean routes to their matching HTML files. On another static host, configure equivalent route rewrites.

## Contact

- Email: [thematchahousejph@gmail.com](mailto:thematchahousejph@gmail.com)
- Instagram: [@thematchahouse.ph](https://www.instagram.com/thematchahouse.ph)
- TikTok: [@thematchahouse.ph](https://www.tiktok.com/@thematchahouse.ph)
- Facebook: [The Matcha House](https://www.facebook.com/profile.php?id=61575086252716)


## Made by

- Adastra144 (Basti)
- Claude
- ChatGPT
- Google AI Mode
