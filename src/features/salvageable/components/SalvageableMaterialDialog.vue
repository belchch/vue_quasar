<template>
  <q-dialog v-model="open" @before-show="onShowDialog">
    <q-card style="width: 100%; max-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">Редактирование</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup @click="onReset" />
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Количество</div>
          <q-input
            dense
            outlined
            v-model="objectForm.count"
            :rules="[numberOrEmptyRule]"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-mb-sm text-subtitle1">Физический износ</div>
          <q-input
            dense
            outlined
            v-model="objectForm.physicalWear"
            :rules="[numberOrEmptyRule]"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-mb-sm text-subtitle1">Функциональный износ</div>
          <q-input
            dense
            outlined
            v-model="objectForm.functionalWear"
            :rules="[numberOrEmptyRule]"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-mb-sm text-subtitle1">Внешний износ</div>
          <q-input
            dense
            outlined
            v-model="objectForm.externalWear"
            :rules="[numberOrEmptyRule]"
            emit-value
            map-options
          />
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
import { ref, onMounted } from 'vue'
import { SalvageableMaterialType } from 'src/features/salvageable/types'
import { useSalvageableService } from 'src/features/salvageable/service'
import { useConsumerPriceIndexStore } from 'src/features/lookup/consumer-price-index/store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const cpiStore = useConsumerPriceIndexStore()
const salvageableService = useSalvageableService()

type PartialItem = Partial<SalvageableMaterialType>

const open = defineModel<boolean>({ default: false })

onMounted(async () => {
  await cpiStore.fetchItems()
})
const numberOrEmptyRule = (val: any) => {
  if (val === '' || val === null || val === undefined) return 'Обязательное поле'
  return !isNaN(Number(val)) || 'Введите число'
}
const { item = null } = defineProps<{
  item: SalvageableMaterialType | null
}>()

const processing = ref(false)
const defaultObj: PartialItem = {
  count: 1,
}

const objectForm = ref<PartialItem>({ ...defaultObj })

if (item) {
  objectForm.value = { ...item }
}

const onShowDialog = () => {
  if (item) {
    objectForm.value = { ...item }
  }
}

const onReset = () => {
  objectForm.value = { ...defaultObj }
}
const onSubmit = async () => {
  const requestItem = { ...objectForm.value }
  processing.value = true
  try {
    if (item) {
      await salvageableService.updateSalvageableMaterialRaw(item.id, {
        isUse: item.isUse,
        count: objectForm.value.count!!,
        physicalWear: objectForm.value.physicalWear!!,
        functionalWear: objectForm.value.functionalWear!!,
        externalWear: objectForm.value.externalWear!!,
      })
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
</script>

<style scoped></style>
