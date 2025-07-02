<template>
    <div style="margin-bottom: 20px;">
      <div class="text-subtitle1 q-mb-xs">{{ title ? title : label }}</div>
        <q-select v-if="required"
            :disabled="props.disablePermission"
            v-bind="$attrs"
              v-model="model"
              use-input
              dense
              outlined
              lazy-rules
              :option-value="optionValue ? optionValue : 'id'"
              :option-label="optionLabel ? optionLabel : 'name'"
              :label="label"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
          />
        <q-select v-else
              :disabled="props.disablePermission"
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
}>()

</script>
