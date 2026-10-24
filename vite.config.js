import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { qrcode } from 'vite-plugin-qrcode'

const routes = {
  '/menu': '/sections/menu.html',
  '/location': '/sections/location.html',
  '/contact': '/sections/contact.html',
  '/cart': '/sections/cart.html',
}

export default defineConfig({
  // Exposes the dev server on your local network so the QR code works
  server: {
    host: true, 
  },
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
  plugins: [
    qrcode(), // Generates the QR code in your terminal
    {
      name: 'dev-rewrites',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (routes[req.url]) req.url = routes[req.url]
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (routes[req.url]) req.url = routes[req.url]
          next()
        })
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: null,
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
      },
      manifest: {
        name: 'The Matcha House',
        short_name: 'Matcha House',
        description: 'Matcha drinks and treats menu',
        theme_color: '#234A2C',
        background_color: '#F5F2EC',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
