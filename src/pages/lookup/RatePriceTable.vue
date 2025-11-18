<template>
  <div>
    <q-dialog v-model="dialogMultiAdd">
      <q-card style="width: 100%; max-width: 600px">
        <q-card-section class="row items-center">
          <div class="text-h6">Вставка из Excel</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-checkbox v-model="replacedWorks" label="Заменить текущие работы" />
          <div class="text-subtitle1 q-mb-sm">
            Вставьте данные из Excel (две колонки: URL и цена)
          </div>
          <q-input
            outlined
            dense
            v-model="pasteData"
            type="textarea"
            @paste="handlePaste"
            autogrow
          />
          <!-- Список вставленных строк -->
          <div v-if="parsedData.length > 0" class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Будут добавлены:</div>
            <q-list bordered separator class="rounded-borders">
              <q-item v-for="(item, index) in parsedData" :key="index" class="q-pa-sm">
                <q-item-section>
                  <div class="row items-center">
                    <div class="col-8 text-caption break-text">URL: {{ item.url }}</div>
                    <div class="col-3 text-caption">Цена: {{ item.price }}</div>
                    <div class="col-1">
                      <q-btn
                        icon="clear"
                        size="xs"
                        flat
                        dense
                        @click="removeParsedItem(index)"
                        color="negative"
                      />
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn
            flat
            label="Применить"
            color="primary"
            v-close-popup
            @click="applyMultiAdd"
            :disabled="parsedData.length === 0"
            :loading="loadingDialogBtn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
            <q-btn
              @click="openMultiAddDialog"
              color="accent"
              dense
              size="sm"
              flat
              icon="library_add"
              class="q-ml-sm"
            >
              <q-tooltip anchor="top middle" self="bottom middle"> Вставка из Excel </q-tooltip>
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
const dialogMultiAdd = ref(false)
const pasteData = ref('')
const parsedData = ref<Array<{ url: string; price: number }>>([])
const replacedWorks = ref(true)
const loadingDialogBtn = ref(false)

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
    await rateStore.updateRatePrice(newRate)
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
    await rateStore.updateRatePrice(newRate)
    $q.notify({ type: 'positive', message: 'Запись удалена' })
  })
}

const openMultiAddDialog = () => {
  clearParsedData()
  loadingDialogBtn.value = false
  dialogMultiAdd.value = true
}
const parseExcelData = (clipboardData: string): Array<{ url: string; price: number }> => {
  const result: Array<{ url: string; price: number }> = []
  const rows = clipboardData.split(/\r\n|\n|\r/)

  for (const row of rows) {
    if (!row.trim()) continue
    const columns = row.split(/\t| {2,}/)

    if (columns.length >= 2) {
      const url = columns[0]?.trim()
      const priceStr = columns[1]?.trim().replace(/,/g, '.') || ''
      const price = parseFloat(priceStr)
      if (url && !isNaN(price)) {
        result.push({ url, price })
      }
    }
  }

  return result
}
const handlePaste = (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData?.getData('text')
  if (clipboardData) {
    parsedData.value = parseExcelData(clipboardData)

    if (parsedData.value.length === 0) {
      $q.notify({
        type: 'warning',
        message: 'Не удалось распознать данные. Убедитесь, что вставляете две колонки: URL и цена.',
        timeout: 3000,
      })
    }
  }
}

const removeParsedItem = (index: number) => {
  parsedData.value.splice(index, 1)
}

const clearParsedData = () => {
  parsedData.value = []
  pasteData.value = ''
}

const applyMultiAdd = async () => {
  if (parsedData.value.length === 0) return

  try {
    loadingDialogBtn.value = true
    const newRate = { ...rate }

    if (replacedWorks.value) newRate.sources = []
    for (const item of parsedData.value) {
      newRate.sources.push({
        url: item.url,
        price: item.price,
      })
    }

    await rateStore.updateRatePrice(newRate)

    $q.notify({
      type: 'positive',
      message: `Добавлено ${parsedData.value.length} записи`,
    })

    dialogMultiAdd.value = false
    clearParsedData()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при массовом добавлении',
    })
  } finally {
    loadingDialogBtn.value = false
  }
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

<style scoped>
.break-text {
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
}
</style>
