<template>
  <q-card flat bordered class="q-pa-md root-card">
    <div class="text-subtitle2">{{title}}</div>
    <div class="q-pa-xs">
      <DefectAttribute
        v-for="option in options"
        :key="option.id"
        :type="type"
        :name="option.name"
        @click="emit('select', option.id)"
      />
    </div>
  </q-card>
</template>
<script setup lang="ts">
import DefectAttribute, {DefectAttributeType} from "src/features/inspection/components/photo-doc/DefectAttribute.vue";

export type AttributeOption = {
  id: number
  name: string
}

const emit = defineEmits<{
  select: [id: number]
}>()

defineProps<{
  options: AttributeOption[],
  title: string,
  type: DefectAttributeType
}>()
</script>
<style scoped>
.root-card {
  overflow-y: auto;
  width: 400px;
}
</style>

