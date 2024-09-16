import { getLimitProducts, getProduct } from '@/services/product'
import Product from '../models/Product'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async fetchProducts(_, limit) {
      const response = await getLimitProducts(limit)
      Product.create({ data: response.data })
      return response.data
    },
    async getProduct(_, id) {
      const response = await getProduct(id)
      Product.insert({ data: response.data })
    }
  },
  getters: {}
}
