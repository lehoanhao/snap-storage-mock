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
            label: '事業所掲示板',
            icon: 'i-solar-clipboard-text-broken',
            to: '/board/0/'
          },
          // 検索
          {
            label: '検索',
            icon: 'i-solar-card-search-linear',
            to: '/board/search'
          }
        ]
      },
      folder: {
        title: 'フォルダメニュー',
        color: 'cyan',
        items: [
          {
            label: '事業所フォルダ',
            icon: 'i-solar-folder-open-linear',
            to: '/folder/0/'
          },
          // 検索
          {
            label: 'フォルダ検索',
            icon: 'i-solar-card-search-linear',
            to: '/folder/search'
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
              path: '/os/ct/settings/office/contract/fax',
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
      osct: {
        title: '契約内容設定メニュー',
        items: [
          {
            label: 'FAX',
            icon: 'i-fa-fax',
            to: '/os/ct/settings/office/contract/fax'
          },
          {
            label: 'ファイルストレージ',
            icon: 'i-icon-park-outline-cloud-storage',
            to: '/os/ct/settings/office/contract/file-storage'
          },
          {
            label: 'アカウント',
            icon: 'i-material-symbols-account-child-outline',
            to: '/os/ct/settings/office/contract/account'
          },
          {
            label: '郵送DM',
            icon: 'i-tabler-mail-bolt',
            disabled: true
          }
        ]
      },
      us: {
        title: '利用者設定',
        color: 'green',
        items: [
          {
            label: '新規追加',
            icon: 'i-solar-add-square-broken',
            to: {
              path: '/us/0/settings/user/new'
            }
          }
        ]
      },
      usbs: {
        title: '利用者設定メニュー',
        items: [
          {
            label: '利用者情報',
            icon: 'i-solar-user-id-linear',
            to: '/us/bs/settings/user'
          },
          {
            label: 'ケアマネ情報',
            icon: 'i-healthicons-child-care-outline',
            to: '/us/bs/settings/user/care-manager'
          },
          {
            label: '関係者情報',
            icon: 'i-fluent-people-link-28-filled',
            to: '/us/bs/settings/user/related-persons'
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
