<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const profileSchema = z.object({
  companyName: z.string().min(2, '法人名を入力してください。'),
  companyAddress: z.string().min(2, '法人住所を入力してください。'),
  contractManager: z.string().min(2, '契約担当者を入力してください。'),
  contractPhone: z.string().min(10, '無効な電話番号です。'),
  contractEmail: z.string().email('有効なメールアドレスを入力してください。'),
  billingManager: z.string().min(2, '請求担当者を入力してください。'),
  billingPhone: z.string().min(10, '無効な電話番号です。'),
  billingEmail: z.string().email('有効なメールアドレスを入力してください。'),
  sendInvoiceByEmail: z.boolean(),
  bankTransferRegistered: z.boolean()
})

type ProfileSchema = z.output<typeof profileSchema>

const profile = reactive<ProfileSchema>({
  companyName: '株式会社プレイネクストラボ',
  companyAddress: '東京都千代田区丸の内1-1-1',
  contractManager: 'Lan Nguyen',
  contractPhone: '03-1234-5678',
  contractEmail: 'contract@example.com',
  billingManager: 'Taro Yamada',
  billingPhone: '03-9876-5432',
  billingEmail: 'billing@example.com',
  sendInvoiceByEmail: true,
  bankTransferRegistered: false
})
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  toast.add({
    title: 'Success',
    description: 'Your settings have been updated.',
    icon: 'i-lucide-check',
    color: 'success'
  })
  console.log(event.data)
}
</script>

<template>
  <UDashboardPanel id="settings" :ui="{ body: 'lg:pb-12' }">
    <template #header>
      <UDashboardNavbar title="基本設定">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-2 sm:gap-6 lg:gap-12 w-full max-w-xl mx-auto">
        <UForm
          id="settings"
          :schema="profileSchema"
          :state="profile"
          @submit="onSubmit"
        >
          <UPageCard
            icon="i-solar-buildings-linear"
            title="法人基本情報"
            variant="naked"
            orientation="horizontal"
            class="mb-4"
            :ui="{
              wrapper: 'flex-row gap-2'
            }"
          />

          <UPageCard
            variant="subtle"
            :ui="{ container: 'divide-y divide-default' }"
          >
            <UFormField
              name="companyName"
              label="法人名"
              description="正式な法人です"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <UInput
                v-model="profile.companyName"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="companyAddress"
              label="法人住所"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <div class="flex flex-col gap-2 justify-end sm:items-end">
                <UInput
                  model-value="134-0063"
                  autocomplete="off"
                  class="w-full"
                  icon="i-solar-map-point-wave-broken"
                />
                <UTextarea
                  v-model="profile.companyAddress"
                  :rows="3"
                  autoresize
                  class="w-full"
                />
              </div>
            </UFormField>
          </UPageCard>

          <UPageCard
            icon="i-stash-user-shield"
            title="契約担当者情報"
            variant="naked"
            orientation="horizontal"
            class="mb-4 mt-8"
            :ui="{
              wrapper: 'flex-row gap-2'
            }"
          />
          <UPageCard
            variant="subtle"
            :ui="{ container: 'divide-y divide-default' }"
          >
            <UFormField
              name="contractManager"
              label="契約担当"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <UInput
                v-model="profile.contractManager"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="contractPhone"
              label="契約担当 電話番号"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <UInput
                v-model="profile.contractPhone"
                v-mask="'##-####-####'"
                placeholder="00-0000-0000"
                type="text"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="contractEmail"
              label="契約担当 E-mail"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <UInput
                v-model="profile.contractEmail"
                type="email"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>
          </UPageCard>

          <UPageCard
            icon="i-stash-user-dollar"
            title="請求担当者情報"
            variant="naked"
            orientation="horizontal"
            class="mb-4 mt-8"
            :ui="{
              wrapper: 'flex-row gap-2'
            }"
          />
          <UPageCard
            variant="subtle"
            :ui="{ container: 'divide-y divide-default' }"
          >
            <UFormField
              name="billingManager"
              label="請求担当"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <UInput
                v-model="profile.billingManager"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="billingPhone"
              label="請求担当 電話番号"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <UInput
                v-model="profile.billingPhone"
                v-mask="'##-####-####'"
                placeholder="00-0000-0000"
                type="text"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="billingEmail"
              label="請求担当 E-mail"
              required
              class="flex flex-col gap-2 not-last:pb-4"
            >
              <UInput
                v-model="profile.billingEmail"
                type="email"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>
          </UPageCard>

          <UPageCard
            icon="i-solar-settings-linear"
            title="請求設定"
            variant="naked"
            orientation="horizontal"
            class="mb-4 mt-8"
            :ui="{
              wrapper: 'flex-row gap-2'
            }"
          />
          <UPageCard
            variant="subtle"
            :ui="{ container: 'divide-y divide-default' }"
          >
            <UFormField
              name="sendInvoiceByEmail"
              label="請求書メール配信"
              description="請求書をメールで自動配信します。請求担当者のE-mail宛に送信されます。"
              class="flex flex-row items-start justify-between gap-4 not-last:pb-4"
            >
              <USwitch
                v-model="profile.sendInvoiceByEmail"
              />
            </UFormField>

            <UFormField
              name="bankTransferRegistered"
              label="口座振替登録完了"
              description="口座振替登録が完了している場合はチェックを入れてください。"
              class="flex flex-row items-start justify-between gap-4 not-last:pb-4"
            >
              <USwitch
                v-model="profile.bankTransferRegistered"
              />
            </UFormField>
          </UPageCard>
        </UForm>
      </div>
    </template>
  </UDashboardPanel>
</template>
