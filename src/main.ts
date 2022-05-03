import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { installBaas } from '~/composables'

import './styles/main.css'
import 'uno.css'

import 'vfonts/Lato.css'

installBaas()

const app = createApp(App)

app.use(router)
