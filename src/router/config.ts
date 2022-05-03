const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    title: '首页',
    props: true,
    component: () => import('~/pages/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    props: true,
    component: () => import('~/pages/login.vue')
  }
]

export default routes
