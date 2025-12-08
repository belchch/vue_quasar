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
            v-model="objectForm.year"
            :options="yearsOptions"
            @update:model-value="showIndex"
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
            @update:model-value="showIndex"
            v-model="objectForm.month"
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
import {
  ConsumerPriceIndexItem,
  ConsumerPriceIndexItemRequest,
} from 'src/features/lookup/consumer-price-index/types'
import { useSalvageableService } from 'src/features/salvageable/service'
import { useConsumerPriceIndexStore } from 'src/features/lookup/consumer-price-index/store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const cpiStore = useConsumerPriceIndexStore()
const salvageableService = useSalvageableService()

type PartialItem = Partial<ConsumerPriceIndexItem>

const open = defineModel<boolean>({ default: false })

onMounted(async () => {
  await cpiStore.fetchItems()
})

const { item = null } = defineProps<{
  item: ConsumerPriceIndexItem | null
}>()

const titleDialog = ref('')
const processing = ref(false)
const defaultObj: PartialItem = {
  month: 1,
}
const selectedCpi = ref<ConsumerPriceIndexItem | null>(null)
const showIndex = () => {
  if (!objectForm.value.year) return
  const year = cpiStore.tableRows[objectForm.value.year]
  if (year) {
    Object.values(year).forEach((item) => {
      if (item.month === objectForm.value.month) {
        selectedCpi.value = item
      }
    })
  }
}

const objectForm = ref<PartialItem>({ ...defaultObj })

if (item) {
  objectForm.value = { ...item }
}

const onShowDialog = () => {
  if (item) {
    objectForm.value = { ...item }
    selectedCpi.value = { ...item }
  }
  showIndex()
}

const onReset = () => {
  objectForm.value = { ...defaultObj }
}
const onSubmit = async () => {
  const requestItem = { ...objectForm.value }
  processing.value = true
  try {
    if (selectedCpi.value) {
      await salvageableService.setConsumerPriceIndex(selectedCpi.value)
      $q.notify({ type: 'positive', message: 'Изменения сохранены' })
    } else {
      $q.notify({
        type: 'negative',
        message: 'Не выбран индекс потребительской цены',
      })
    }
  } finally {
    processing.value = false
    onReset()
    open.value = false
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

// defineExpose({
//   open,
// })
</script>

<style scoped></style>
