<template>
  <div>
    <q-table
      ref="table"
      title="Архивные записи"
      v-model:pagination="pagination"
      :filter="filter"
      separator="cell"
      hide-pagination
      flat
      bordered
      :rows="archivedRecords"
      :columns="columns"
      row-key="id"
      wrap-cells
      :loading="storeRawMaterial.loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header-cell-actions>
        <q-th style="width: 82px; border-left: 0"></q-th>
      </template>
      <template #body-cell-actions="props">
        <q-td style="border-left: 0" class="text-right">
          <q-btn
            class="action-btn"
            size="sm"
            flat
            round
            color="primary"
            icon="settings_backup_restore"
            @click.stop="confirmRestore(props.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle"> Восстановить запись </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props" :key="props.col.name">
          {{ props.value }}
        </q-td>
      </template>
      <template v-slot:body-cell-sources="props">
        <q-td :props="props">
          <template v-for="(item, index) in props.value" :key="index">
            <div>
              <a :href="item.url" target="_blank">{{ item.url }}</a>
            </div>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          <template v-for="(item, index) in props.row.sources" :key="index">
            <div>{{ item.price }}</div>
          </template>
        </q-td>
      </template>
    </q-table>
    <div v-if="pagesNumber > 1" class="row justify-center q-mt-md">
      <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="md" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { UnitOfMeasureEnum } from 'src/features/lookup/rate/types'
import { RawMaterial } from '../../raw-material/types'
import { useRawMaterialStore } from '../../raw-material/raw-material-store'
const $q = useQuasar()
const table = ref()
const filter = ref('')
const storeRawMaterial = useRawMaterialStore()

const archivedRecords = computed(() => {
  return storeRawMaterial.rawMaterials.filter((item) => {
    return item.isArchived
  })
})

const confirmRestore = (row: any) => {
  $q.dialog({
    title: 'Подтверждение',
    message: `Восстановить запись?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await storeRawMaterial.restoreItem(row.id)
      await storeRawMaterial.requestLookup(true)
      $q.notify({ type: 'positive', message: 'Запись восстановлена' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при восстановлении записи' })
    }
  })
}

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
    name: 'factor',
    field: 'factor',
    label: 'Коэф.',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'works',
    field: (row: RawMaterial) => row.rates.length,
    label: 'Работ',
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
    name: 'price',
    field: 'price',
    label: 'Стоимость',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'actions',
    field: 'actions',
    label: '',
    align: 'right' as const,
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
  return Math.ceil(storeRawMaterial.rawMaterials.length / pagination.value.rowsPerPage)
})
</script>

<style scoped>
.edit-icon {
  opacity: 0;
  transition: opacity 0.3s;
  margin: -3px 0 0 10px;
  position: absolute;
  top: 4px;
  right: 4px;
}

td:hover {
  cursor: pointer;
}

td:hover .edit-icon {
  opacity: 0.5;
}

.action-btn {
  opacity: 0;
  transition: opacity 0.3s;
}

tr:hover .action-btn {
  opacity: 1;
}
</style>
