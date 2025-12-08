<template>
  <div>
    <RateDialogForm v-model="openDialog" :rate="editedRate" />
    <q-table ref="tableRate" v-model:pagination="pagination" :filter="filter" separator="cell" hide-pagination flat
      bordered :rows="actualRates" :columns="columns" row-key="id" :loading="rateStore.loading">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <div class="table-header row items-center full-width">
          <div class="q-table__title">Работы</div>
          <q-btn class="q-ma-md" size="sm" icon="add" label="Добавить" color="primary" @click="openNewRateDialog" />
          <q-checkbox @update:model-value="handleArchiveToggle" size="sm" v-model="showArchived" val="sm"
            label="Архивные записи" />
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
          <q-btn class="action-btn" size="sm" flat round color="negative" icon="control_point_duplicate"
            @click.stop="confirmDuplicate(props.row)">
            <q-tooltip anchor="top middle" self="bottom middle"> Дублировать </q-tooltip>
          </q-btn>

          <q-btn class="action-btn" size="sm" flat round color="negative" icon="delete"
            @click.stop="confirmDelete(props.row)">
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
    <RateArchivedTable v-if="showArchived" class="q-mt-md" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum } from 'src/features/lookup/rate/types'
import { useUserStore } from 'src/features/user/stores/user-store'
import { useQuasar } from 'quasar'
import RateDialogForm from 'src/features/lookup/components/RateDialogForm.vue'
import RateArchivedTable from './RateArchivedTable.vue'
const $q = useQuasar()
const tableRate = ref()
const rateStore = useRateStore()
const { hasPermission } = useUserStore()
const openDialog = ref(false)
const editedRate = ref<Rate | null>(null)
const filter = ref('')
const showArchived = ref(false)
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
const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить работу?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await rateStore.deleteRate(row.id)
      if (showArchived.value) {
        await rateStore.requestLookup(true)
      }
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}

const confirmDuplicate = (row: any) => {
  $q.dialog({
    title: 'Дублирование работы',
    message: 'Название работы',
    prompt: {
      model: row.name,
      type: 'text' 
    },
    cancel: true,
    persistent: true
  }).onOk(async (data: string) => {
     await rateStore.duplicateRate(row.id, data)
     await rateStore.requestLookup(true)
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
const handleArchiveToggle = async (val: boolean) => {
  await rateStore.requestLookup(val)
}

const actualRates = computed(() => {
  return rateStore.rates.filter((rate) => !rate.isArchived)
})
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
