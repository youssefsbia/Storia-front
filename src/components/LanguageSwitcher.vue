<template>
  <v-btn-toggle :value="locale" mandatory @change="changeLanguage">
    <v-btn value="en">
      <v-icon>mdi-flag-usa</v-icon>
      EN
    </v-btn>
    <v-btn value="fr">
      <v-icon>mdi-flag-france</v-icon>
      FR
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
defineProps({
  locale: {
    type: String,
    default: 'fr'
  }
})

const emit = defineEmits(['language-changed'])
const changeLanguage = () => emit('language-changed')
</script>
