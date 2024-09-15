import { createStore } from 'vuex'
import VuexORM from '@vuex-orm/core'
import vuexPersistedstate from 'vuex-persistedstate'
import Product from './models/Product'
import Cart from './models/Cart'
import CartItem from './models/CartItem'
import cart from './modules/cart'
import product from './modules/product'

const database = new VuexORM.Database()

database.register(Product)
database.register(Cart)
database.register(CartItem)

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { product, cart },
  plugins: [VuexORM.install(database), vuexPersistedstate()]
})

export default store
