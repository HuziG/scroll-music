import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { installBaas } from '~/composables'

import './styles/main.css'
import 'uno.css'

import 'vfonts/Lato.css'

installBaas()

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))
  },
)
