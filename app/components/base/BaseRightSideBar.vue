<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { isNotificationsSlideoverOpen } = useDashboard()
const { currentRightNavigator } = useNavigator()
const items = computed(() => {
  return [
    {
      label: '利用者設定',
      iconActive: 'i-tdesign-user-setting',
      icon: 'i-tdesign-user-setting-filled',
      to: '/us/bs/settings/office/basic/user',
      active: route.params.main === 'us',
      ui: {
        active: {
          bg: 'bg-green-500/80',
          text: 'text-white text-2xl'
        },
        inactive: {
          bg: 'border-default border bg-green-50 dark:bg-default dark:border-default',
          text: 'text-green-700 text-2xl dark:text-green-500'
        }
      }
    },
    {
      label: '事業所設定',
      iconActive: 'i-fluent-archive-settings-16-regular',
      icon: 'i-fluent-archive-settings-16-filled',
      to: '/os/bs/settings/office/basic/user',
      active: route.params.main === 'os',
      ui: {
        active: {
          bg: 'bg-yellow-500/80',
          text: 'text-white text-2xl'
        },
        inactive: {
          bg: 'border-default border bg-yellow-50 dark:bg-default dark:border-default',
          text: 'text-yellow-700 text-2xl dark:text-yellow-500'
        }
      }
    }
  ]
})
const open = defineModel<boolean>('open', { default: true })
const collapsed = defineModel<boolean>('collapsed', { default: false })

defineShortcuts({
  c: () => (collapsed.value = !collapsed.value)
})
</script>

<template>
  <UDashboardPanel
    resizable
    :max-size="20"
    :min-size="20"
    :default-size="20"
    class="bg-elevated/15 !w-64 max-w-64"
    :ui="{
      body: 'px-0 py-0 gap-0 sm:p-0 sm:gap-0'
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

    <template #body>
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items"
        :orientation="collapsed ? 'vertical' : 'horizontal'"
        class="w-full navigator-full"
        :ui="{
          list: 'justify-between',
          item: 'flex-1 py-1',
          link: 'after:-bottom-0 after:inset-x-2.5 after:block after:h-0.5'
        }"
        color="primary"
        variant="link"
      >
        <template #item="{ item, active }">
          <div
            class="group overflow-visible flex flex-col gap-1 items-center justify-center truncate"
          >
            <UAvatar
              :icon="active ? item.iconActive : item.icon"
              size="lg"
              class="rounded-xl group-hover:scale-125 transition-all duration-200"
              :ui="{
                root: active ? item?.ui?.active?.bg : item?.ui?.inactive?.bg,
                icon: active
                  ? item?.ui?.active?.text
                  : item?.ui?.inactive?.text
              }"
            />

            <div
              class="text-xs mt-1 text-center"
              :class="{
                '': !active,
                'font-bold': active
              }"
            >
              {{ item.label }}
            </div>
          </div>
        </template>
      </UNavigationMenu>
      <div v-if="route.params.sub != '0'">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="currentRightNavigator?.items"
          :orientation="collapsed ? 'vertical' : 'vertical'"
          tooltip
          popover
          variant="link"
          highlight
          class="w-full navigator-full border-y border-default"
          :ui="{
            list: 'divide-y divide-default',
            item: 'flex-1',
            label: 'w-fit text-sm',
            link: 'px-0 py-0'
          }"
        >
          <template #item="{ item, active }">
            <div
              :class="{
                'flex-col gap-1': collapsed,
                'flex-row items-center gap-2': !collapsed,
                'border-r-default': !active
              }"
              class="border-r-4 rounded-r-sm py-3 overflow-hidden flex items-center justify-center truncate"
            >
              <UIcon :name="item.icon" class="size-5 ml-3" />
              <div
                :class="{
                  'text-[8px]': collapsed,
                  'text-left': !collapsed
                }"
              >
                {{ item.label }}
              </div>
            </div>
          </template>
        </UNavigationMenu>
      </div>
      <slot v-else>
        <div class="h-full flex flex-col gap-4 p-2">
          <img
            src="/banner02.jpeg"
            class="object object-cover h-full rounded-2xl"
          >

          <!-- <img src="/banner01.jpeg"> -->
        </div>
      </slot>
    </template>
  </UDashboardPanel>
  <!-- <UDashboardSidebar
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
      body: 'px-0 py-0 gap-0',
    }"
  >
  </UDashboardSidebar> -->
</template>
