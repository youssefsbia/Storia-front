import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './setup/i18n'
import vuetify from './setup/vuetify'
import '@/assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(vuetify)
app.mount('#app')
