<template>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
      {{ $t('message.viewCart') }}
    </h2>
    <div v-if="cartItems.length === 0" class="text-gray-600 dark:text-gray-300">
      Your cart is empty.
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <img
            :src="item.product.image"
            :alt="item.product.title"
            class="w-16 h-16 object-contain mr-4"
          />
          <div>
            <h3 class="text-lg font-semibold text--primary">
              {{ item.product.title }}
            </h3>
            <p class="text-gray-600 text--primary">
              ${{ item.product.price.toFixed(2) }} x {{ item.quantity }}
            </p>
          </div>
        </div>
        <v-btn color="error" @click="removeFromCart(item)">Remove</v-btn>
      </div>
      <div class="mt-4 text-xl font-bold text--primary">Total: ${{ cartTotal.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
import Cart from '@/store/models/Cart'

export default {
  name: 'ShoppingCart',
  computed: {
    cartItems() {
      return Cart.query().with('product').all()
    },
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }
  },
  methods: {
    removeFromCart(item) {
      Cart.delete(item.id)
    }
  }
}
</script>
