<template>
  <div
    class="grid"
    :class="{
      'grid-cols-1': collapsed,
      'grid-cols-3': !collapsed,
      'grid-cols-5': full,
      'divide-x divide-y border-y border-default divide-default': !full
    }"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="p-3 cursor-pointer last:border-r border-default"
    >
      <div
        :class="{
          'relative justify-center items-center': item.active
        }"
        class="mx-auto group overflow-visible flex flex-col gap-1 items-center justify-center truncate"
        @click="navigateTo(item.to)"
      >
        <!-- <UIcon
          :name="active ? item.iconActive : item.icon"
          class="size-7 transition-all duration-200 group-hover:scale-125"
          :class="{
            'scale-125': active,
          }"
        /> -->
        <UChip
          inset
          size="3xl"
          color="error"
          :show="!!item.chip"
          class="justify-center items-center flex"
        >
          <UAvatar
            :icon="item.active ? item.iconActive : item.icon"
            size="2xl"
            class="rounded-xl group-hover:scale-125 transition-all duration-200"
            :ui="{
              root: item.active ? item?.ui?.active?.bg : item?.ui?.inactive?.bg,
              icon:
                '!text-3xl '
                + (item.active
                  ? item?.ui?.active?.text
                  : item?.ui?.inactive?.text)
            }"
            :class="{
              'scale-150 absolute -top-2': item.active && full
            }"
          />
        </UChip>

        <div
          class="text-xs mt-1 text-center truncate"
          :class="{
            '': !item.active,
            'font-bold': item.active,
            'text-[10px]': collapsed,
            'absolute -bottom-17 text-[14px]': full && item.active
          }"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
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
      }
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
      }
    },
    {
      id: 'home',
      label: 'お知らせ',
      iconActive: 'i-solar-bell-bing-linear',
      icon: 'i-solar-bell-bing-bold',
      to: '/home/0/notifications',
      active: route.params.main === 'home',
      ui: {
        active: {
          bg: 'bg-purple-500/80',
          text: 'text-white text-2xl'
        },
        inactive: {
          bg: 'border-default border bg-purple-50 dark:bg-default dark:border-default',
          text: 'text-purple-700 text-2xl dark:text-purple-500'
        }
      },
      chip: '5'
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
