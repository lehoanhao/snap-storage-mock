import { createSharedComposable } from '@vueuse/core'

const _useApp = () => {
  const isCollapsedLeftSidebar = ref(false)
  const isShowMobileNavigator = ref(false)

  return {
    isCollapsedLeftSidebar,
    isShowMobileNavigator
  }
}

export const useApp = createSharedComposable(_useApp)
