<template>
  <div class="col-6 q-mt-none q-pt-lg">
    <div class="text-grey-8 text-weight-medium title q-pa-sm">{{ title }}</div>
    <q-option-group v-bind="$attrs" square dense2 size="sm" color="secondary" type="checkbox" class="text-grey-8"
      v-model="model" />
  </div>
</template>
<script setup lang="ts">
const model = defineModel()

defineProps<{
  title: string
}>()
</script>
