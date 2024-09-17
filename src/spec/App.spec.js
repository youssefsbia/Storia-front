// Mock ResizeObserver
global.ResizeObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import Vuex from 'vuex'
import router from '@/router'
import store from '@/store'
import { createI18n } from 'vue-i18n'

// Basic i18n setup for testing
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome'
    }
  }
})

describe('App.vue', () => {
  const vuetify = createVuetify()

  it('renders the router-view', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify, store, router, i18n]
      }
    })
    expect(wrapper.find('.v-application').exists()).toBe(true)
  })
})
