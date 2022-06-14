import { useUserStore } from '~/stores/user'
import { type UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  const whiteRoute: string[] = []

  const demoUser = router.currentRoute.value.query.user === 'demo'

  if (!demoUser)
    whiteRoute.push('/login')

  router.beforeEach(async(to: any, from, next) => {
    let data

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
