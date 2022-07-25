import { useUserStore } from '~/stores/user'

export const installPermission = ({ router }: any) => {
  const skipRoute: string[] = ['/login']
  const demoPermissionRoute: string[] = ['/login', '/scroll', '/']

  router.beforeEach(async(to: any, from: any, next: any) => {
    let userData

    const userStore = useUserStore()

    try {
      await userStore.requestUserInfo()
      userData = userStore.userInfo
    }
    catch (error) {
      userData = null
    }

    const isDemoMode = !userData

    userStore.demoUser = isDemoMode

    // 如果为 demo 模式，则不设防
    if (isDemoMode && demoPermissionRoute.includes(to.path))
      next()

    if (!isDemoMode && skipRoute.includes(to.path))
      next('/')

    else
      next()
  })
}
