import BaaS from 'minapp-sdk'
import { type UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  const whiteRoute = ['/login']

  router.beforeEach(async(to: any, from, next) => {
    let data

    try {
      data = await BaaS.auth.getCurrentUser()
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
