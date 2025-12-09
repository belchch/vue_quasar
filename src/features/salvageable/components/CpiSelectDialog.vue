<template>
  <q-dialog v-model="open" @before-show="onShowDialog">
    <q-card style="width: 100%; max-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">Индекс потребительской цены</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup @click="onReset" />
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Год</div>
          <q-select
            dense
            outlined
            v-model="yearValue"
            :options="yearsOptions"
            @update:model-value="handleYearChange"
            option-value="value"
            option-label="label"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-mb-sm text-subtitle1">Месяц</div>
          <q-select
            dense
            outlined
            @update:model-value="handleMonthChange"
            v-model="monthValue"
            :options="monthOptions"
            option-value="value"
            option-label="label"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-mb-sm text-subtitle1">
            Значение: {{ selectedCpi?.value || 'Отсутствует' }}
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup type="reset" />
          <q-btn flat :loading="processing" label="Применить" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ConsumerPriceIndexItem } from 'src/features/lookup/consumer-price-index/types'
import { useConsumerPriceIndexStore } from 'src/features/lookup/consumer-price-index/store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const cpiStore = useConsumerPriceIndexStore()

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{
  selectCpi: [cpi: ConsumerPriceIndexItem]
}>()

onMounted(async () => {
  await cpiStore.fetchItems()
})

const { item = null } = defineProps<{
  item: ConsumerPriceIndexItem | null
}>()

const processing = ref(false)

const selectedCpi = ref<ConsumerPriceIndexItem | null>(null)
const showIndex = () => {
  if (yearValue.value === undefined || yearValue.value < 0) return
  const year = cpiStore.tableRows[yearValue.value]
  if (year) {
    Object.values(year).forEach((item) => {
      if (item.month === monthValue.value) {
        selectedCpi.value = item
      }
    })
  }
}
const monthValue = ref(1)
const yearValue = ref(0)
const getYearIndex = (year: number) => {
  if (year) {
    const yearIndex = cpiStore.tableRows.findIndex((item) => item.year === year)
    return yearIndex
  }
  return -1
}

const handleYearChange = (newYear: number) => {
  yearValue.value = newYear
  showIndex()
}

const handleMonthChange = (newMonth: number) => {
  monthValue.value = newMonth
  showIndex()
}
const onShowDialog = () => {
  if (item) {
    console.log(item)
    yearValue.value = getYearIndex(item.year)
    monthValue.value = item.month
    selectedCpi.value = { ...item }
  } else {
    if (yearsOptions.value[0]) {
      yearValue.value = yearsOptions.value[0].value
      monthValue.value = 1
    }
  }
  showIndex()
}

const onReset = () => {}
const onSubmit = () => {
  if (selectedCpi.value) {
    emit('selectCpi', selectedCpi.value)
    open.value = false
  } else {
    $q.notify({
      type: 'negative',
      message: 'Не выбран индекс потребительской цены',
    })
  }
}

const yearsOptions = computed(() => {
  const result = []
  for (let i = 0; i < cpiStore.tableRows.length; i++) {
    result.push({
      value: i,
      label: cpiStore?.tableRows[i]?.year,
    })
  }
  return result
})

const months =
  'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь'.split(',')
const monthOptions = months.map((month, index) => ({
  value: index + 1,
  label: month,
}))
</script>

<style scoped></style>
