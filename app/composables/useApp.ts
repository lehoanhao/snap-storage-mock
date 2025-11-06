import { createSharedComposable } from '@vueuse/core'

const _useApp = () => {
  const isCollapsedLeftSidebar = ref(false)

  return {
    isCollapsedLeftSidebar
  }
}

export const useApp = createSharedComposable(_useApp)
