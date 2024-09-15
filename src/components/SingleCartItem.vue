<template>
  <div class="mt-8">
    <div class="flex flex-col md:flex-row border-b border-gray-400 py-4">
      <div class="flex-shrink-0">
        <img :src="item.product.image" alt="Product image" class="w-32 h-32 object-cover" />
      </div>
      <div class="mt-4 md:mt-0 md:ml-6">
        <h2 class="text-lg font-bold">{{ item.product.title }}</h2>
        <p class="mt-2 text-gray-600">{{ item.product.description }}</p>
        <div class="mt-4 flex items-center">
          <div class="flex items-center">
            <button class="bg-gray-200 rounded-l-lg px-2 py-1" @click="decrementQuantity(item)">
              -
            </button>
            <span class="mx-2 text-gray-600">{{ item.quantity }}</span>
            <button class="bg-gray-200 rounded-r-lg px-2 py-1" @click="incrementQuantity(item)">
              +
            </button>
          </div>
          <span class="ml-auto font-bold">${{ item.product.price }}</span>
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
const emit = defineEmits(['decrement-quantity', 'increment-quantity'])

const decrementQuantity = (item) => {
  if (item.quantity === 1) {
    return
  }
  emit('decrement-quantity', item)
}

const incrementQuantity = (item) => {
  emit('increment-quantity', item)
}
</script>
