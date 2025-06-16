<template>
  <q-card-section>
    <div class="text-caption text-accent">{{label}}</div>
    <div class="text-body2 q-mt-md">{{value}}</div>
  </q-card-section>
</template>
<script setup lang="ts">
const props = defineProps<{
  label: string,
  value?: string | undefined
}>()
</script>
