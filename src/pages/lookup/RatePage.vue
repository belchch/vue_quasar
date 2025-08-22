<template>
  <div class="text-center q-mt-md" v-if="rateStore.loading">
    <q-spinner color="primary" size="3em" :thickness="2" />
    <div class="q-mt-md">Загрузка...</div>
  </div>
  <div v-else class="q-pa-md">
    <RateDialogForm v-model="openDialog" :rate="editedRate" />
    <q-table :pagination="{ rowsPerPage: 0 }" :filter="filter" separator="cell" hide-pagination flat bordered
      :rows="rateStore.rates" :columns="columns" row-key="id">
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
          <!-- <q-btn @click="openEditRateDialog(props.row)" class="action-btn" size="sm" flat round color="primary"
            icon="edit">
            <q-tooltip anchor="top middle" self="bottom middle">
              Редактировать
            </q-tooltip>
          </q-btn> -->
          <q-btn class="action-btn" size="sm" flat round color="negative" icon="delete"
            @click.stop="confirmDelete(props.row)">
            <q-tooltip anchor="top middle" self="bottom middle">
              Удалить
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props" @click="openEditRateDialog(props.row)" :key="props.col.name">
          {{ props.value }}
          <q-icon name="edit" class="edit-icon" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum, ParamsType } from 'src/features/lookup/rate/types'
import { useUserStore } from "src/features/user/stores/user-store";
import { useQuasar } from 'quasar';
import RateDialogForm from 'src/features/lookup/components/RateDialogForm.vue'
const $q = useQuasar();

const rateStore = useRateStore()
const { hasPermission } = useUserStore()
const openDialog = ref(false);
const editedRate = ref<Rate | null>(null);
const filter = ref('');
const columns = [
    {
      name: 'name',
      field: 'name',
      label: 'Название',
      align: 'left' as const,
    },
    {
      name: 'price',
      field: 'price',
      label: 'Стоимость',
      align: 'left' as const,
    },
    {
      name: 'unitOfMeasure',
      field: (row: Rate) => UnitOfMeasureEnum[row.unitOfMeasure],
      label: 'Ед.измерения',
      align: 'left' as const,
    },
    {
      name: 'factor',
      field: 'factor',
      label: 'Коэф.',
      align: 'left' as const,
    },
    {
      name: 'paramsType',
      field: (row: Rate) => {
        if(!row.boqWorkParamsType) return '-';
        return ParamsTypeEnum[row.boqWorkParamsType];
      },
      label: 'Тип',
      align: 'left' as const,
    },
    {
      name: 'sourceUrl',
      field: 'sourceUrl',
      label: 'Ссылка',
      align: 'left' as const,
    },
    {
      name: 'actions',
      field: 'actions',
      label: '',
      align: 'right' as const,
    },
];

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
