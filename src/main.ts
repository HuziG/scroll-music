// import { ViteSSG } from 'vite-ssg'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { installPinia } from './modules/pinia'
import { installNprogress } from './modules/nprogress'
import { installPermission } from './modules/permission'
import { installPwa } from './modules/pwa'
import { installBaas } from '~/composables'
import routes from '~pages'

import './styles/main.css'
import './styles/bg.scss'
import 'uno.css'

import 'vfonts/Lato.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

installBaas()
installPinia({ app })
installNprogress({ router })
installPermission({ router })
installPwa({ router })

app.use(router)
app.mount('#app')
