<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Period, Range } from '~/types'

const { isNotificationsSlideoverOpen } = useDashboard()

const items = [
  [
    {
      label: 'New mail',
      icon: 'i-lucide-send',
      to: '/inbox'
    },
    {
      label: 'New customer',
      icon: 'i-lucide-user-plus',
      to: '/customers'
    }
  ]
] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="ホーム" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse name="default" />
        </template>

        <template #right />
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body />
  </UDashboardPanel>
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
