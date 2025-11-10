<template>
  <div>
    <q-dialog v-model="linkWorksDialog" persistent>
      <q-card style="width: 100%; max-width: 800px">
        <q-card-section class="row items-center">
          <div class="text-h6">Работы</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-table
            dense
            :rows="rateStore.rates"
            :filter="filter"
            :columns="columnsAllWorks"
            selection="multiple"
            flat
            wrap-cells
            separator="cell"
            bordered
            v-model:selected="selectedRates"
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:top-right>
              <q-input outlined dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:header-selection="scope">
              <q-toggle v-model="scope.selected" size="xs" color="secondary" />
            </template>
            <template v-slot:body-selection="scope">
              <q-toggle v-model="scope.selected" size="xs" color="secondary" />
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn flat label="Сохранить" color="primary" v-close-popup @click="addNewRate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table
      :rows="rates"
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
          <q-td colspan="3" style="text-align: center" auto-width>
            <q-btn @click="showRates" color="accent" dense size="sm" flat icon="add">
              <q-tooltip anchor="top middle" self="bottom middle"> Добавить </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
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
import _ from 'lodash'
import { ref } from 'vue'
const linkWorksDialog = ref(false)
const selectedRates = ref<Rate[]>([])
const filter = ref('')
const $q = useQuasar()
const rateStore = useRateStore()
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum } from 'src/features/lookup/rate/types'
const { rates = [], material } = defineProps<{
  rates: any[]
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

const addNewRate = async () => {
  const updatedMaterial = { ...material }
  updatedMaterial.rates = selectedRates.value
  updatedMaterial.rates = updatedMaterial.rates.map((item: any) => item.id)
  await materialStore.update(updatedMaterial.id, updatedMaterial)
}

const showRates = () => {
  linkWorksDialog.value = true
  selectedRates.value = material.rates
}

const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: 'Вы действительно хотите удалить эту запись?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    const newMaterial = { ...material }
    newMaterial.rates = newMaterial.rates.filter((item: any) => item.id !== row.id)
    newMaterial.rates = newMaterial.rates.map((item: any) => item.id)
    await materialStore.update(newMaterial.id, newMaterial)
    $q.notify({ type: 'positive', message: 'Запись удалена' })
  })
}
const columns = [
  {
    name: 'name',
    label: 'name',
    field: 'name',
  },
  {
    name: 'boqWorkParamsType',
    label: 'boqWorkParamsType',
    field: (row: Rate) => {
      if (!row.boqWorkParamsType) return '-'
      return ParamsTypeEnum[row.boqWorkParamsType]
    },
  },
  {
    name: 'action',
    label: 'action',
    field: 'action',
  },
]
const columnsAllWorks = [
  {
    name: 'name',
    label: 'Наименование',
    align: 'left' as const,
    field: 'name',
    sortable: true,
  },
  {
    name: 'unitOfMeasure',
    field: (row: Rate) => UnitOfMeasureEnum[row.unitOfMeasure],
    label: 'Ед.изм.',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'boqWorkParamsType',
    label: 'Тип',
    align: 'left' as const,
    field: (row: Rate) => {
      if (!row.boqWorkParamsType) return '-'
      return ParamsTypeEnum[row.boqWorkParamsType]
    },
    sortable: true,
  },
]
</script>

<style scoped></style>
