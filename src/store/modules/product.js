import { getLimitProducts, getProduct } from '@/services/product'
import Product from '../models/Product'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async fetchProducts(_, limit) {
      try {
        const response = await getLimitProducts(limit)
        Product.create({ data: response.data })
        return response.data
      } catch (e) {
        console.log(e)
      }
    },
    async getProduct(_, id) {
      try {
        const response = await getProduct(id)
        Product.insert({ data: response.data })
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {}
}
