<template>
  <q-card-section v-if="localCase">
    <q-form class="q-gutter-sm" @submit="handleSave">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <FormInput v-model="localCase.facilityAddress" label="Адрес осмотра" title="Адрес осмотра" />
        </div>
        <div class="col-6">
          <FormList label="Тип объекта" v-model="localCase.inspectionObjectType" :options="objectTypeOptions"
            option-label="label" option-value="value" emit-value map-options />
        </div>
      </div>
      <div class="row justify-between items-end q-ml-none q-mt-lg">
        <div>
          <q-btn label="Сохранить" type="submit" color="primary" />
          <q-btn label="Отмена" @click="resetForm" color="primary" flat class="q-ml-sm" />
        </div>
      </div>
    </q-form>
  </q-card-section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from 'src/features/user/stores/user-store';
import FormInput from './FormInput.vue'
import FormList from './FormList.vue'
import { Case, InspectionObjectTypeEnum } from 'src/features/case/stores/types'
import { User } from 'src/features/user/stores/types'

const { hasPermission } = useUserStore()

const localCase = ref<Case>()
const model = defineModel<Case>()

const emit = defineEmits(['update:modelValue', 'save', 'reset'])

const handleSave = () => {
  emit('save', {
    ...localCase.value
  })
}
const resetForm = () => {
  initLocalForm()
  emit('reset')
}

const objectTypeOptions = Object.entries(InspectionObjectTypeEnum).map(
  ([value, label]) => ({
    label,
    value
  })
);

const initLocalForm = () => {
  if (!model.value) return
  localCase.value = { ...model.value }
}
onMounted(() => {
  initLocalForm()
})

</script>
