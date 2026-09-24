import { resolve } from 'path'
import { defineConfig } from 'vite'

const routes = {
  '/menu': '/sections/menu.html',
  '/location': '/sections/location.html',
  '/contact': '/sections/contact.html',
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        menu: resolve(import.meta.dirname, 'sections/menu.html'),
        location: resolve(import.meta.dirname, 'sections/location.html'),
        contact: resolve(import.meta.dirname, 'sections/contact.html'),
      },
    },
  },
  plugins: [
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
  ],
})
