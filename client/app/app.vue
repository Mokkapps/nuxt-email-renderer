<script setup lang="ts">
import Newsletter from '../../playground/emails/Newsletter.vue'
import OrderConfirmation from '../../playground/emails/OrderConfirmation.vue'
import PasswordReset from '../../playground/emails/PasswordReset.vue'
import Welcome from '../../playground/emails/Welcome.vue'
import TeamInvitation from '../../playground/emails/TeamInvitation.vue'
import { render } from '../../src/runtime/server/utils/render'

const template = await render(Newsletter)
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
