<template>
  <div
    class="px-3 text-xs text-muted font-mono font-semibold bg-elevated/85 border-b border-default truncate"
    :class="{
      'py-0 text-center': collapsed,
      'py-2': !collapsed
    }"
  >
    <UIcon
      v-if="collapsed"
      name="i-solar-double-alt-arrow-down-line-duotone"
      class="text-xl inline-block"
    />

    <span v-else>
      {{ currentNavigator?.title }}
    </span>
  </div>
  <UNavigationMenu
    :collapsed="collapsed"
    :items="currentNavigator?.items"
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
          'border-l-default': !active
        }"
        class="border-l-4 rounded-l-sm py-3 overflow-hidden flex items-center justify-center truncate"
      >
        <UIcon
          :name="item.icon"
          class="size-5"
          :class="{
            'ml-4': !collapsed
          }"
        />
        <div
          :class="{
            'text-[10px] text-center': collapsed,
            'text-left': !collapsed
          }"
        >
          {{ item.label }}
        </div>
      </div>
    </template>
  </UNavigationMenu>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { currentNavigator } = useNavigator()
defineProps<{
  collapsed: boolean | undefined
}>()
const route = useRoute()
const links = [
  {
    label: 'FAX受信',
    icon: 'i-solar-inbox-in-linear',
    badge: '4'
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
</script>
