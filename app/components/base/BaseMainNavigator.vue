<template>
  <UNavigationMenu
    :collapsed="collapsed"
    :items="items"
    :orientation="collapsed ? 'vertical' : 'horizontal'"
    class="w-fullnavigator-full"
    :class="{
      ' border-b border-t border-default ': !props.full
    }"
    :ui="{
      list: 'justify-between ' + (full ? 'gap-6' : ''),
      item: 'flex-1 py-1',
      link: 'after:-bottom-0 after:inset-x-2.5 after:block after:h-0.5'
    }"
    color="primary"
    variant="link"
  >
    <template #item="{ item, active }">
      <div
        :class="{
          'relative w-[80px] justify-center items-center': active
        }"
        class="pl-1.5 mx-auto group overflow-visible flex flex-col gap-1 items-center justify-center truncate"
      >
        <!-- <UIcon
          :name="active ? item.iconActive : item.icon"
          class="size-7 transition-all duration-200 group-hover:scale-125"
          :class="{
            'scale-125': active,
          }"
        /> -->
        <UAvatar
          :icon="active ? item.iconActive : item.icon"
          size="lg"
          class="rounded-xl group-hover:scale-125 transition-all duration-200"
          :ui="{
            root: active ? item?.ui?.active?.bg : item?.ui?.inactive?.bg,
            icon: active ? item?.ui?.active?.text : item?.ui?.inactive?.text
          }"
          :class="{
            'scale-150 absolute -top-10': active && full
          }"
        />

        <div
          class="text-xs mt-1 text-center truncate"
          :class="{
            '': !active,
            'font-bold': active,
            'text-[10px]': collapsed,
            'absolute -bottom-8 text-[12px]': full && active
          }"
        >
          {{ item.label }}
        </div>
      </div>
    </template>
  </UNavigationMenu>
</template>

<script setup lang="ts">
const props = defineProps<{
  collapsed: boolean | undefined
  full?: boolean
}>()
const route = useRoute()
const items = computed(() => {
  return [
    {
      id: 'folder',
      label: 'フォルダ',
      iconActive: 'i-solar-folder-with-files-linear',
      icon: 'i-solar-folder-with-files-bold-duotone',
      to: '/folder/0/',
      ui: {
        active: {
          bg: 'bg-cyan-500/80',
          text: 'text-white text-2xl'
        },
        inactive: {
          bg: 'border-default border bg-cyan-50 dark:bg-default dark:border-default',
          text: 'text-cyan-700 text-2xl dark:text-cyan-500'
        }
      }
    },
    {
      id: 'board',
      label: '掲示板',
      iconActive: 'i-solar-clipboard-linear',
      icon: 'i-solar-clipboard-bold-duotone',
      to: '/board/0/',
      ui: {
        active: {
          bg: 'bg-blue-500/80',
          text: 'text-white text-2xl'
        },
        inactive: {
          bg: 'border-default border bg-blue-50 dark:bg-default dark:border-default',
          text: 'text-blue-700 text-2xl dark:text-blue-500'
        }
      }
    },
    {
      id: 'fax',
      label: 'FAX',
      iconActive: 'i-solar-printer-linear',
      icon: 'i-solar-printer-bold-duotone',
      to: '/fax/0/fax/received',
      ui: {
        active: {
          bg: 'bg-orange-500/80',
          text: 'text-white text-2xl'
        },
        inactive: {
          bg: 'border-default border bg-orange-50 dark:bg-default dark:border-default',
          text: 'text-orange-700 text-2xl dark:text-orange-500'
        }
      }
    },
    {
      id: 'us',
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
      },
      hidden: !props.collapsed
    },
    {
      id: 'os',
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
      },
      hidden: !props.collapsed
    }
  ]
    .filter((item) => {
      if (props.collapsed || props.full) {
        return true
      }
      return !item.hidden
    })
    .map((item) => {
      return {
        ...item,
        active: route.params.main === item.id
      }
    })
})
</script>
