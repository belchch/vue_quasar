<template>
  <div>
    <q-table
      ref="tableRate"
      v-model:pagination="pagination"
      :filter="filter"
      separator="cell"
      hide-pagination
      flat
      bordered
      :rows="archivedRecords"
      :columns="columns"
      row-key="id"
      title="Архивные записи"
      :loading="rateStore.loading"
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
            <div>{{ item.url }}</div>
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
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum } from 'src/features/lookup/rate/types'
import { useUserStore } from 'src/features/user/stores/user-store'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const tableRate = ref()
const rateStore = useRateStore()
const { hasPermission } = useUserStore()
const filter = ref('')
const archivedRecords = computed(() => {
  return rateStore.rates.filter((rate) => {
    return rate.isArchived
  })
})
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
const confirmRestore = (row: any) => {
  $q.dialog({
    title: 'Подтверждение',
    message: `Восстановить запись?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await rateStore.restoreRate(row.id)
      $q.notify({ type: 'positive', message: 'Запись восстановлена' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при восстановлении записи' })
    }
  })
}
</script>

<style scoped>
.action-btn {
  opacity: 0;
  transition: opacity 0.3s;
}
tr:hover .action-btn {
  opacity: 1;
}
</style>
