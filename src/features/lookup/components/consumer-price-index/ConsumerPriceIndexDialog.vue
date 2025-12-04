<template>
  <q-dialog v-model="open" @before-show="onShowDialog">
    <q-card style="width: 100%; max-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ titleDialog }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup @click="onReset" />
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Год</div>
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model.number="objectForm.year"
            :rules="[yearRule]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-mb-sm text-subtitle1">Месяц</div>
          <q-select
            dense
            outlined
            v-model="objectForm.month"
            :options="monthOptions"
            option-value="value"
            option-label="label"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-mb-sm text-subtitle1">Значение</div>
          <q-input
            outlined
            dense
            v-model.number="objectForm.value"
            label="Коэффициент"
            :rules="[numberOrEmptyRule]"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup type="reset" />
          <q-btn flat :loading="processing" :label="btnText" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ConsumerPriceIndexItem,
  ConsumerPriceIndexItemRequest,
} from '../../consumer-price-index/types'
import { useConsumerPriceIndexStore } from '../../consumer-price-index/store'

const cpiStore = useConsumerPriceIndexStore()

type PartialItem = Partial<ConsumerPriceIndexItem>

const open = defineModel<boolean>({ default: false })

const { item = null } = defineProps<{
  item: ConsumerPriceIndexItem | null
}>()

const titleDialog = ref('')
const btnText = ref('')
const processing = ref(false)
const defaultObj: PartialItem = {
  month: 1,
}

const objectForm = ref<PartialItem>({ ...defaultObj })

if (item) {
  objectForm.value = { ...item }
}

const onShowDialog = () => {
  if (item) {
    titleDialog.value = 'Редактирование'
    btnText.value = 'Сохранить'
    objectForm.value = { ...item }
  } else {
    titleDialog.value = 'Новая запись'
    btnText.value = 'Добавить'
  }
}
const toNumberOrNull = (val: any) => {
  if (val === '' || val === null || val === undefined) {
    return null
  } else {
    return Number(val.toString().replace(',', '.'))
  }
}
const yearRule = (val: string) => {
  const currentYear = new Date().getFullYear()
  if (val === '' || val === null || val === undefined) {
    return 'Введите год'
  } else {
    if (isNaN(Number(val))) {
      return 'Год должен быть числом'
    }
    if (Number(val) < 1991 || Number(val) > currentYear) {
      return `Год должен быть в пределах от 1991 до ${currentYear} включительно`
    }
    return true
  }
}
const numberOrEmptyRule = (val: any) => {
  const num = toNumberOrNull(val)
  if (num === null || isNaN(num)) return 'Введите число'
  return true
}
const onReset = () => {
  objectForm.value = { ...defaultObj }
}
const onSubmit = async () => {
  const requestItem = { ...objectForm.value }
  requestItem.value = toNumberOrNull(requestItem.value) ?? 0
  processing.value = true
  try {
    if (item) {
      await cpiStore.updateItem(item.id, requestItem as ConsumerPriceIndexItemRequest)
    }
    await cpiStore.addItem(objectForm.value as ConsumerPriceIndexItemRequest)
  } finally {
    processing.value = false
    open.value = false
  }
}

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
