import HomePage from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/CartPage.vue')
    },
    {
      path: '/products/:slug',
      name: 'Product',
      component: () => import('@/views/ProductPage.vue')
    }
  ]
})

export default router
