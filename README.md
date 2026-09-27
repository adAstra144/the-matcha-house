# The Matcha House

A modern, responsive website for **The Matcha House** — a specialty matcha and coffee café.

## Overview

This is a static website built with vanilla HTML, CSS, and JavaScript, using Vite as the build tool. The site features:

- **Home** — Hero section with branding and navigation
- **Menu** — Comprehensive drink and food menu with interactive modal popups
- **Location** — Embedded Google Maps and venue photos
- **Contact** — Contact information and inquiry form

## Tech Stack

- **Vite** — Fast build tool and dev server
- **Vanilla HTML/CSS/JS** — No frameworks, lightweight and performant
- **Google Fonts** — DM Sans & Fraunces typography
- **Google Maps Embed** — Location iframe

## Project Structure

```
the-matcha-house/
├── index.html              # Home page
├── sections/
│   ├── menu.html           # Full menu with categories
│   ├── location.html       # Location & photos
│   └── contact.html        # Contact page
├── src/
│   ├── style.css           # Global styles
│   ├── reset.css           # CSS reset
│   ├── index.css           # Home page styles
│   ├── menu.css            # Menu page styles
│   ├── location.css        # Location page styles
│   ├── menu.js             # Menu modal functionality
│   └── assets/             # Images (brand, menu items, venue photos)
├── public/                 # Static assets (favicon)
├── dist/                   # Production build output
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
└── package.json
```

## Menu Categories

- **Matcha Series** — Classic matcha beverages
- **Signature Coffee** — Specialty coffee drinks
- **Signature Matcha** — House matcha creations
- **Cloud Series** — Cream-topped specialty drinks
- **Vietnam Series** — Vietnamese-inspired beverages
- **Comfort Food** — Savory plates and snacks
- **Pasta & Salad** — Heartier meal options

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```
Opens a local dev server at `http://localhost:5173`

### Production Build

```bash
npm run build
```
Outputs to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## Deployment

Configured for **Vercel** via `vercel.json`. Push to main branch for automatic deployment.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Assets

Images are stored in `src/assets/` organized by category:
- `brand.jpg` — Logo
- `items/matcha/` — Matcha series drinks
- `items/coffee/` — Coffee series drinks
- `items/matcha-sig/` — Signature matcha drinks
- `items/cloud-series/` — Cloud series drinks
- `items/vietnam/` — Vietnam series drinks
- `items/food/` — Food items
- `items/pasta/` — Pasta & salad items
- `front.jpg`, `img-2.png`, `seat.png`, `lounge.png` — Venue photos

## License

Private project — all rights reserved.