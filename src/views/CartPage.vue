<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 class="text-2xl font-bold my-4">{{ t('shoppingCart') }}</h1>
      <v-btn color="primary"> {{ t('checkout') }} </v-btn>
    </div>
    <single-cart-item
      v-for="item in CartItems"
      :key="item.id"
      :item="item"
      @increment-quantity="incrementQuantity"
      @decrement-quantity="decrementQuantity"
    />
    <div class="flex justify-end items-center mt-8">
      <span class="text-gray-600 mr-4">{{ t('total') }}:</span>
      <span class="text-xl font-bold">${{ total }}</span>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import SingleCartItem from '@/components/SingleCartItem.vue'
import CartItem from '@/store/models/CartItem'

const { t } = useI18n()
const CartItems = computed(() => CartItem.query().with('product').get())

const total = computed(() => {
  return CartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

const incrementQuantity = (item) => {
  console.log('🚀 ~ incrementQuantity ~ item:', item)
  CartItem.update({
    where: item.id,
    data: { quantity: item.quantity + 1 }
  })
}

const decrementQuantity = (item) => {
  console.log('🚀 ~ decrementQuantity ~ item:', item)
  if (item.quantity > 1) {
    CartItem.update({
      where: item.id,
      data: { quantity: item.quantity - 1 }
    })
  }
}
</script>

<i18n>
    {
        "en": {
            "shoppingCart": "Shopping Cart",
            "checkout": "Checkout",
            "total": "Total"
        },
        "fr": {
            "shoppingCart": "Panier d'achat",
            "checkout": "Check-out",
            "total": "Total"
        }
    }
</i18n>
