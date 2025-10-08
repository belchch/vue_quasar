<template>
  <div class="q-pt-sm">
    <q-markup-table bordered wrap-cells separator="cell" class="sticky-header-table" dense>
      <caption class="q-pt-sm">
        <div>СМЕТА</div>
        <div>на выполнение строительно-ремонтных работ</div>
      </caption>
      <thead>
        <tr>
          <th class="text-left">Наименование</th>
          <th class="text-right">Ед.изм.</th>
          <th class="text-right">Объем</th>
          <th class="text-right">Поставщик</th>
          <th class="text-right">Цена услуги (руб.)</th>
          <th class="text-right">Средняя цена (руб.)</th>
          <th class="text-right">Средняя рыночная стоимость (руб.)</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(group, i) in estimateStore.estimate?.groups" :key="i">
          <tr>
            <td :colspan="7">{{ group.description }}</td>
          </tr>
          <tr v-for="(work, j) in group.works" :key="j">
            <td>{{ work.name }}</td>
            <td>{{ work.uom }}</td>
            <td>{{ work.volume }}</td>
            <td>
              <template v-for="rate in work.rates" :key="rate">
                <div><a :href="rate.url" target="_blank">{{ rate.url }}</a></div>
              </template>
            </td>
            <td>
              <template v-for="rate in work.rates" :key="rate">
                <div>{{ rate.price }}</div>
              </template>
            </td>
            <td>{{ work.averagePrice }}</td>
            <td>{{ work.averageCost }}</td>
          </tr>
          <tr>
            <td colspan="6">
              Итого по разделу, руб.
            </td>
            <td>{{ group.total }}</td>
          </tr>
        </template>
        <tr>
          <td colspan="6">Итого, руб.</td>
          <td>{{estimateStore.estimate?.worksTotal}}</td>
        </tr>
        <tr>
          <td colspan="6">Непредвиденные расходы (2 % от итоговой суммы), руб.</td>
          <td>{{ estimateStore.estimate?.unexpectedExpenses }}</td>
        </tr>
        <tr>
          <td colspan="6">Вывоз мусора (5% от итоговой суммы), руб</td>
          <td>{{ estimateStore.estimate?.garbageRemoval }}</td>
        </tr>
        <tr>
          <td colspan="6">Транспортные расходы (5% от итоговой суммы), руб</td>
          <td>{{ estimateStore.estimate?.transportation }}</td>
        </tr>
        <tr>
          <td colspan="6">Итого по всем разделам с непредвиденными расходами, руб.</td>
          <td>{{ estimateStore.estimate?.total }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useEstimateStore } from "src/features/estimate/stores/estimate-store"
import { useEstimateService } from 'src/features/estimate/composables/estimate-service'

const estimateStore = useEstimateStore()
const estimateService = useEstimateService()

onMounted(async() => {
  await estimateService.getEstimate()
})

</script>
<style scoped>
.sticky-header-table{
  max-height: 80vh;
}
.sticky-header-table caption{
  border-bottom:1px solid #e0e0e0 ;
}
.sticky-header-table thead tr:first-child th{
  background-color: white;
}
.sticky-header-table thead tr th{
    text-align: left;
    position: sticky;
    z-index: 1;
}
.sticky-header-table thead tr:first-child th{
  top: 0;
}
tbody{
    scroll-margin-top: 48px
}
</style>
