import { useMediaQuery } from '@vueuse/core'

export default function() {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  return {
    isLargeScreen,
  }
}
