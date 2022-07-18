const BaaS = (window as any).BaaS

// 邮箱注册
export const emailRegister = ({
  email, password,
}: {
  email: string
  password: string
}) => {
  return BaaS.auth.register({ email, password })
}

// 邮箱注册
export const telephoneRegister = ({
  telephone, password,
}: {
  telephone: string
  password: string
}) => {
  return BaaS.auth.register({ telephone, password })
}

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
}) => {
  return BaaS.auth.login({ email, password })
}

// 邮箱找回密码
export const getPasswordByEmail = ({
  email,
}: {
  email: string
}) => {
  return BaaS.auth.requestPasswordReset({ email })
}

// 发送手机验证码
export const sendSmsCode = ({
  telephone,
}: {
  telephone: string
}) => {
  return BaaS.sendSmsCode({ phone: telephone, signatureID: 1 })
}

// 验证手机验证码
export const verifySmsCode = ({
  telephone, code,
}: {
  telephone: string
  code: number
}) => {
  return BaaS.verifySmsCode({ phone: telephone, code })
}

// 短信一键登录
export const loginWithSmsVerificationCode = ({
  telephone, code,
}: {
  telephone: string
  code: number
}) => BaaS.auth.loginWithSmsVerificationCode(telephone, String(code))

// 手机登录
export const telephoneLogin = ({
  telephone, password,
}: {
  telephone: string
  password: string
}) => BaaS.auth.login({ phone: telephone, password })

// 用户退出
export const userLogout = () => {
  return BaaS.auth.logout()
}
