import { addToCart, getCart, updateCart } from '@/services/cart'
import Cart from '../models/Cart'
import CartItem from '../models/CartItem'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async fetchCart(_, cartId) {
      const response = await getCart(cartId)
      Cart.create({ data: response.data })
    },
    async manipulateCart() {
      const playload = CartItem.all()
      const currentCart = Cart.query().first()
      let response = null
      if (!currentCart) {
        response = await addToCart(playload)
        Cart.create({ data: response.data })
      } else {
        response = await updateCart(currentCart.id, playload)
        Cart.insert({ data: response.data })
      }
    }
  },
  getters: {}
}
