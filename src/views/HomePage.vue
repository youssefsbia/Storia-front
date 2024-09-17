<template>
  <h1 class="text-3xl font-bold mb-4 text--primary">
    {{ t('bestSellers') }}
  </h1>
  <div class="mx-auto">
    <v-text-field
      v-model="searchProduct"
      label="Search"
      :placeholder="t('search')"
      variant="outlined"
      dense
      class="wmb-4"
    />

    <Suspense>
      <template #fallback>
        <div
          class="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          <v-skeleton-loader
            v-for="i in 8"
            :key="`skeleton-${i}`"
            class="w-72"
            :elevation="1"
            type="card"
          ></v-skeleton-loader>
        </div>
      </template>
      <template #default>
        <div
          class="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          <single-product
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
            @go-to-product-page="goToProductPage"
          />
        </div>
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import SingleProduct from '@/components/SingleProduct.vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { onMounted, ref, watch } from 'vue'
import Product from '@/store/models/Product'
import debounce from 'lodash/debounce'
import router from '@/router'

const { t } = useI18n()
const store = useStore()

const searchProduct = ref('')
const products = ref([])

// fetch products from the store and set the products ref to the fetched products array of objects with a limit of 10
const fetchProducts = async () => {
  products.value = await store.dispatch('product/fetchProducts', 10)
}

// add to cart and notify user that operation success
const addToCart = () => {
  store.dispatch('makeSnackbarActive', true)
  store.dispatch('cart/manipulateCart')
  store.dispatch('setSnackbarText', t('addToCartOperationSuccess'))
}

const goToProductPage = (id) => {
  router.push({ name: 'Product', params: { slug: id } })
}

// search products by title and debounce the search
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

onMounted(() => {
  fetchProducts()
})
</script>
<i18n>
{
  "en": {
    "bestSellers": "Best Sellers",
    "search": "Search",
    "addToCart": "Add to Cart",
    "addToCartOperationSuccess": "Add to cart success"
  },
  "fr": {
    "bestSellers": "Meilleures ventes",
    "search": "Rechercher",
    "addToCart": "Ajouter au panier",
    "addToCartOperationSuccess": "Ajouter au panier réussie"
  }
}
</i18n>
