import { type UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to: any, from: any, next: any) => {

    console.log('to', to)
    console.log('from', from)

    next()
  })
}
