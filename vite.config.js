/* ---------- Imports ---------- */

import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { qrcode } from 'vite-plugin-qrcode'


/* ---------- Route Mappings ---------- */

// Maps clean URLs to their corresponding HTML files.
// Used by the development and preview servers.
const routes = {
    '/menu': '/sections/menu.html',
    '/location': '/sections/location.html',
    '/contact': '/sections/contact.html',
    '/cart': '/sections/cart.html',
}


/* ---------- Vite Configuration ---------- */

export default defineConfig({

    /* ---------- Development Server ---------- */

    // Exposes the development server on your local network
    // so other devices can access the site and scan its QR code.
    server: {
        host: true,
    },


    /* ---------- Build Configuration ---------- */

    // Defines the HTML entry points used when building the site.
    build: {
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'index.html'),
                menu: resolve(import.meta.dirname, 'sections/menu.html'),
                location: resolve(import.meta.dirname, 'sections/location.html'),
                contact: resolve(import.meta.dirname, 'sections/contact.html'),
                cart: resolve(import.meta.dirname, 'sections/cart.html'),
            },
        },
    },


    /* ---------- Plugins ---------- */

    plugins: [

        /* ---------- Terminal QR Code ---------- */

        // Generates a QR code in the terminal for convenient local testing.
        qrcode(),


        /* ---------- Clean URL Rewrites ---------- */

        // Redirects clean routes to the appropriate HTML files
        // without requiring .html in the browser's address bar.
        {
            name: 'dev-rewrites',

            // Apply route rewrites to the development server.
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (routes[req.url]) {
                        req.url = routes[req.url]
                    }

                    next()
                })
            },

            // Apply the same route rewrites to the preview server.
            configurePreviewServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (routes[req.url]) {
                        req.url = routes[req.url]
                    }

                    next()
                })
            },
        },


        /* ---------- Progressive Web App (PWA) ---------- */

        // Configures the installable app manifest and offline caching.
        VitePWA({
            // Automatically update the service worker when a new version is available.
            registerType: 'autoUpdate',

            // Configure which files Workbox precaches for offline use.
            workbox: {
                navigateFallback: null,
                globPatterns: [
                    '**/*.{js,css,html,png,svg,woff2}',
                ],
            },

            // Information displayed when users install the app.
            manifest: {
                name: 'The Matcha House',
                short_name: 'Matcha House',
                description: 'Matcha drinks and treats menu',

                theme_color: '#234A2C',
                background_color: '#F5F2EC',

                display: 'standalone',
                start_url: '/',

                // Icons used by the installed PWA.
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-maskable-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
        }),
    ],
})