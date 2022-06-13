import { useUserStore } from '../stores/user'

export default function(fun, key) {
  const useStore = useUserStore()
  const keyFun = {
    GetSheetList: () => {
      return []
    },
  }

  const interceptFn = (fun, mockFun) => {
    if (useStore.demoUser)
      return mockFun()
    else
      return fun()
  }

  interceptFn(fun, keyFun[key])
}
