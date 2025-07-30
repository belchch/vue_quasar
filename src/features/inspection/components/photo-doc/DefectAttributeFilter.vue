<template>
  <q-card flat bordered class="q-pa-md root-card">
    <div class="text-subtitle2">{{title}}</div>
    <div class="q-pa-xs">
      <DefectAttribute
        v-for="option in options"
        :key="option.id"
        :removable="options.length === 1"
        @remove="emit('unselect')"
        :type="type"
        :name="option.name"
        @click="clickItem(option.id)"
      />
    </div>
  </q-card>
</template>
<script setup lang="ts">
import {ref} from "vue";
import DefectAttribute, {DefectAttributeType} from "src/features/inspection/components/photo-doc/DefectAttribute.vue";

export type AttributeOption = {
  id: number
  name: string
}
const emit = defineEmits<{
  select: [id: number],
  unselect: []
}>()

const clickItem = (id: number) => {
  emit('select',id)
}

defineProps<{
  options: AttributeOption[],
  title: string,
  type: DefectAttributeType
}>()
</script>
<style scoped>
.root-card {
  overflow-y: auto;
  /* width: 400px; */
  flex:1;
}
</style>

