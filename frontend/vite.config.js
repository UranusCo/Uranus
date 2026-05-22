import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Uranus Chat',
        short_name: 'Uranus',
        description: 'Modern next-gen chat app with advanced features.',
        theme_color: '#070724',
        background_color: '#0b0f19',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  build: {
    minify: false,
    sourcemap: true,
  },
})
