import BaaS from 'minapp-sdk'

const CLIENT_ID = 'f5e845f48992981c90cc'

export const installBaas = () => {
  BaaS.init(CLIENT_ID, {})
}
