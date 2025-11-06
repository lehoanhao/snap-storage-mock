<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { isNotificationsSlideoverOpen } = useDashboard()
const items: NavigationMenuItem[] = [
  {
    label: '利用者設定',
    icon: 'i-tdesign-user-setting'
  },
  {
    label: '事業所設定',
    icon: 'i-lucide-inbox'
  }
]

const collapsed = ref(false)

defineShortcuts({
  c: () => (collapsed.value = !collapsed.value)
})
</script>

<template>
  <UDashboardSidebar
    id="right-sidebar"
    v-model:collapsed="collapsed"
    collapsible
    resizable
    side="right"
    class="bg-elevated/15"
    :ui="{ footer: 'lg:border-t lg:border-default', header: 'px-0', body: 'px-0 py-0' }"
  >
    <template #header>
      <UDashboardNavbar
        :ui="{
          root: 'sm:px-2 w-full flex'
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
      class="w-full border-b border-default"
      :ui="{
        root: 'flex w-full',
        list: 'flex w-full',
        item: 'flex-1 w-full',
        link: 'w-full justify-center',
        linkLabel: 'text-xs w-full text-center'
      }"
    />
    <div class="">
      <slot />
    </div>
  </UDashboardSidebar>
</template>
