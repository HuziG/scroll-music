export const installPwa = ({ router }: any) => {
  router.isReady().then(async() => {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  })
}
