<template>
  <div
    class="overflow-hidden flex flex-row items-center gap-2 text-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600"
  >
    <UAvatar
      icon="i-clarity-storage-outline-badged"
      :size="size as any"
      :ui="{
        icon: `text-${props.size}`,
        root: 'bg-(--color-primary-100) dark:bg-(--color-primary-900)'
      }"
      class="rounded-lg"
    />

    <div
      v-if="!collapsed"
      class="truncate w-full font-bold bg-linear-to-r dark:from-primary-700 from-primary-600 via-sky-700 to-purple-800 inline-block text-transparent bg-clip-text"
      :class="collapsed ? 'text-sm' : 'text-xl'"
    >
      Snap Storage
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: '3xl'
  }
})
</script>
