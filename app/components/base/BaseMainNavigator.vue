<template>
  <UNavigationMenu
    :collapsed="collapsed"
    :items="items"
    :orientation="collapsed ? 'vertical' : 'horizontal'"
    class="w-full border-b border-t border-default navigator-full"
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
        class="pl-1.5 group overflow-visible flex flex-col gap-1 items-center justify-center truncate"
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
</template>

<script setup lang="ts">
defineProps<{
  collapsed: boolean | undefined
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
    }
  ].map((item) => {
    return {
      ...item,
      active: route.params.main === item.id
    }
  })
})
</script>
