<template>
  <h1 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
    {{ t('bestSellers') }}
  </h1>
  <div class="mx-auto">
    <v-text-field
      v-model="searchProduct"
      label="Search"
      :placeholder="t('search')"
      variant="outlined"
      dense
      class="mb-4"
    ></v-text-field>
    <div
      class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      <single-product v-for="product in products" :key="product.id" :product="product">
        <template #action>
          <div class="d-flex justify-center align-end">
            <v-btn color="primary" @click="addToCart(product)">{{ t('addToCart') }}</v-btn>
          </div>
        </template>
      </single-product>
    </div>
  </div>
</template>
<script setup>
import SingleProduct from '@/components/SingleProduct.vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { onMounted, ref, watch } from 'vue'
import Product from '@/store/models/Product'
import debounce from 'lodash/debounce'

const { t } = useI18n()
const store = useStore()

const searchProduct = ref('')
let products = ref([])

const fetchProducts = () => {
  store.dispatch('product/fetchProducts', 10)
}

const addToCart = () => {
  store.dispatch('cart/addToCart', {})
}

const debounceSearch = debounce((val) => {
  products.value = Product.query()
    .where('title', (title) => title.includes(val))
    .get()
}, 600)

watch(searchProduct, (val) => {
  if (!val) {
    products.value = Product.all()
    return
  }
  debounceSearch(val)
})

onMounted(async () => {
  await fetchProducts()
  products.value = Product.all()
})
</script>
<i18n>
{
  "en": {
    "bestSellers": "Best Sellers"
  },
  "fr": {
    "bestSellers": "Meilleures ventes"
  }
}
</i18n>
