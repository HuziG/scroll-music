import { type UserModule } from '~/types'

// @ts-ignore
import BaaS from 'minapp-sdk'

export const install: UserModule = ({ router }) => {
  const whiteRoute = ['/login']

  router.beforeEach(async (to: any, from, next) => {
    const data = await BaaS.auth.getCurrentUser()

    if (whiteRoute.includes(to.fullPath)) {
      if (data._email_verified) {
        // @ts-ignore
        alert('账号已登录')
        next('/')
      } else {
        next()
      }
    } else {
      if (data && data._email_verified) {
        next()
      } else {
        if (!data) {
          // @ts-ignore
          alert('账号未登录！')
        }

        if (!data._email_verified) {
          // @ts-ignore
          alert('账号未进行邮箱验证，请登录邮箱验证！')
        }

        next('/login')
      }
    }
  })
}
