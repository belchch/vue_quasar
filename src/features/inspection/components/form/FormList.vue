<template>
    <div style="margin-bottom: 20px;">
      <div class="text-subtitle1 q-mb-xs">{{ title ? title : label }}</div>
        <q-select v-if="required"
            :disable="props.disablePermission"
              :multiple="props.multiple"
            v-bind="$attrs"
              v-model="model"
              use-input
              dense
              outlined
              lazy-rules
              @update:model-value="changeHandler"
              :option-value="optionValue ? optionValue : 'id'"
              :option-label="optionLabel ? optionLabel : 'name'"
              :label="label"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
          />
        <q-select v-else
              :multiple="props.multiple"
              @update:model-value="changeHandler"
              :disable="props.disablePermission"
              v-bind="$attrs"
              v-model="model"
              use-input
              dense
              outlined
              clearable
              :option-value="optionValue ? optionValue : 'id'"
              :option-label="optionLabel ? optionLabel : 'name'"
              :label="label"
          />
    </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
const model = defineModel()
const props = defineProps<{
  label: string
  title?: string
  required?: boolean
  optionValue?: string
  optionLabel?: string,
  disablePermission?: boolean
  multiple?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: any): void
}>();

const changeHandler = (value:any) => {
  emit('change',value);
}

</script>
