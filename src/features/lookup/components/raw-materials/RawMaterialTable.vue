<template>
  <div>
    <RawMaterialDialog :raw-material="editedItem" v-model="openDialog" />
    <q-table
      ref="table"
      v-model:pagination="pagination"
      :filter="filter"
      separator="cell"
      hide-pagination
      flat
      bordered
      :rows="storeRawMaterial.rawMaterials"
      :columns="columns"
      row-key="id"
      wrap-cells
    >
      <template v-slot:top>
        <div class="table-header row items-center full-width">
          <div class="q-table__title">Стройматериалы</div>
          <q-btn
            class="q-ma-md"
            size="sm"
            icon="add"
            label="Добавить"
            color="primary"
            @click="openNewDialog"
          />
          <q-space />
          <q-input outlined dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
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
            color="negative"
            icon="delete"
            @click.stop="confirmDelete(props.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle"> Удалить </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props" @click="openEditDialog(props.row)" :key="props.col.name">
          {{ props.value }}
          <q-icon name="edit" class="edit-icon" />
        </q-td>
      </template>
      <template v-slot:body-cell-sources="props">
        <q-td :props="props" @click="openEditDialog(props.row)">
          <template v-for="(item, index) in props.value" :key="index">
            <div>
              <a :href="item.url" target="_blank">{{ item.url }}</a>
            </div>
          </template>
          <q-icon name="edit" class="edit-icon" />
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props" @click="openEditDialog(props.row)">
          <template v-for="(item, index) in props.row.sources" :key="index">
            <div>{{ item.price }}</div>
          </template>
          <q-icon name="edit" class="edit-icon" />
        </q-td>
      </template>
    </q-table>
    <div v-if="pagesNumber > 1" class="row justify-center q-mt-md">
      <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="md" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { UnitOfMeasureEnum, UnitOfMeasureType } from 'src/features/lookup/rate/types'
import { RawMaterial } from '../../raw-material/types'
import { useRawMaterialStore } from '../../raw-material/raw-material-store'
import RawMaterialDialog from './RawMaterialDialog.vue'
const $q = useQuasar()
const table = ref()
const filter = ref('')
const storeRawMaterial = useRawMaterialStore()
const openDialog = ref(false)
const defaultNewObject: RawMaterial = {
  name: '',
  unitOfMeasure: 'PIECE',
  factor: 0,
  sources: [],
  rates: [],
}
const editedItem = ref<RawMaterial>({ ...defaultNewObject })

const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить запись?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await storeRawMaterial.remove(row.id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}

const openNewDialog = () => {
  editedItem.value = Object.assign({}, defaultNewObject)
  openDialog.value = true
}

const openEditDialog = (row: RawMaterial) => {
  editedItem.value = Object.assign({}, row)
  openDialog.value = true
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
