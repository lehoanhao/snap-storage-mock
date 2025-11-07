import { createSharedComposable } from '@vueuse/core'

const route = useRoute()
const appConfig = useAppConfig()
const _useNavigator = () => {
  const route = useRoute()
  const navigators = computed(() => {
    return {
      fax: {
        title: 'FAXメニュー',
        color: 'orange',
        items: [
          {
            label: 'FAX受信',
            icon: 'i-solar-inbox-in-linear',
            badge: '4',
            to: '/fax/0/fax/received'
          },
          {
            label: 'FAX送信',
            icon: 'i-solar-card-send-linear'
          },
          {
            label: '実績報告',
            icon: 'i-solar-file-text-linear',
            type: 'trigger'
          }
        ]
      },
      board: {
        title: '掲示板メニュー',
        color: 'blue',
        items: [
          {
            label: '掲示板一覧',
            icon: 'i-solar-clipboard-linear',
            to: '/board/0/'
          }
        ]
      },
      folder: {
        title: 'フォルダメニュー',
        color: 'cyan',
        items: [
          {
            label: '書類一覧',
            icon: 'i-solar-folder-open-linear',
            to: '/folder/0/'
          }
        ]
      },
      os: {
        title: '事業所設定',
        color: 'yellow',
        items: [
          {
            label: '基本情報',
            icon: 'i-solar-user-circle-broken',
            to: {
              path: '/os/bs/settings/office/basic/user'
            },
            active: route.params.sub === 'bs'
          },
          {
            label: '契約内容',
            icon: 'i-solar-file-text-broken',
            to: {
              path: '/os/ct/settings/office/basic/user',
              hash: route.hash
            }
          }
        ]
      },
      osbs: {
        title: '基本情報設定メニュー',
        items: [
          {
            label: 'ユーザー情報',
            icon: 'i-solar-user-id-linear',
            to: '/os/bs/settings/office/basic/user'
          },
          {
            label: '法人情報',
            icon: 'i-solar-buildings-linear',
            to: '/os/bs/settings/office/basic/corporation'
          },
          {
            label: '事業所情報',
            icon: 'i-solar-case-linear'
          },
          {
            label: 'サービス情報',
            icon: 'i-solar-atom-broken',
            disabled: true
          }
        ]
      },

      us: {
        title: '利用者設定',
        color: 'green',
        items: [
          {
            label: '基本情報',
            icon: 'i-solar-user-circle-broken',
            to: {
              path: '/us/bs/settings/office/basic/user'
            }
          }
        ]
      }
    }
  })

  const currentRightNavigator = computed(() => {
    return (
      navigators.value[(route.params.main + route.params.sub) as string] || []
    )
  })
  const currentNavigator = computed(() => {
    return navigators.value[route.params.main as string] || []
  })

  // watch route.params.main to set theme to color of current navigator
  watch(
    () => route.params.main,
    (newVal) => {
      const navigator = navigators.value[newVal as string]
      if (navigator && navigator.color) {
        appConfig.ui.colors.primary = navigator.color
      } else {
        appConfig.ui.colors.primary = 'blue'
      }
    },
    { immediate: true }
  )
  return {
    navigators,
    currentNavigator,
    currentRightNavigator
  }
}

export const useNavigator = createSharedComposable(_useNavigator)
