import { addToCart, getCart, updateCart } from '@/services/cart'
import Cart from '../models/Cart'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async fetchCart(_, cartId) {
      const response = await getCart(cartId)
      Cart.create({ data: response.data })
    },
    async addToCart(_, payload) {
      const response = await addToCart(payload)
      Cart.create({ data: response.data })
    },
    async updateCart(_, payload) {
      const response = await updateCart(payload)
      Cart.insert({ data: response.data })
    }
  },
  getters: {}
}
