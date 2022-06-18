import { useUserStore } from '~/stores/user'
import { type UserModule } from '~/types'
import { getUrlParams } from '~/utils/utils'

export const install: UserModule = ({ router }) => {
  const whiteRoute: string[] = ['/login']

  router.beforeEach(async(to: any, from, next) => {
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
