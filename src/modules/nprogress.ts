import NProgress from 'nprogress'

export const installNprogress = ({ router }: any) => {
  router.beforeEach((to: any, from: any) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => { NProgress.done() })
}
