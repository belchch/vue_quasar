<template>
  <q-card-section v-if="localCase">
    <q-form @submit="handleSave">
      <div class="row q-col-gutter-lg justify-between">
        <div class="col-xs-12 col-sm-6">
          <FormInput
            v-model="localCase.number"
            label="Номер"
            title="Дело (договор)"
            :required="true"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <FormList label="Вид экспертизы" v-model="expertiseType" :options="expertiseTypOptions" />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-auto">
        <div class="col-sm col-xs-12">
          <FormDate v-model="localCase.inspectionStartAt" title="Дата осмотра" />
        </div>
        <div class="col-sm col-xs-12">
          <FormDate v-model="localCase.secondInspectionDate" title="Дата повторного осмотра" />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-auto">
        <div class="col-sm col-xs-12">
          <FormDate
            v-model="localCase.courtDate"
            title="Дата выхода в суд"
            :disabled-permission="!hasPermission(['case.update.deadline'])"
          />
        </div>
        <div class="col-sm col-xs-12">
          <FormDate
            v-model="localCase.secondCourtDate"
            title="Дата повторного выхода в суд"
            :disabled-permission="!hasPermission(['case.update.deadline'])"
          />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-auto">
        <div class="col-sm-6 col-xs-12">
          <FormDate
            v-model="localCase.deadline"
            title="Дата сдачи"
            :disabled-permission="!hasPermission(['case.update.deadline'])"
          />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-md">
        <div class="col-xs-12 col-sm-6">
          <q-btn label="Сохранить" type="submit" color="primary" />
          <q-btn label="Отмена" @click="resetForm" color="primary" flat class="q-ml-sm" />
        </div>
      </div>
    </q-form>
  </q-card-section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from 'src/features/user/stores/user-store'
import FormInput from './FormInput.vue'
import FormList from './FormList.vue'
import { Case } from 'src/features/case/stores/types'
import FormDate from './FormDate.vue'

const { hasPermission } = useUserStore()

const localCase = ref<Case>()
const model = defineModel<Case>()

const toDateTime = (date: string | undefined) => {
  if (!date) {
    return ''
  }
  try {
    const dateString = new Date(date)
    return (
      dateString.toLocaleDateString('ru-RU') +
      ' ' +
      dateString.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    )
  } catch (error) {
    return ''
  }
}

const startDate = computed(() => {
  return toDateTime(localCase.value?.inspectionStartAt)
})

const endDateInspection = computed(() => {
  return toDateTime(localCase.value?.inspectionEndAt)
})

const secondInspectionDate = computed(() => {
  return toDateTime(localCase.value?.secondInspectionDate)
})

defineProps({
  statusOptions: Array,
})
const expertiseTypOptions = [
  {
    id: 'SHARED_EQUITY',
    name: 'ДДУ',
  },
  {
    id: 'FLOOD_DAMAGE',
    name: 'Залив',
  },
  {
    id: 'CONSTRUCTION',
    name: 'Строительно-техническая',
  },
]

const expertiseType = ref<{ id: string; name: string }>(
  expertiseTypOptions.find((item) => item.id == model.value?.expertiseType)!,
)

const emit = defineEmits(['update:modelValue', 'save', 'reset'])

const handleSave = () => {
  emit('save', {
    ...localCase.value,
    expertiseType: expertiseType.value.id,
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
