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
  state: {
    darkMode: false
  },
  getters: {
    getDarkMode: (state) => state.darkMode
  },
  mutations: {
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode
    }
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE')
    }
  },
  modules: { product, cart },
  plugins: [VuexORM.install(database), vuexPersistedstate()]
})

export default store
