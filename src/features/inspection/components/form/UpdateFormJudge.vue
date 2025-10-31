<template>
  <q-card-section v-if="localCase">
    <q-form class="q-gutter-sm" @submit="handleSave">
      <div class="row q-col-gutter-lg">
        <div class="col-xs-12 col-sm-4">
          <FormInput v-model="localCase.courtCaseNum" label="Номер дела" title="Дело" />
        </div>
        <div class="col-xs-12 col-sm-4">
          <FormDate v-model="localCase.determinationDate" title="Дата определения" />
        </div>
        <div class="col-xs-12 col-sm-4">
          <FormInput
            v-model="localCase.numberOfVolumes"
            label="Количество томов"
            title="Количество томов"
          />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-auto">
        <div class="col-xs-12 col-sm-6">
          <FormList label="Суд" v-model="selectedCoutr" :options="courtStore.items" />
        </div>
        <div class="col-xs-12 col-sm-6">
          <FormInput v-model="localCase.initiator" label="Инициатор" title="Инициатор" />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-auto">
        <div class="col-xs-12 col-sm-6">
          <FormList
            label="Судья"
            v-model="localCase.judge"
            @change="judgeChange"
            :options="judgeOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <FormInput v-model="localCase.customer" label="Заказчик" title="Заказчик" />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mb-sm q-mt-auto">
        <div class="text-h5 text-weight-light">Контактное лицо</div>
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-xs-12 col-sm-6">
          <FormInput v-model="localCase.contactPerson" label="ФИО" title="ФИО" />
        </div>
        <div class="col-xs-12 col-sm-6">
          <FormInput v-model="localCase.contactPhone" label="Телефон" title="Телефон" />
        </div>
        <div class="col-xs-12 col-sm-6">
          <FormInput v-model="localCase.contactEmail" label="Email" title="Email" />
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
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import { Judge, judgeName } from 'src/features/lookup/judge/stores/types'
import { useUserStore } from 'src/features/user/stores/user-store'
import FormInput from './FormInput.vue'
import FormList from './FormList.vue'
import { Case } from 'src/features/case/stores/types'
import FormDate from './FormDate.vue'
import { userName } from 'src/features/user/api/types'
import { User } from 'src/features/user/stores/types'
import { Court } from 'src/features/lookup/court/stores/types'

const judgeStore = useJudgeStore()
const courtStore = useCourtStore()
const { hasPermission } = useUserStore()

const selectedCoutr = ref<Court>()

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

const judgeOptions = judgeStore.items.map((j) => ({
  label: judgeName(j),
  value: j,
}))

const judgeChange = (v: Judge) => {
  selectedCoutr.value = { ...v.court }
  if (localCase.value) {
    localCase.value.court = { ...v.court }
  }
}

const initLocalForm = () => {
  if (!model.value) return
  localCase.value = { ...model.value }
  if (localCase.value?.judge?.court) {
    selectedCoutr.value = { ...localCase.value.judge.court }
  }
}
onMounted(() => {
  initLocalForm()
})
</script>
