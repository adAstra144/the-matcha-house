# The Matcha House

> Good things come in green.

A responsive, multi-page café website built with **HTML, CSS, vanilla JavaScript, and Vite** as a student front-end web development project. It demonstrates menu browsing, interactive product dialogs, a client-side shopping cart, responsive navigation, SEO metadata, social link previews, and Progressive Web App (PWA) capabilities.

**Live Demo:** [thematchahouse.vercel.app](https://thematchahouse.vercel.app/)

[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/learn/pwa/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

> [!IMPORTANT]
> **Educational Project Disclaimer**
>
> This is an independent student project created for academic and demonstration purposes. It is not the official website of The Matcha House and is not affiliated with, operated by, sponsored by, or endorsed by the business.
>
> Business names, branding, photographs, menu descriptions, prices, location information, and social media links are included for demonstration purposes and may not reflect current official information. Please consult the business's official channels for accurate details.
>
> The ordering interface is a front-end demonstration only. It does not submit real orders or process real payments.

## Code Style

The project uses native HTML and CSS alongside vanilla JavaScript ES modules.

- Four-space indentation.
- No semicolons in JavaScript.
- Descriptive section comments using the `/* ---------- Section ---------- */` convention.
- Shared functionality is separated into reusable JavaScript modules.
- Menu content is maintained in a dedicated data module rather than hardcoded into individual product cards.

No dedicated linting or code-formatting tool is currently configured.

## Preview

**Live website:** [https://thematchahouse.vercel.app/](https://thematchahouse.vercel.app/)

The repository includes a dedicated Open Graph image used for social link previews.

![The Matcha House social preview image](public/og-matcha-house.jpg)

## Tech / Framework Used

**Built with:**

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) — page structure and semantic markup.
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) — responsive layouts, custom styling, animations, and media queries.
- [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — application logic, event handling, and DOM manipulation.
- [Vite](https://vite.dev/) — development server, asset processing, and production builds.
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — PWA manifest and service-worker generation.
- [vite-plugin-qrcode](https://www.npmjs.com/package/vite-plugin-qrcode) — QR code generation for local development.
- [Google Fonts](https://fonts.google.com/) — DM Sans and Fraunces.
- [Vercel](https://vercel.com/) — website deployment and clean URL rewrites.

## Features

### Menu and Product Browsing

- Seven categories of drinks and food.
- Product images, descriptions, and prices.
- Interactive product details dialog.
- Size selection for products with multiple price options.
- Quantity controls and quick-add buttons.

### Shopping Cart

- Client-side cart state shared across pages.
- Cart persistence through `sessionStorage`.
- Quantity adjustment and item removal.
- Pickup and delivery selection.
- Automatic subtotal, delivery fee, and total calculations.
- Demo checkout flow with a confirmation dialog.

**Note:** The cart is entirely front-end functionality. Cart contents are stored in the current browser tab's session, and checkout is simulated.

### Responsive Interface

- Responsive header and mobile navigation.
- Collapsible menu-category sidebar on smaller screens.
- Active category highlighting based on scroll position.
- Native HTML dialogs for product details and checkout.
- Toast notifications for user feedback.
- Keyboard focus indicators and reduced-motion support.

### Location and Contact

- Café location information and embedded Google Maps.
- Copy-address functionality.
- Contact information and social media links.
- Embedded third-party review and social feed widgets.

### Progressive Web App

- Web app manifest and installation icons.
- Maskable application icon.
- Generated service worker with automatic-update configuration.
- Configured asset precaching.

Offline behavior may depend on the availability of cached resources and the routing configuration.

### SEO and Link Previews

- Page-specific titles and meta descriptions.
- Canonical URLs for public pages.
- Open Graph metadata for social sharing.
- Large-image link-preview configuration for X/Twitter.
- `robots.txt` and `sitemap.xml`.
- Google Search Console verification metadata.

## Code Example

The menu is maintained as structured data in `src/data/menu.js`. Each product has an identifier, name, prices, and description.

For example:

```javascript
item(
    'mango-matcha-latte',
    'Mango Matcha Latte',
    sized(255, 295, 305),
    'A bright mango twist on a smooth iced matcha latte.'
)
```

The `sized()` helper creates the available price options. The menu page reads this data and generates the product cards and details dialogs dynamically.

Each item's ID must match its image filename, excluding the `.png` extension.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) compatible with the installed Vite version (Node.js 20.19+ or 22.12+ for Vite 8).
- npm.
- Git.

### Clone the Repository

```bash
git clone https://github.com/adAstra144/the-matcha-house.git

cd the-matcha-house
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL printed in your terminal, typically:

```text
http://localhost:5173/
```

The Vite development server also supports local-network testing when accessible from another device.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with hot reload. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally for testing. |

To test the production build locally:

```bash
npm run build
npm run preview
```

## JavaScript Modules

### Cart Store — `src/cart.js`

| Export | Description |
|---|---|
| `getState()` | Returns the current cart state. |
| `getCount()` | Returns the total quantity of cart items. |
| `getSubtotal()` | Calculates the item subtotal. |
| `getDeliveryFee()` | Returns the applicable delivery fee. |
| `getTotal()` | Calculates the final cart total. |
| `add(item, quantity)` | Adds an item or increases its quantity. |
| `setQuantity(id, size, quantity)` | Updates an item's quantity. |
| `remove(id, size)` | Removes a specific item and size. |
| `setDelivery(delivery)` | Sets the pickup or delivery preference. |
| `clear()` | Empties the cart and resets delivery selection. |
| `subscribe(fn)` | Registers a callback for cart updates and returns an unsubscribe function. |
| `reload()` | Reloads cart data from session storage and notifies subscribers. |

The exported `DELIVERY_FEE` constant defines the configured delivery fee.

### Toast Notifications — `src/toast.js`

Import and call `showToast(message)` to display a temporary notification.

```javascript
import { showToast } from './toast.js'

showToast('Added to cart')
```

### Menu Data — `src/data/menu.js`

This module exports the `categories` array containing the menu categories and their products. Its helper functions are internal to the module.

## How to Use

### Browse the Website

1. Open the [live website](https://thematchahouse.vercel.app/).
2. Use the navigation to visit the Home, Menu, Location, and Contact pages.
3. Browse categories and select a product to view its details.
4. Select a size and quantity, or use the quick-add button.
5. Open the cart to view items, change quantities, and select pickup or delivery.
6. Explore the location and contact pages for their demonstration content.

### Update Menu Items

1. Open `src/data/menu.js`.
2. Find the relevant category inside the exported `categories` array.
3. Add or update the product using the existing item structure.
4. Add its corresponding PNG image under `src/assets/items/`, organized into a suitable category directory.
5. Ensure the image filename matches the product ID.
6. Run `npm run build` to check the production build.

Example asset path:

```text
src/assets/items/signature-matcha/mango-matcha-latte.png
```

Use unique product IDs because the application uses those IDs to identify menu items and images.

## Routes

| URL | HTML source | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage and café introduction. |
| `/menu` | `sections/menu.html` | Menu browsing and product interactions. |
| `/cart` | `sections/cart.html` | Demo cart and simulated checkout. |
| `/location` | `sections/location.html` | Location information and map. |
| `/contact` | `sections/contact.html` | Contact details and social links. |

The clean routes are configured through `vercel.json` for deployment and `vite.config.js` for development and preview.

The cart page includes a `noindex` directive because it is a functional demonstration page rather than a search landing page.

## Project Structure

```text
.
├── index.html
├── sections/
│   ├── cart.html
│   ├── contact.html
│   ├── location.html
│   └── menu.html
├── public/
│   ├── videos/
│   ├── favicon.png
│   ├── og-matcha-house.jpg
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── pwa-maskable-512x512.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── items/
│   ├── data/
│   │   └── menu.js
│   ├── cart-page.js
│   ├── cart.js
│   ├── location.js
│   ├── menu.js
│   ├── script.js
│   ├── toast.js
│   ├── reset.css
│   ├── style.css
│   ├── index.css
│   ├── menu.css
│   ├── cart.css
│   ├── location.css
│   └── contact.css
├── package.json
├── vercel.json
├── vite.config.js
└── README.md
```

## Testing

There is currently no dedicated automated test suite or test script.

The production build can be checked using:

```bash
npm run build
```

You can then test the generated site with:

```bash
npm run preview
```

Suggested manual checks include responsive navigation, menu rendering, product details, size selection, cart quantity updates, totals, simulated checkout, page routing, and PWA behavior.

## Deployment

The project is configured for Vercel deployment.

1. Import the repository into [Vercel](https://vercel.com/).
2. Select the Vite framework preset.
3. Use `npm run build` as the build command.
4. Set `dist` as the output directory.
5. Deploy the project.

The `vercel.json` file rewrites clean routes to the corresponding HTML files.

After deployment, verify that the public pages, Open Graph image, `robots.txt`, and `sitemap.xml` load correctly. The sitemap can be submitted through [Google Search Console](https://search.google.com/search-console/).

## Credits

**Developer:** [AdAstra144](https://github.com/adAstra144) | Basti

**Development assistance:** ChatGPT, Claude, and Google AI Mode.

**Technologies and services:** Vite, Vite PWA, Vite QR Code Plugin, Google Fonts, Google Maps, Vercel, elfsight and bootsrap icons.

Third-party assets, trademarks, and services remain subject to their respective owners' terms and rights.
