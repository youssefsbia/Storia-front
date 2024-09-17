<template>
  <div class="bg-gray-100 dark:bg-gray-800 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="md:flex-1 px-4">
          <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
            <img class="w-full h-full" :src="product.image" :alt="product.title" />
          </div>
          <div class="flex mx-2 mb-4 flex-col gap-2 md:flex-row">
            <div class="w-full md:w-1/2 px-2">
              <button
                class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                @click="addToCart"
              >
                {{ t('addToCart') }}
              </button>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <button
                class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {{ t('buyNow') }}
              </button>
            </div>
          </div>
        </div>
        <div class="md:flex-1 px-4">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {{ product?.title }}
          </h2>
          <div class="flex mb-4">
            <div class="mr-4">
              <span class="font-bold text-gray-700 dark:text-gray-300">{{ t('price') }}:</span>
              <span class="text-gray-600 dark:text-gray-300">${{ product?.price }}</span>
            </div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300"
                >{{ t('availability') }}:</span
              >
              <span class="text-gray-600 dark:text-gray-300">{{ t('inStock') }}</span>
            </div>
          </div>
          <div>
            <span class="font-bold text-gray-700 dark:text-gray-300"
              >{{ t('productDescription') }}:</span
            >
            <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
              {{ product?.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import Product from '@/store/models/Product'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import CartItem from '@/store/models/CartItem'

const { t } = useI18n()
const route = useRoute()
const store = useStore()

const product = computed(() => Product.query().find(route.params.slug))

const addToCart = () => {
  const isProductInCart = CartItem.query().where('productId', product.value.id).exists()
  if (isProductInCart) {
    return
  }
  CartItem.insert({
    data: { productId: product.value.id }
  })
  store.dispatch('cart/manipulateCart')
  store.dispatch('makeSnackbarActive', true)
  store.dispatch('setSnackbarText', t('addToCartOperationSuccess'))
}
</script>

<i18n>
{
  "en": {
    "addToCart": "Add to Cart",
    "buyNow": "Buy Now",
    "price": "Price",
    "availability": "Availability",
    "inStock": "In Stock",
    "productDescription": "Product Description",
    "addToCartOperationSuccess": "Add to cart success"
  },
  "fr": {
    "addToCart": "Ajouter au panier",
    "buyNow": "Acheter maintenant",
    "price": "Prix",
    "availability": "Disponibilité",
    "inStock": "En Stock",
    "productDescription": "Description du produit",
    "addToCartOperationSuccess": "Ajout au panier réussi"
  }
}
</i18n>
