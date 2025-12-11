<template>
  <q-chip square size="sm" class="text-center q-mr-none bg-blue-2">
    {{ ExpertiseTypeEnum[props.expertiseType] }}
  </q-chip>
</template>

<script setup lang="ts">
import { ExpertiseTypeEnum, ExpertiseType } from 'src/features/case/stores/types'
const props = defineProps<{
  expertiseType: ExpertiseType
}>()
</script>

<style scoped></style>
