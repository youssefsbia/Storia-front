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
        try {
          response = await addToCart(playload)
          Cart.create({ data: response.data })
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          response = await updateCart(currentCart.id, playload)
          Cart.insert({ data: response.data })
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  getters: {}
}
