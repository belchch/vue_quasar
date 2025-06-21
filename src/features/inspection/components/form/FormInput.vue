<template>
  <div>
      <div class="text-subtitle1 q-mb-xs">{{ title ? title : label }}</div>
      <q-input v-if="required"
          v-bind="$attrs"
          dense
          outlined
          :label="label"
          v-model="model"
          lazy-rules
          :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
      />
      <q-input v-else
          v-bind="$attrs"
          dense
          outlined
          :label="label"
          v-model="model"
      />
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
const model = defineModel<string>()

defineProps<{
  label: string
  title?: string
  required?: boolean
}>()

</script>
