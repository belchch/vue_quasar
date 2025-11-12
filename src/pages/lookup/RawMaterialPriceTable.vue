<template>
  <div>
    <q-table
      :rows="sources"
      :columns="columns"
      separator="cell"
      hide-pagination
      flat
      bordered
      hide-header
      dense
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-row>
        <q-tr>
          <q-td>
            <q-input v-model="url" input-class="text-right" dense borderless />
          </q-td>
          <q-td>
            <q-input
              v-model.number="price"
              input-class="text-right"
              type="number"
              dense
              borderless
            />
          </q-td>
          <q-td style="text-align: center" auto-width>
            <q-btn @click="submitAdd" color="accent" dense size="sm" flat icon="add">
              <q-tooltip anchor="top middle" self="bottom middle"> Добавить </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:body-cell-url="props">
        <q-td :props="props">
          <q-input
            @keydown.enter.prevent="$event.target.blur()"
            @blur="submit(props.row, 'url')"
            @focus="backupFieldValue(props.row, 'url')"
            v-model="props.row.url"
            input-class="text-right"
            dense
            borderless
          />
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props" style="width: 100px">
          <q-input
            @blur="submit(props.row, 'price')"
            @keydown.enter.prevent="$event.target.blur()"
            @focus="backupFieldValue(props.row, 'price')"
            v-model.number="props.row.price"
            input-class="text-right"
            type="number"
            dense
            borderless
          />
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props" auto-width>
          <q-btn
            class="action-btn"
            size="sm"
            flat
            round
            color="negative"
            icon="delete"
            @click.stop="confirmDelete(props.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle"> Удалить </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { useRawMaterialStore } from 'src/features/lookup/raw-material/raw-material-store'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { update } from 'lodash'
const $q = useQuasar()
const rateStore = useRateStore()
const { sources = [], material } = defineProps<{
  sources: any[]
  material: any
}>()
type Sources = { id: number; url: string; price: number }
type FieldName = 'url' | 'price'
type FieldBackup = {
  url?: string
  price?: number
}
const url = ref('')
const price = ref(0)
const materialStore = useRawMaterialStore()

const fieldsOriginal = ref<Record<number, FieldBackup>>({})

const backupFieldValue = (row: Sources, fieldName: FieldName) => {
  const backup = fieldsOriginal.value[row.id] || {}
  if (fieldName === 'url') {
    backup.url = row.url
  } else if (fieldName === 'price') {
    backup.price = row.price
  }
  fieldsOriginal.value[row.id] = backup
}
const toRequest = (updatedMaterial: any) => {
  updatedMaterial.rates = updatedMaterial.rates.map((rate: any) => rate.id)
  return updatedMaterial
}
const restoreFieldValue = (row: Sources, fieldName: FieldName) => {
  const backup = fieldsOriginal.value[row.id]
  if (!backup) return

  if (fieldName === 'url' && backup.url !== undefined) {
    row.url = backup.url
  } else if (fieldName === 'price' && backup.price !== undefined) {
    row.price = backup.price
  }
}

const submit = async (row: Sources, fieldName: FieldName) => {
  try {
    let updatedMaterial = { ...material }
    updatedMaterial = toRequest(updatedMaterial)

    await materialStore.update(material.id, updatedMaterial)
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Не удалось сохранить' })
    restoreFieldValue(row, fieldName)
  }
}
const submitAdd = async () => {
  let updatedMaterial = { ...material }
  updatedMaterial.sources.push({
    url: url.value,
    price: price.value,
  })
  updatedMaterial = toRequest(updatedMaterial)
  try {
    await materialStore.update(updatedMaterial.id, updatedMaterial)
    url.value = ''
    price.value = 0
    $q.notify({ type: 'positive', message: 'Запись добавлена' })
  } catch {
    $q.notify({ type: 'negative', message: 'Ошибка при добавлении' })
  }
}
const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: 'Вы действительно хотите удалить эту запись?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    let updatedMaterial = { ...material }
    updatedMaterial = toRequest(updatedMaterial)
    updatedMaterial.sources = material.sources.filter((item: any) => item.id !== row.id)
    await materialStore.update(updatedMaterial.id, updatedMaterial)
    $q.notify({ type: 'positive', message: 'Запись удалена' })
  })
}
const columns = [
  {
    name: 'url',
    label: 'url',
    field: 'url',
  },
  {
    name: 'price',
    label: 'price',
    field: 'price',
  },
  {
    name: 'action',
    label: 'action',
    field: 'action',
  },
]
</script>

<style scoped></style>
