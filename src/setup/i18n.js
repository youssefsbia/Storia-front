import { createI18n } from 'vue-i18n'
import globalMessages from '@/lang/messages.json'

const messages = {
  en: {
    ...globalMessages.en
  },
  fr: {
    ...globalMessages.fr
  }
}

export default createI18n({
  legacy: false,
  locale: import.meta.env.VITE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: messages,
  missingWarn: false,
  fallbackWarn: false
})
