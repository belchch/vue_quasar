<template>
  <div>
    <q-table :rows="works || []" :rows-per-page-options="[10]" :columns="columns" separator="cell" bordered row-key="id"
      flat dense wrap-cells>
      <template #header-cell-averageCost="props">
        <q-th :props="props" class="text-wrap">
          Средняя<br> рыночная<br> стоимость<br> (руб.)
        </q-th>
      </template>
      <template #header-cell-averagePrice="props">
        <q-th :props="props" class="text-wrap">
          Средняя<br>цена<br>(руб.)
        </q-th>
      </template>
      <template #header-cell-price="props">
        <q-th :props="props" class="text-wrap">
          Цена<br>услуги<br>(руб.)
        </q-th>
      </template>
      <template #body-cell-links="props">
        <q-td>
          <template v-for="rate in props.row.rates" :key="rate">
            <div><a :href="rate.url" target="_blank">{{ rate.url }}</a></div>
          </template>
        </q-td>
      </template>
      <template #body-cell-price="props">
        <q-td>
          <template v-for="rate in props.row.rates" :key="rate">
            <div>{{ rate.price }}</div>
          </template>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">

import { EstimateWork } from 'src/features/estimate/api/types';

const { works } = defineProps<{
  works: EstimateWork[],
}>();


const columns = [
  {
    name: 'name',
    label: 'Наименование',
    field: 'name',
    align: 'left' as const
  },
  {
    name: 'uom',
    label: 'Ед.изм.',
    field: 'uom',
    align: 'left' as const
  },
  {
    name: 'volume',
    label: 'Объем',
    field: 'volume',
    align: 'left' as const
  },
  {
    name: 'links',
    label: 'Поставщик',
    field: 'links',
    align: 'left' as const
  },
  {
    name: 'price',
    label: 'Цена услуги (руб.) ',
    field: 'price',
    align: 'left' as const
  },
  {
    name: 'averagePrice',
    label: 'Средняя цена (руб.)',
    field: 'averagePrice',
    align: 'left' as const
  },
  {
    name: 'averageCost',
    label: 'Средняя рыночная стоимость (руб.)',
    field: 'averageCost',
    align: 'left' as const
  }
]

</script>

<style lang="scss" scoped>

</style>
