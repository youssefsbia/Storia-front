import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from '@/App.vue'
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    helloWorld: 'Hello World!'
  },
  fr: {
    helloWorld: 'Bonjour le monde!'
  }
}

const i18n = (local) =>
  createI18n({
    locale: local,
    messages
  })

describe('English translation', () => {
  it('renders the translated message "Hello World!"', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [i18n('en')]
      }
    })
    expect(wrapper.text()).toContain('Hello World!')
  })
})
describe('French translation', () => {
  it('renders the translated message "Bonjour le monde!"', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [i18n('fr')]
      }
    })
    expect(wrapper.text()).toContain('Bonjour le monde!')
  })
})
