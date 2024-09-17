import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import HomePage from '@/views/HomePage.vue'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import Product from '@/store/models/Product'
import { createI18n } from 'vue-i18n'
import store from '@/store'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: { total: 'Total', checkout: 'Checkout', emptyCart: 'Your cart is empty' }
  }
})

describe('HomePage.vue', () => {
  const vuetify = createVuetify()
  let products = []
  beforeEach(() => {
    Product.create({
      data: [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 50 }
      ]
    })
    products = Product.all()
  })
  it('renders a list of products', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [store, vuetify, i18n],
        stubs: [products]
      }
    })
    setTimeout(() => {
      const productElements = wrapper.findAllComponents({ name: 'SingleProduct' })
      expect(productElements.length).toBe(2)
    }, 1000)
  })
})
