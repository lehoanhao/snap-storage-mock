<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)
const openRight = ref(true)
const rightCollapsed = ref(false)
const links = [
  [
    {
      label: 'FAX受信',
      icon: 'i-solar-inbox-in-linear',
      badge: '4',
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'FAX送信',
      icon: 'i-solar-card-send-linear',
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: '実績報告',
      icon: 'i-solar-file-text-linear',
      type: 'trigger'
    }
  ],
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: 'https://snapstorage.example.com/feedback',
      target: '_blank'
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: 'https://snapstorage.example.com/support',
      target: '_blank'
    }
  ]
] satisfies NavigationMenuItem[][]
const items = computed(() => {
  return [
    {
      label: 'フォルダ',
      icon: 'i-solar-folder-with-files-linear',
      iconActive: 'i-solar-folder-with-files-bold-duotone',
      to: '#folder',
      active: route.hash === '#folder'
    },
    {
      label: '掲示板',
      icon: 'i-solar-clipboard-linear',
      iconActive: 'i-solar-clipboard-bold-duotone',
      to: '#bulletin-board',
      active: route.hash === '#bulletin-board'
    },
    {
      label: 'FAX',
      icon: 'i-solar-printer-linear',
      iconActive: 'i-solar-printer-bold-duotone',
      to: '#fax',
      active: route.hash === '#fax'
    }
  ]
})
const groups = computed(() => [
  {
    id: 'links',
    label: 'Go to',
    items: links.flat()
  },
  {
    id: 'code',
    label: 'Code',
    items: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        to: `https://github.com/lehoanhao/snap-storage-mock/blob/main/app/pages${
          route.path === '/' ? '/index' : route.path
        }.vue`,
        target: '_blank'
      }
    ]
  }
])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title:
      'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [
      {
        label: 'Accept',
        color: 'neutral',
        variant: 'outline',
        onClick: () => {
          cookie.value = 'accepted'
        }
      },
      {
        label: 'Opt out',
        color: 'neutral',
        variant: 'ghost'
      }
    ]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{
        header: 'h-[63px]',
        footer: 'lg:border-t lg:border-default',
        body: 'px-0 py-0 gap-0'
      }"
    >
      <template #header="{ collapsed }">
        <BaseLogo
          :collapsed="collapsed"
          size="md"
          class="cursor-pointer"
          @click="navigateTo('/')"
        />
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="items"
          :orientation="collapsed ? 'vertical' : 'horizontal'"
          class="w-full bg-elevated border-b border-t border-default mb-4 navigator-full"
          :ui="{
            list: 'justify-between',
            item: 'flex-1 py-0',
            link: 'after:-bottom-0 after:inset-x-2 after:block after:h-0.5'
          }"
          highlight
          color="primary"
          variant="link"
        >
          <template #item="{ item, active }">
            <div
              class="group overflow-visible flex flex-col items-center justify-center h-9 truncate"
            >
              <UIcon
                :name="active ? item.iconActive : item.icon"
                class="size-7 transition-all duration-200 group-hover:scale-125"
                :class="{
                  'scale-150': active
                }"
              />
              <div
                class="text-[10px] mt-1 text-center"
                :class="{
                  'text-dimmed': !active,
                  'font-bold scale-125': active
                }"
              >
                {{ item.label }}
              </div>
            </div>
          </template>
        </UNavigationMenu>
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        >
          <template #item="{ item }">
            <div
              :class="{
                'flex-col': collapsed,
                'flex-row items-center gap-2': !collapsed
              }"
              class="overflow-hidden flex items-center justify-center truncate"
            >
              <UIcon :name="item.icon" class="size-5" />
              <div
                :class="{
                  'text-[8px]': collapsed
                }"
              >
                {{ item.label }}
              </div>
            </div>
          </template>
        </UNavigationMenu>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />
    <NotificationsSlideover />
  </UDashboardGroup>
</template>
