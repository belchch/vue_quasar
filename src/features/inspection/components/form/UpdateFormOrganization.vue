<template>
  <q-card-section v-if="localCase">
    <q-form class="q-gutter-sm" @submit="handleSave">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <FormList label="Организация" v-model="localCase.company" :options="companyStore.items" />
        </div>
        <div class="col-6">
          <FormList label="Регион" v-model="localCase.region" :options="regionStore.items" />
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
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import { useUserStore } from 'src/features/user/stores/user-store';
import FormInput from './FormInput.vue'
import FormList from './FormList.vue'
import { Case } from 'src/features/case/stores/types'

const companyStore = useCompanyStore()
const regionStore = useRegionStore()
const { hasPermission } = useUserStore()

const localCase = ref<Case>()
const model = defineModel<Case>()

const emit = defineEmits(['update:modelValue', 'save', 'reset'])

const handleSave = () => {
    emit('save', {
        ...localCase.value,
    })
}
const resetForm = () => {
    initLocalForm()
    emit('reset')
}

const initLocalForm = () => {
    if (!model.value) return
    localCase.value = { ...model.value }
}
onMounted(() => {
    initLocalForm()
})

</script>
