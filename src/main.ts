/*
 * @Author: HuziG 1067408814@qq.com
 * @Date: 2022-07-31 17:48:04
 * @LastEditors: HuziG 1067408814@qq.com
 * @LastEditTime: 2022-08-31 22:23:21
 * @FilePath: /scroll-music/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
