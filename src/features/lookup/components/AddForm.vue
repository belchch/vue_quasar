<template>
  <q-form ref="formRef" @submit.prevent="submit">
    <div class="q-gutter-md row no-wrap align-center add-form-container" style="margin-top: -8px">
      <template v-for="(field, index) in fields" :key="index">
        <q-select
          v-if="field.type === 'select'"
          :id="field.name"
          :model-value="formData[field.name]"
          @update:model-value="(newVal) => (formData[field.name] = newVal)"
          :options="field.options"
          option-value="id"
          option-label="name"
          :label="field.label"
          class="fill-stretch"
          style="min-width: 120px"
          map-options
          dense
          emit-value2
          outlined
        />
        <q-select
          v-else-if="field.type === 'select-multiple'"
          :model-value="formData[field.name]"
          @update:model-value="(newVal) => (formData[field.name] = newVal)"
          :options="field.options"
          option-value="id"
          option-label="name"
          :label="field.label"
          style="min-width: 120px; width: 100%"
          multiple
          map-options
          dense
          outlined
        />
        <q-checkbox
          v-else-if="field.type === 'checkbox'"
          color="secondary"
          :false-value="false"
          :true-value="true"
          :indeterminate="false"
          v-model="formData[field.name]"
          :label="field.label"
          :key="index"
          :id="field.name"
        />
        <q-input
          v-else-if="field.type == 'decimal'"
          :required="field.required"
          :key="field.name"
          v-model="formData[field.name]"
          style="min-width: 120px"
          :label="field.label"
          :autofocus="index === 0"
          dense
          outlined
          mask="#.##"
          fill-mask="0"
        />
        <q-input
          v-else
          :required="field.required"
          :key="field.name"
          v-model="formData[field.name]"
          style="min-width: 120px"
          :label="field.label"
          :autofocus="index === 0"
          :type="field.type"
          dense
          outlined
          reverse-fill-mask
        />
      </template>
      <q-btn
        label="Сохранить"
        size="sm"
        type="submit"
        color="primary"
        :disabled="formData.processing"
        class="self-start h-40"
      />
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Field } from '../base/store/types'
const props = defineProps({
  fields: Array<Field>,
  direction: String,
})

interface FormData {
  [key: string]: string
}
const formData = ref<FormData>({})
const formRef = ref()
const resetForm = () => {
  formData.value = {}
  formRef.value?.resetValidation()
}
defineExpose({
  resetForm,
})

const emit = defineEmits(['submit'])

const submit = () => {
  emit('submit', formData.value)
  // formData.value = {};
}
</script>

<style scoped lang="scss">
.defect .add-form-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  .q-textarea {
    grid-row: span 2;
  }
}
.fill-stretch {
  width: stretch;
}

.h-40 {
  height: 40px;
}
</style>
<style lang="scss">
textarea {
  width: 400px !important;
  height: 60px !important;
  resize: vertical !important;
}

.defect textarea {
  height: 80px !important;
}
</style>
