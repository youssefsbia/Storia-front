<template>
  <div class="mt-8">
    <div class="relative flex flex-col md:flex-row border-b border-gray-400 py-4">
      <div class="flex-shrink-0">
        <img :src="item.product.image" :alt="item.product.title" class="w-32 h-32 object-cover rounded-md" />
      </div>
      <v-btn
        class="!absolute !top-2 !right-0"
        variant="text"
        icon="mdi-delete-outline"
        @click="deleteCartItem(item)"
      />
      <div class="w-100 mt-4 md:mt-0 md:ml-6">
        <h2 class="text-lg font-bold">{{ item.product.title }}</h2>
        <p class="mt-2 text--primary">{{ item.product.description }}</p>
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center">
            <v-btn variant="outlined" size="x-small" @click="decrementQuantity(item)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="mx-2 text--primary">{{ item.quantity }}</span>
            <v-btn variant="outlined" size="x-small" @click="incrementQuantity(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <span class="ml-auto font-bold">${{ item.product.price.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['decrement-quantity', 'increment-quantity', 'delete-cart-item'])

const decrementQuantity = (item) => {
  if (item.quantity === 1) {
    return
  }
  emit('decrement-quantity', item)
}

const incrementQuantity = (item) => {
  emit('increment-quantity', item)
}

const deleteCartItem = (item) => {
  emit('delete-cart-item', item)
}
</script>
