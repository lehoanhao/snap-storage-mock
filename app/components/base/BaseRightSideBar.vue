<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { isNotificationsSlideoverOpen } = useDashboard()
const items = computed(() => {
  return [
    {
      label: '利用者設定',
      icon: 'i-tdesign-user-setting',
      to: '#user-settings',
      active: route.hash === '#user-settings'
    },
    {
      label: '事業所設定',
      icon: 'i-fluent-archive-settings-16-regular',
      to: '#office-settings',
      active: route.hash === '#office-settings'
    }
  ] satisfies NavigationMenuItem[]
})
const open = defineModel<boolean>('open', { default: true })
const collapsed = defineModel<boolean>('collapsed', { default: false })

defineShortcuts({
  c: () => (collapsed.value = !collapsed.value)
})
</script>

<template>
  <UDashboardSidebar
    id="right-sidebar"
    v-model:open="open"
    v-model:collapsed="collapsed"
    collapsible
    resizable
    side="right"
    class="bg-elevated/15"
    :ui="{
      footer: 'lg:border-t lg:border-default',
      header: 'px-0',
      body: 'px-0 py-0 gap-0'
    }"
  >
    <template #header>
      <UDashboardNavbar
        :ui="{
          root: 'sm:px-2 w-full flex justify-between',
          center: 'flex justify-between flex-1 gap-2'
        }"
      >
        <UTooltip text="Notifications" :shortcuts="['N']">
          <UButton
            color="neutral"
            variant="ghost"
            square
            @click="isNotificationsSlideoverOpen = true"
          >
            <UChip color="error" inset>
              <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
            </UChip>
          </UButton>
        </UTooltip>
        <UserMenu :collapsed="collapsed" class="w-full flex-1" />
      </UDashboardNavbar>
    </template>
    <UNavigationMenu
      :collapsed="collapsed"
      :items="items"
      orientation="horizontal"
      class="w-full border-b border-default navigator-full px-2"
      :ui="{
        linkLabel: 'text-xs',
        list: 'justify-center w-full',
        item: 'justify-center flex-1'
      }"
      variant="pill"
      color="primary"
    />
    <slot />
  </UDashboardSidebar>
</template>
