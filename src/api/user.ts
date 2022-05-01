import BaaS from 'minapp-sdk'

// 邮箱注册
export const emailLogin = ({
  email, password
}: {
  email: string,
  password: string
}) => {
  BaaS.auth.register({email, password}).then((user: any) => {
    console.log(user)
  }).catch((err: any) => {
    // HError 对象
    console.log(err)
  })
}

// 确认注册
export const confirmEmail = () => {
  return BaaS.auth.getCurrentUser()
}
