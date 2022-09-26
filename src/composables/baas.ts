import { BAAS_KEY } from 'env'

const BaaS = (window as any).BaaS

const CLIENT_ID = BAAS_KEY

export const installBaas = () => {
  BaaS.init(CLIENT_ID, {})
}
