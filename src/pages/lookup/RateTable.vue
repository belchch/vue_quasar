<template>
  <div class="text-center q-mt-md" v-if="rateStore.loading">
    <q-spinner color="primary" size="3em" :thickness="2" />
    <div class="q-mt-md">Загрузка...</div>
  </div>
  <div v-else class="q-pa-md">
    <q-table :rows="groupHeaders" :rows-per-page-options="[0]" row-key="type" hide-header hide-bottom hide-pagination
      flat bordered>
      <template v-slot:body="props">
        <q-tr :props="props" @click="props.expand = !props.expand">
          <q-td>
            <span class="text-h6 text-weight-regular">{{ props.row.title }}</span>
          </q-td>
          <q-td auto-width>
            <q-icon :name="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click.stop="props.expand = !props.expand" size="sm" color="grey-7" />
          </q-td>
        </q-tr>

        <q-tr v-show="props.expand" :props="props" no-hover>
          <q-td colspan="100%">
            <q-table :rows="rateStore.groupedByType[props.row.type] || []" :rows-per-page-options="[0]"
              :columns="detailsColumn" row-key="id" flat dense separator="cell" bordered>
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rate, UnitOfMeasureEnum, ParamsTypeEnum, ParamsType } from 'src/features/lookup/rate/types'
import { useUserStore } from "src/features/user/stores/user-store";
import { useQuasar } from 'quasar';
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import RatePriceTable from './RatePriceTable.vue'
const $q = useQuasar();
const tableRate = ref();
const { hasPermission } = useUserStore()
const openDialog = ref(false);
const editedRate = ref<Rate | null>(null);
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

</script>
<style scoped>
td:hover{
  cursor: pointer;
}
</style>
