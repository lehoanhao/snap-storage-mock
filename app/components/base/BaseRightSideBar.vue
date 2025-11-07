<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { isNotificationsSlideoverOpen } = useDashboard()
const { currentRightNavigator } = useNavigator()
const { isCollapsedLeftSidebar, isShowMobileNavigator } = useApp()
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
    class="bg-elevated/25 transition-all duration-300 hidden md:block"
    :class="{
      'w-18 max-w-18': isCollapsedLeftSidebar && currentRightNavigator?.title,
      'w-64 max-w-64': !isCollapsedLeftSidebar,
      'w-0 max-w-0': !currentRightNavigator?.items?.length || isCollapsedLeftSidebar
    }"
    :ui="{
      body: 'px-0 py-0 gap-0 sm:p-0 sm:gap-0 scrollbar-thin'
    }"
  >
    <template #header>
      <UDashboardNavbar
        v-if="false"
        :ui="{
          root:
            'sm:px-2 w-full flex justify-between '
            + (isCollapsedLeftSidebar ? '' : ''),
          center:
            'flex justify-between gap-2 '
            + (isCollapsedLeftSidebar ? '' : 'flex-1')
        }"
        :toggle="false"
      >
        <div
          class="flex"
          :class="{
            'w-full flex-1 gap-2': !isCollapsedLeftSidebar,
            'flex-col-reverse gap-3 py-4 justify-center items-center':
              isCollapsedLeftSidebar
          }"
        >
          <!-- <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              :variant="isCollapsedLeftSidebar ? 'ghost' : 'ghost'"
              square
              :size="isCollapsedLeftSidebar ? 'xl' : 'lg'"
              @click="navigateTo('/fax/0/notifications')"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip> -->
          <UserMenu
            :collapsed="isCollapsedLeftSidebar"
            :class="{
              'w-full flex-1': !isCollapsedLeftSidebar
            }"
          />
        </div>
      </UDashboardNavbar>
      <UDashboardNavbar v-if="currentRightNavigator?.title" class="bg-elevated/95">
        <div
          :class="{
            'py-0 text-center': isCollapsedLeftSidebar,
            'py-2': !isCollapsedLeftSidebar
          }"
        >
          <UIcon
            v-if="isCollapsedLeftSidebar"
            name="i-solar-hamburger-menu-line-duotone"
            class="text-xl"
          />

          <span v-else class="text-xs font-bold">
            {{ currentRightNavigator?.title }}
          </span>
        </div>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- <UNavigationMenu
        v-if="!isCollapsedLeftSidebar"
        :collapsed="isCollapsedLeftSidebar"
        :items="items"
        :orientation="isCollapsedLeftSidebar ? 'vertical' : 'horizontal'"
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
            class="group overflow-visible w-full flex flex-col gap-1 items-center justify-center truncate"
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
              class="text-xs mt-1 text-center truncate"
              :class="{
                '': !active,
                'font-bold': active,
                'text-[10px]': isCollapsedLeftSidebar
              }"
            >
              {{ item.label }}
            </div>
          </div>
        </template>
      </UNavigationMenu> -->
      <div v-if="route.params.sub != '0'">
        <UNavigationMenu
          :collapsed="isCollapsedLeftSidebar"
          :items="currentRightNavigator?.items"
          :orientation="isCollapsedLeftSidebar ? 'vertical' : 'vertical'"
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
                'flex-col gap-2 w-full overflow-hidden': isCollapsedLeftSidebar,
                'flex-row items-center gap-2': !isCollapsedLeftSidebar,
                'border-r-default': !active
              }"
              class="border-r-4 rounded-r-sm py-3 overflow-hidden flex items-center justify-center truncate"
            >
              <UIcon
                :name="item.icon"
                class="size-8"
                :class="{
                  'ml-3': !isCollapsedLeftSidebar
                }"
              />
              <div
                :class="{
                  'text-[10px] text-center truncate': isCollapsedLeftSidebar,
                  'text-left': !isCollapsedLeftSidebar
                }"
              >
                {{ item.label }}
              </div>
            </div>
          </template>
        </UNavigationMenu>
      </div>
      <slot v-else>
        <div
          v-if="!isCollapsedLeftSidebar"
          class="h-screen flex flex-col gap-4 p-2 items-center justify-center"
        >
          <img
            src="/banner02.jpeg"
            class="object object-cover h-full rounded-2xl"
          >

          <!-- <img src="/banner01.jpeg"> -->
        </div>
        <div v-else class="flex-1" />
      </slot>
    </template>
    <template #footer>
      <div
        v-if="isCollapsedLeftSidebar"
        class="justify-center items-end flex lg:hidden"
      >
        <UButton
          :icon="
            isShowMobileNavigator
              ? 'i-system-uicons-pull-down'
              : 'i-clarity-storage-outline-badged'
          "
          size="xl"
          :color="isShowMobileNavigator ? 'neutral' : 'primary'"
          variant="soft"
          class="absolute rounded-full bottom-8 z-50 border border-default justify-center mt-auto"
          @click="isShowMobileNavigator = !isShowMobileNavigator"
        />
      </div>
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
