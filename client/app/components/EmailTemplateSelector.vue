<script setup lang="ts">
interface Props {
  emailTemplates: Array<EmailTemplate>
  selectedTemplate: EmailTemplate | null
}
defineProps<Props>()

defineEmits<{
  select: [template: EmailTemplate]
}>()
</script>

<template>
  <div
    class="space-y-2"
  >
    <div class="flex items-center justify-between">
      <NIconTitle
        text="Select a template:"
        icon="carbon:list"
      />
      <NBadge>
        {{ emailTemplates.length }} templates
      </NBadge>
    </div>

    <NCard
      v-if="emailTemplates.length > 0"
      class="grid gap-3"
    >
      <NSelect
        :model-value="selectedTemplate"
        @update:model-value="$emit('select', $event as EmailTemplate)"
      >
        <option
          v-for="template in emailTemplates"
          :key="template.filename"
          :value="template"
        >
          {{ template.filename }}
        </option>
      </NSelect>
    </NCard>
  </div>
</template>
