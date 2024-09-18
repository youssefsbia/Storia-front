<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 class="text-2xl font-bold my-4">{{ t('shoppingCart') }}</h1>
    </div>
    <TransitionGroup name="list">
      <single-cart-item
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        @increment-quantity="incrementQuantity"
        @decrement-quantity="decrementQuantity"
        @delete-cart-item="deleteCartItem"
      />
    </TransitionGroup>
    <div
      v-if="cartItems.length === 0"
      class="mt-8 text--primary text-h5 text-center empty-cart-message"
    >
      {{ t('emptyCart') }}
    </div>
    <div v-else class="flex justify-end items-center mt-8">
      <span class="text-gray-600 mr-4">{{ t('total') }}:</span>
      <span class="text-xl font-bold cart-total">${{ total?.toFixed(2) }}</span>
    </div>
    <div v-if="cartItems.length" class="flex flex-column justify-end items-center md:items-end mt-8">
      <p v-if="minToBuy" class="text-center mb-2 text-gray-500 font-light text-sm">
        {{ t('conditionToBuy', { minToBuy }) }}
      </p>
      <v-btn
        class="block checkout"
        :disabled="minToBuy > total"
        color="primary"
      >
        {{ t('checkout') }}
      </v-btn>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import SingleCartItem from '@/components/SingleCartItem.vue'
import CartItem from '@/store/models/CartItem'

const { t } = useI18n()
const cartItems = computed(() => CartItem.query().with('product').get())

const total = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

const minToBuy = import.meta.env.VITE_APP_MIN_TO_BUY

const incrementQuantity = (item) => {
  CartItem.update({
    where: item.id,
    data: { quantity: item.quantity + 1 }
  })
}

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    CartItem.update({
      where: item.id,
      data: { quantity: item.quantity - 1 }
    })
  }
}

const deleteCartItem = (item) => {
  CartItem.delete(item.id)
}
</script>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
<i18n>
    {
        "en": {
            "shoppingCart": "Shopping Cart",
            "checkout": "buy now",
            "total": "Total",
            "emptyCart": "Your cart is empty.",
            "conditionToBuy": "You must have a minimum of ${ minToBuy } to buy."
        },
        "fr": {
            "shoppingCart": "Panier d'achat",
            "checkout": "Acheter maintenant",
            "total": "Total",
            "emptyCart": "Votre panier est vide.",
            "conditionToBuy": "Vous devez avoir un minimum de ${ minToBuy } pour acheter."
        }
    }
</i18n>
