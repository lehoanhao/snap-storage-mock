<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const fileRef = ref<HTMLInputElement>()

const profileSchema = z.object({
  name: z.string().min(2, 'Too short'),
  email: z.string().email('Invalid email'),
  officeId: z
    .array(z.string().length(1))
    .min(8, '８桁の英数字で入力してください。')
    .max(8, '８桁の英数字で入力してください。'),
  customerNumber: z
    .array(z.string().length(1))
    .min(8, '８桁の英数字で入力してください。')
    .max(8, '８桁の英数字で入力してください。'),
  faxNumber: z.string().min(10, '無効なFAX番号。'),
  faxNumberReceive: z.string().min(10, '無効なFAX番号。'),
  smsNumber: z.string().min(10, '無効なSMS番号。')
})

type ProfileSchema = z.output<typeof profileSchema>

const profile = reactive<Partial<ProfileSchema>>({
  name: 'Lan Nguyen',
  email: 'hao.le@playnext-lab.co.jp',
  officeId: '94573457'.split(''),
  customerNumber: '12345678'.split(''),
  faxNumber: '1234567890',
  faxNumberReceive: '0987654321',
  smsNumber: '03-1234-5678'
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
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full mx-auto">
        <UForm
          id="settings"
          :schema="profileSchema"
          :state="profile"
          @submit="onSubmit"
        >
          <UPageCard
            title="ユーザー情報"
            description="ユーザー情報の設定を行います。"
            variant="naked"
            orientation="horizontal"
            class="mb-4"
          >
            <UButton
              form="settings"
              label="リロード"
              color="neutral"
              class="w-fit lg:ms-auto"
            />
          </UPageCard>

          <UPageCard variant="subtle">
            <UFormField
              name="officeId"
              label="事業所ID"
              description="8桁の英数字で構成された事業所ID"
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UPinInput
                v-model="profile.officeId"
                type="number"
                placeholder="0"
                :length="8"
                variant="subtle"
                disabled
              />
            </UFormField>

            <UFormField
              name="customerNumber"
              label="お客様番号"
              description="※サービス提供者にて付与された8桁の英数字のお客様番号"
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UPinInput
                v-model="profile.customerNumber"
                type="number"
                placeholder="0"
                :length="8"
                variant="subtle"
                disabled
              />
            </UFormField>
            <USeparator />
            <UFormField
              name="faxNumber"
              label="送信FAX番号"
              description="※事業所からFAX送信時に送信先へ表示される番号"
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput
                v-model="profile.faxNumber"
                v-mask="'##-####-####'"
                placeholder="00-0000-0000"
                type="text"
                autocomplete="off"
                variant="subtle"
                readonly
              />
            </UFormField>
            <USeparator />
            <UFormField
              name="faxNumberReceive"
              label="受信FAX番号"
              description="※事業所のFAX受信番号"
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput
                v-model="profile.faxNumberReceive"
                v-mask="'##-####-####'"
                placeholder="00-0000-0000"
                type="text"
                autocomplete="off"
                variant="subtle"
                readonly
              />
            </UFormField>
            <USeparator />
            <UFormField
              name="faxNumberReceive"
              label="SMS番号"
              description="※事業所からSMSを送信時に送信先へ表示される番号"
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput
                v-model="profile.faxNumberReceive"
                v-mask="'##-####-####'"
                placeholder="00-0000-0000"
                type="text"
                autocomplete="off"
                variant="subtle"
                readonly
              />
            </UFormField>
            <USeparator />
            <UFormField
              name="faxNumberReceive"
              label="送信E‐mail"
              description="※事業所からSMSを送信時に送信先へ表示される番号。"
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput
                v-model="profile.email"
                placeholder="example@example.com"
                type="email"
                autocomplete="off"
                variant="subtle"
                readonly
                class="w-80"
              />
            </UFormField>
          </UPageCard>
        </UForm>
      </div>
    </template>
  </UDashboardPanel>
</template>
