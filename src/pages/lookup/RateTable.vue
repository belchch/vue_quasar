<template>
  <div class="text-center q-mt-md" v-if="rateStore.loading">
    <q-spinner color="primary" size="3em" :thickness="2" />
    <div class="q-mt-md">Загрузка...</div>
  </div>
  <div v-else class="q-pa-md">
    <RateDialogForm v-model="openDialog" :rate="editedRate" />
    <q-table :rows="groupHeaders" :rows-per-page-options="[0]" row-key="type" hide-header hide-bottom hide-pagination
      flat bordered>
      <template v-slot:body="props">
        <q-tr :props="props" @click="props.expand = !props.expand">
          <q-td>
            <span class="text-h6 text-weight-regular">{{ props.row.title }}</span>
          </q-td>
          <q-td auto-width>
            <q-btn size="sm" color="primary" unelevated outline round dense
              :icon="props.expand ? 'expand_less' : 'expand_more'" @click.stop="props.expand = !props.expand" />
          </q-td>
        </q-tr>

        <q-tr v-show="props.expand" :props="props" no-hover>
          <q-td colspan="100%">
            <q-table :rows="rateStore.groupedByType[props.row.type] || []" :rows-per-page-options="[0]"
              :columns="detailsColumn" row-key="id" flat dense>
              <template #body-cell-sources="props">
                <q-td>
                  <RatePriceTable :rate="props.row" :sources="props.row.sources" />
                </q-td>
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-table v-show="false" ref="tableRate" v-model:pagination="pagination" :filter="filter" separator="cell"
      hide-pagination flat bordered :rows="rateStore.rates" :columns="columns" row-key="id">
      <template v-slot:top>
        <div class="table-header row items-center full-width">
          <div class="q-table__title">Работы</div>
          <q-btn class="q-ma-md" size="sm" icon="add" label="Добавить" color="primary" @click="openNewRateDialog" />
          <q-space />
          <q-input outlined dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:header-cell-actions>
        <q-th style="width: 82px;border-left: 0"></q-th>
      </template>
      <template #body-cell-actions="props">
        <q-td style="border-left: 0" class="text-right">
          <q-btn class="action-btn" size="sm" flat round color="negative" icon="delete"
            @click.stop="confirmDelete(props.row)">
            <q-tooltip anchor="top middle" self="bottom middle">
              Удалить
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-sources="props">
        <q-td>
          <RatePriceTable :rate="props.row" :sources="props.row.sources" />
        </q-td>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props" @click="openEditRateDialog(props.row)" :key="props.col.name">
          {{ props.value }}
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
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum, ParamsType } from 'src/features/lookup/rate/types'
import { useUserStore } from "src/features/user/stores/user-store";
import { useQuasar } from 'quasar';
import RateDialogForm from 'src/features/lookup/components/RateDialogForm.vue'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import RatePriceTable from './RatePriceTable.vue'
const $q = useQuasar();
const tableRate = ref();
const { hasPermission } = useUserStore()
const openDialog = ref(false);
const editedRate = ref<Rate | null>(null);
const filter = ref('');
const rateStore = useRateStore()

const { rates = [] } = defineProps<{
  rates: Rate[],
}>()

const groupHeaders = computed(() => {
  return Object.entries(rateStore.groupedByType).map(([type]) => ({
    type,
    title: getGroupTitle(type as ParamsType),
  }))
})

const getGroupTitle = (type: ParamsType) => {
  return ParamsTypeEnum[type];
}
const detailsColumn = [
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
    name: 'sources',
    field: 'sources',
    label: 'Ссылки',
    align: 'left' as const,
  },
  {
    name: 'actions',
    field: 'actions',
    label: '',
    align: 'right' as const,
  },
]
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
        if(!row.boqWorkParamsType) return '-';
        return ParamsTypeEnum[row.boqWorkParamsType];
      },
      label: 'Тип',
      align: 'left' as const,
      sortable: true,
    },
    {
      name: 'sources',
      field: 'sources',
      label: 'Ссылки',
      align: 'left' as const,
    },
    {
      name: 'actions',
      field: 'actions',
      label: '',
      align: 'right' as const,
    },
];
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 15
})
const pagesNumber = computed(() => {
  if (tableRate?.value?.filteredSortedRows) return Math.ceil(tableRate.value.filteredSortedRows.length / pagination.value.rowsPerPage)
  return Math.ceil(rates.length / pagination.value.rowsPerPage)
});

const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить работу?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await rateStore.deleteRate(row.id);
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
};
const openNewRateDialog = () => {
  editedRate.value = null;
  openDialog.value = true;
}
const openEditRateDialog = (rate: Rate) => {
  editedRate.value = rate;
  openDialog.value = true;
}
</script>
<style scoped>
.edit-icon {
  opacity: 0;
  transition: opacity 0.3s;
  margin: -3px 0 0 10px;
}
td:hover{
  cursor: pointer;
}
td:hover .edit-icon {
  opacity: .5;
}
.action-btn{
  opacity: 0;
  transition: opacity 0.3s;
}
tr:hover .action-btn{
  opacity: 1;
}
</style>
