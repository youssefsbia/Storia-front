import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import vuetify from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    vueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
      jitCompilation: true
    })
  ],
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
