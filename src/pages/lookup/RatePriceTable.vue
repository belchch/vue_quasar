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
import { useQuasar } from 'quasar'
import { ref } from 'vue'
const $q = useQuasar()
const rateStore = useRateStore()
const { sources = [], rate } = defineProps<{
  sources: any[]
  rate: any
}>()
type Sources = { id: number; url: string; price: number }
type FieldName = 'url' | 'price'
type FieldBackup = {
  url?: string
  price?: number
}
const url = ref('')
const price = ref(0)

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
    const updatedRate = { ...rate }
    await rateStore.updateRatePrice(updatedRate)
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Не удалось сохранить' })
    restoreFieldValue(row, fieldName)
  }
}
const submitAdd = async () => {
  const newRate = { ...rate }
  newRate.sources.push({
    url: url.value,
    price: price.value,
  })
  try {
    await rateStore.updateRate(newRate)
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
    const newRate = { ...rate }
    newRate.sources = newRate.sources.filter((item: any) => item.id !== row.id)
    await rateStore.updateRate(newRate)
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
