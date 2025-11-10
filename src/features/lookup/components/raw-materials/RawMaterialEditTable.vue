<template>
  <div>
    <q-table
      ref="table"
      v-model:pagination="pagination"
      :filter="filter"
      separator="cell"
      hide-pagination
      flat
      bordered
      :rows="rawMaterialStore.rawMaterials"
      :columns="columns"
      row-key="id"
      wrap-cells
    >
      <template #body-cell-sources="props">
        <q-td>
          <raw-material-price-table :sources="props.row.sources" :material="props.row" />
        </q-td>
      </template>
      <template #body-cell-rates="props">
        <q-td>
          <raw-material-rate-table :rates="props.row.rates" :material="props.row" />
        </q-td>
      </template>
    </q-table>
    <div v-if="pagesNumber > 1" class="row justify-center q-mt-md">
      <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="md" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRawMaterialStore } from 'src/features/lookup/raw-material/raw-material-store'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { ref, computed } from 'vue'
import { UnitOfMeasureEnum, UnitOfMeasureType } from 'src/features/lookup/rate/types'
import { RawMaterial } from '../../raw-material/types'
import RawMaterialPriceTable from 'src/pages/lookup/RawMaterialPriceTable.vue'
import RawMaterialRateTable from 'src/pages/lookup/RawMaterialRateTable.vue'
const rateStore = useRateStore()
const rawMaterialStore = useRawMaterialStore()
const filter = ref('')
const table = ref()
const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Название',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'unitOfMeasure',
    field: (row: RawMaterial) => UnitOfMeasureEnum[row.unitOfMeasure],
    label: 'Ед.изм.',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'sources',
    field: 'sources',
    label: 'Ссылка',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'rates',
    field: 'rates',
    label: 'Работы',
    align: 'left' as const,
    sortable: true,
  },
]
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 15,
})
const pagesNumber = computed(() => {
  if (table?.value?.filteredSortedRows)
    return Math.ceil(table.value.filteredSortedRows.length / pagination.value.rowsPerPage)
  return Math.ceil(rawMaterialStore.rawMaterials.length / pagination.value.rowsPerPage)
})
</script>

<style scoped></style>
