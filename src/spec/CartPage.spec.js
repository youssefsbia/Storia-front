import { mount } from '@vue/test-utils'
import CartPage from '@/views/CartPage.vue'
import store from '@/store'
import { describe, it, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import { createI18n } from 'vue-i18n'
import CartItem from '@/store/models/CartItem'
import Product from '@/store/models/Product'

// Basic i18n setup for testing
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: { total: 'Total', checkout: 'Checkout', emptyCart: 'Your cart is empty' }
  }
})

describe('CartPage.vue', () => {
  const vuetify = createVuetify()
  let data = []
  beforeEach(() => {
    CartItem.create({
      data: [
        { id: 1, productId: 1, quantity: 1 },
        { id: 2, productId: 2, quantity: 2 }
      ]
    })
    Product.create({
      data: [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 50 }
      ]
    })
    data = CartItem.query().with('product').get()
  })

  it('renders cart items correctly', () => {
    const wrapper = mount(CartPage, {
      global: {
        plugins: [store, vuetify, i18n],
        stubs: [data]
      }
    })

    const cartItems = wrapper.findAllComponents({ name: 'SingleCartItem' })

    expect(cartItems.length).toBe(2)
  })

  it('calculates the total price correctly', () => {
    const wrapper = mount(CartPage, {
      global: {
        plugins: [store, vuetify, i18n],
        stubs: [data]
      }
    })
    const total = data.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    expect(wrapper.find('.cart-total').text()).toContain(`$${total}`)
  })

  it('disables checkout button if the cart total is less than the minimum required', async () => {
    const wrapper = mount(CartPage, {
      global: {
        plugins: [store, vuetify, i18n]
      },
      stubs: [data]
    })
    const button = wrapper.find('button.checkout')
    expect(button.exists()).toBe(true)
    expect(button.element.disabled).toBeTruthy()
  })
})
