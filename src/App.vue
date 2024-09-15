<template>
  <v-app :theme="darkMode ? 'dark' : 'light'">
    <the-header
      :app-name="appName"
      :dark-mode="darkMode"
      :locale="locale"
      :cart-item-count="cartItemCount"
      @toggle-dark-mode="toggleDarkMode"
      @toggle-language="toggleLanguage"
      @go-to-cart="goToCart"
    />
    <v-main>
      <v-container class="mt-6 px-6">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TheHeader from '@/components/TheHeader.vue'
import CartItem from './store/models/CartItem'
import { useRouter } from 'vue-router'

const { locale } = useI18n()
const store = useStore()
const router = useRouter()

const appName = computed(() => import.meta.env.VITE_APP_APP_NAME)
const darkMode = computed(() => store.getters['getDarkMode'])

const cartItemCount = computed(() => CartItem.query().count())

const toggleDarkMode = () => store.dispatch('toggleDarkMode')

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'fr' : 'en'
  locale.value = newLocale
}

const goToCart = () => {
  router.push({ name: 'Cart' })
}
</script>
