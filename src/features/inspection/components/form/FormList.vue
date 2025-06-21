<template>
    <div>
      <div class="text-subtitle1 q-mb-xs">{{ title ? title : label }}</div>
        <q-select v-if="required"
            v-bind="$attrs"
              v-model="model"
              use-input
              dense
              outlined
              lazy-rules
              option-value="id"
              option-label="name"
              :label="label"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
          />
        <q-select v-else
              v-bind="$attrs"
              v-model="model"
              use-input
              dense
              outlined
              option-value="id"
              option-label="name"
              :label="label"
          />
    </div> 
</template>
<script setup lang="ts">
import _ from 'lodash'
const model = defineModel()
defineProps<{
  label: string
  title?: string
  required?: boolean
}>()

</script>
