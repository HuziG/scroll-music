import { type UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to, from, next) => {
    console.log('to', to)
    console.log('from', from)
    
    next()
  })
}
