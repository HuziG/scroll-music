import BaaS from 'minapp-sdk'

// 邮箱注册
export const emailRegister = ({
  email, password
}: {
  email: string,
  password: string
}) => BaaS.auth.register({email, password})

// 确认注册
export const confirmEmail = () => {
  BaaS.auth.getCurrentUser()
    .then((user: any) => {
      return user.requestEmailVerification()
    }).then((res: any) => {
      console.log(res)
    }).catch((err: any) => {
      // HError
      console.log(err)
    })
}
