const BaaS = (window as any).BaaS

const CLIENT_ID = (window as any).BAAS_KEY

export const installBaas = () => {
  BaaS.init(CLIENT_ID, {})
}
