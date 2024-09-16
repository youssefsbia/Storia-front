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
    darkMode: false,
    isSnackbarActive: false,
    snackbarText: ''
  },
  getters: {
    getDarkMode: (state) => state.darkMode,
    getIsSnackbarActive: (state) => state.isSnackbarActive,
    getSnackbarText: (state) => state.snackbarText
  },
  mutations: {
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode
    },
    SET_SNACKBAR_ACTIVE(state, payload) {
      state.isSnackbarActive = payload
    },
    SET_SNACKBAR_TEXT(state, payload) {
      state.snackbarText = payload
    }
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE')
    },
    makeSnackbarActive({ commit }, payload) {
      commit('SET_SNACKBAR_ACTIVE', payload)
    },
    setSnackbarText({ commit }, payload) {
      commit('SET_SNACKBAR_TEXT', payload)
    }
  },
  modules: { product, cart },
  plugins: [VuexORM.install(database), vuexPersistedstate()]
})

export default store
