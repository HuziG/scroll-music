import { useUserStore } from '~/stores/user'
import { getUrlParams } from '~/utils/utils'

export const installPermission = ({ router }: any) => {
  const whiteRoute: string[] = ['/login']

  router.beforeEach(async(to: any, from: any, next: any) => {
    let data

    if (getUrlParams('user') === 'demo') {
      next()
      return false
    }

    try {
      await useUserStore().requestUserInfo()
      data = useUserStore().userInfo
    }
    catch (error) {
      data = null
    }

    if (whiteRoute.includes(to.fullPath)) {
      if (data && data._email_verified)
        next('/')
      else
        next()
    }
    else {
      if (data && data._email_verified)
        next()
      else
        next('/login')
    }
  })
}
