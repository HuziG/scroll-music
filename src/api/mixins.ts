import { useUserStore } from '~/stores/user'

export default function() {
  const requestAdmins = () => {
    if (useUserStore().demoUser)
      return new Error('current is demo mode, forbidden request methods')
  }

  return {
    requestAdmins,
  }
}
