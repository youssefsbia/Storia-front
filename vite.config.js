import { fileURLToPath, URL } from 'node:url'
import vuetify from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
