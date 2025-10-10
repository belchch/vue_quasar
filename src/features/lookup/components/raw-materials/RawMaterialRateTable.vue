<template>
  <div>
    <div class="text-subtitle1">Работы</div>
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
          <q-btn flat label="Добавить" color="primary" v-close-popup @click="addNewRate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table :rows="rates" :columns="columns" flat wrap-cells separator="cell" bordered>
      <template v-slot:top>
        <div class="row items-center full-width">
          <q-btn
            color="secondary"
            icon="add"
            label="Добавить"
            @click="openLinkRatesDialog"
            size="sm"
          />
          <q-space />
        </div>
      </template>
      <template #body-cell-actions="props">
        <q-td auto-width style="border-left: 0" class="text-right">
          <q-btn
            class="action-btn"
            size="sm"
            flat
            round
            color="negative"
            icon="delete"
            @click.stop="remove(props.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle"> Удалить </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum } from 'src/features/lookup/rate/types'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
const rateStore = useRateStore()
const rates = defineModel<Rate[]>('rates', { required: true })
const linkWorksDialog = ref(false)
const selectedRates = ref<Rate[]>([])
const filter = ref('')
const addNewRate = () => {
  rates.value = [...rates.value, ...selectedRates.value]
}
const remove = (row: Rate) => {
  rates.value = rates.value.filter((item) => item !== row)
}
const openLinkRatesDialog = () => {
  if (rates.value.length > 0) {
    selectedRates.value = rates.value
  }
  linkWorksDialog.value = true
}
const columns = [
  {
    name: 'name',
    label: 'Наименование',
    align: 'left' as const,
    field: 'name',
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
  {
    name: 'actions',
    label: '',
    field: 'actions',
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
