<script setup lang="ts">

</script>

<template>
  <UDashboardPanel id="settings" :ui="{ body: 'lg:pb-12' }" class="">
    <template #header>
      <UDashboardNavbar title="契約内容">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-2 sm:gap-6 lg:gap-12 w-full  mx-auto ">
        <UForm
          id="settings"
        >
          <UPageCard
            title="アカウントサービス"
            variant="naked"
            orientation="horizontal"
            class="mb-4"
          />
        </UForm>
      </div>
    </template>
  </UDashboardPanel>
</template>
