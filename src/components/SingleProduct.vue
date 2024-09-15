<template>
  <div
    class="w-72 bg-white dark:bg-gray-600 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl pt-2"
  >
    <a href="#">
      <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain mb-4" />

      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">{{ product.title }}</p>
        <div class="flex items-center">
          <p class="text-lg font-semibold text-black cursor-auto my-3">
            ${{ product.price.toFixed(2) }}
          </p>
          <div class="ml-auto">
            <img
              src="@/assets/img/svg/bugPlus.svg"
              alt="heart"
              class="w-6 h-6"
              @click="addToCart"
            />
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import CartItem from '@/store/models/CartItem'
import { ref } from 'vue'
import Product from '@/store/models/Product'

const { product } = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => Product.query().first()
  }
})

const emit = defineEmits('add-to-cart')

const quantity = ref(1)

const addToCart = () => {
  CartItem.insert({
    data: { productId: product.id, quantity: quantity.value }
  })
  emit('add-to-cart', product)
}
</script>
