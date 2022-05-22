import BaaS from 'minapp-sdk'

// 邮箱注册
export const emailRegister = ({
  email, password,
}: {
  email: string
  password: string
}) => BaaS.auth.register({ email, password })

// 确认注册
export const confirmEmail = () => {
  BaaS.auth.getCurrentUser()
    .then((user: any) => {
      return user.requestEmailVerification()
    }).then((res: any) => {
      console.warn(res)
    }).catch((err: any) => {
      // HError
      console.warn(err)
    })
}

// 邮箱登录
export const emailLogin = ({
  email, password,
}: {
  email: string
  password: string
}) => BaaS.auth.login({ email, password })

// 邮箱找回密码
export const getPasswordByEmail = ({
  email,
}: {
  email: string
}) => BaaS.auth.requestPasswordReset({ email })

// 用户登录
export const userLogout = () => {
  return BaaS.auth.logout()
}
