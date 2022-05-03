// 引入 router
import { createRouter, createWebHistory } from 'vue-router'
// 引入路由各页面配置
import routes from './config'

const router = createRouter({
  history: createWebHistory(),
  routes
} as any)

export default router
