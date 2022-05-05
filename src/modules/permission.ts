import { type UserModule } from '~/types'

// @ts-ignore
import BaaS from 'minapp-sdk'

export const install: UserModule = ({ router }) => {
  const whiteRoute = ['/login']

  router.beforeEach(async (to: any, from, next) => {
    console.log('route', to)

    let data

    try {
      data = await BaaS.auth.getCurrentUser()
    } catch (error) {
      data = null
    }

    console.log(data)

    if (whiteRoute.includes(to.fullPath)) {
      if (data && data._email_verified) {
        next('/')
      } else {
        next()
      }
    } else {
      if (data && data._email_verified) {
        next()
      } else {
        next('/login')
      }
    }
  })
}
