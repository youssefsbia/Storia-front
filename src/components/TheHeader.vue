<template>
  <v-app-bar>
    <v-app-bar-title class="cursor-pointer" @click="goToHome">{{ appName }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn
        :icon="darkMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'"
        @click="toggleDarkMode"
      >
      </v-btn>
      <v-btn-toggle
        density="compact"
        :model-value="locale"
        mandatory
        @update:modelValue="toggleLanguage"
      >
        <v-btn value="en">
          <img src="@/assets/img/svg/usa.svg" class="mr-1" />
          EN
        </v-btn>
        <v-btn value="fr">
          <img src="@/assets/img/svg/france.svg" class="mr-1" />
          FR
        </v-btn>
      </v-btn-toggle>
      <v-btn @click="goToCart">
        <v-badge v-if="cartItemCount" color="error" :content="cartItemCount">
          <v-icon size="22" class="animate-bounce">mdi-cart-outline</v-icon>
        </v-badge>
        <v-icon v-else size="22">mdi-cart-outline</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
defineProps({
  appName: {
    type: String,
    default: ''
  },
  darkMode: {
    type: Boolean,
    default: false
  },
  locale: {
    type: String,
    default: 'fr'
  },
  cartItemCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['toggle-dark-mode', 'toggle-language', 'go-to-cart'])

const toggleDarkMode = () => emit('toggle-dark-mode')
const toggleLanguage = () => emit('toggle-language')
const goToCart = () => emit('go-to-cart')
const goToHome = () => emit('go-to-home')
</script>
