<template>
  <div>
    <q-table :rows="works || []" :rows-per-page-options="[0]" :columns="columns" separator="cell" bordered row-key="id"
      flat dense>
      <!-- <template #body="props">
        <q-tr :props="props">
          <q-td v-if="props.rowIndex==0" :rowspan="props.row.rates.length">
            {{ props.row.name }} {{ props.rowIndex }}
          </q-td>
          <q-td v-if="props.rowIndex == 0" :rowspan="props.row.rates.length">
            {{ props.row.uom }}
            {{ props.row.rates }}
          </q-td>
          <q-td v-if="props.rowIndex == 0" :rowspan="props.row.rates.length">
            {{ props.row.volume }}
          </q-td>
          <q-td>
            {{ props.rowIndex }}
          </q-td>
          <q-td>
            {{ props.row.price }}
          </q-td>
          <q-td v-if="props.rowIndex == 0" :rowspan="props.row.rates.length">
            {{ props.row.averagePrice }}
          </q-td>
          <q-td v-if="props.rowIndex == 0" :rowspan="props.row.rates.length">
            {{ props.row.averageCost }}
          </q-td>
        </q-tr>
      </template> -->
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
      <template #bottom-row>
        <q-tr class="text-weight-bold">
          <q-td :colspan="4">
            Итого по разделу, руб.
          </q-td>
          <q-td></q-td>
          <q-td></q-td>
          <q-td>{{ total }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">

import { EstimateWork } from 'src/features/estimate/api/types';

const { works, total } = defineProps<{
  works: EstimateWork[],
  total: number
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
