<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links = [[{
  label: 'General',
  icon: 'i-lucide-user',
  to: '/settings',
  exact: true
}, {
  label: 'Members',
  icon: 'i-lucide-users',
  to: '/settings/members'
}, {
  label: 'Notifications',
  icon: 'i-lucide-bell',
  to: '/settings/notifications'
}, {
  label: 'Security',
  icon: 'i-lucide-shield',
  to: '/settings/security'
}], [{
  label: 'Documentation',
  icon: 'i-lucide-book-open',
  to: 'https://snapstorage.example.com/docs',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <NuxtPage />
  <BaseRightSideBar>
    <div class="p-4 h-full flex flex-col gap-4">
      <UCard
        v-for="i in 2"
        :key="i"
        variant="subtle"
        class="p-4 flex-1 flex items-center justify-center"
      >
        <div class="text-sm text-muted text-center">
          <b class="text-lg">バナー </b><br>
          QLC管理画面で設定した内容を表示。
        </div>
      </UCard>
    </div>
  </BaseRightSideBar>
</template>
