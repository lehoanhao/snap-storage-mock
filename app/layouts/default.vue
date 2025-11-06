<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const { isCollapsedLeftSidebar } = useApp()
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
      v-model:collapsed="isCollapsedLeftSidebar"
      collapsible
      resizable
      class="bg-elevated/25"
      :collapsed-size="5"
      :min-size="14"
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
          class="cursor-pointer mx-auto"
          @click="navigateTo('/fax/0/notifications')"
        />
      </template>

      <template #default="{ collapsed }">
        <BaseMainNavigator :collapsed="collapsed" />
        <BaseLeftNavigator
          :collapsed="collapsed"
          class="border-default"
          :class="{
            'border-t': collapsed
          }"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />
    <NotificationsSlideover />
  </UDashboardGroup>
</template>
