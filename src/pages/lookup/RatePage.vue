<template>
  <div class="text-center q-mt-md" v-if="rateStore.loading">
    <q-spinner color="primary" size="3em" :thickness="2" />
    <div class="q-mt-md">Загрузка...</div>
  </div>
  <div v-else class="q-pa-md">
    <RateDialogForm v-model="openDialog" :rate="editedRate" />
    <q-tabs v-model="tab" no-caps active-color="primary" align="left">
      <q-tab name="works" label="Работы" />
      <q-tab name="prices" label="Цены" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="works">
        <q-table
          ref="tableRate"
          v-model:pagination="pagination"
          :filter="filter"
          separator="cell"
          hide-pagination
          flat
          bordered
          :rows="rateStore.rates"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top>
            <div class="table-header row items-center full-width">
              <div class="q-table__title">Работы</div>
              <q-btn
                class="q-ma-md"
                size="sm"
                icon="add"
                label="Добавить"
                color="primary"
                @click="openNewRateDialog"
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
            <q-td :props="props" @click="openEditRateDialog(props.row)" :key="props.col.name">
              {{ props.value }}
              <q-icon name="edit" class="edit-icon" />
            </q-td>
          </template>
          <template v-slot:body-cell-sources="props">
            <q-td :props="props">
              <template v-for="(item, index) in props.value" :key="index">
                <div>{{ item.url }}</div>
              </template>
              <q-icon name="edit" class="edit-icon" />
            </q-td>
          </template>
        </q-table>
        <div v-if="pagesNumber > 1" class="row justify-center q-mt-md">
          <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="md" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="prices">
        <RateTable :rates="rateStore.rates" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum, ParamsType } from 'src/features/lookup/rate/types'
import { useUserStore } from 'src/features/user/stores/user-store'
import { useQuasar } from 'quasar'
import RateDialogForm from 'src/features/lookup/components/RateDialogForm.vue'
import RateTable from './RateTable.vue'
const $q = useQuasar()
const tableRate = ref()
const rateStore = useRateStore()
const { hasPermission } = useUserStore()
const openDialog = ref(false)
const editedRate = ref<Rate | null>(null)
const tab = ref('works')
const filter = ref('')
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
    field: (row: Rate) => UnitOfMeasureEnum[row.unitOfMeasure],
    label: 'Ед.измерения',
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
    name: 'paramsType',
    field: (row: Rate) => {
      if (!row.boqWorkParamsType) return '-'
      return ParamsTypeEnum[row.boqWorkParamsType]
    },
    label: 'Тип',
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
    name: 'averagePrice',
    field: 'averagePrice',
    label: 'Средняя цена',
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
  if (tableRate?.value?.filteredSortedRows)
    return Math.ceil(tableRate.value.filteredSortedRows.length / pagination.value.rowsPerPage)
  return Math.ceil(rateStore.rates.length / pagination.value.rowsPerPage)
})
onMounted(async () => {
  await rateStore.requestLookup()
})
const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить работу?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await rateStore.deleteRate(row.id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}
const openNewRateDialog = () => {
  editedRate.value = null
  openDialog.value = true
}
const openEditRateDialog = (rate: Rate) => {
  editedRate.value = rate
  openDialog.value = true
}
</script>
<style scoped>
.edit-icon {
  opacity: 0;
  transition: opacity 0.3s;
  margin: -3px 0 0 10px;
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
