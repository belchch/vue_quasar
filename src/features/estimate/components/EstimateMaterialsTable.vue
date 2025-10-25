<template>
  <div>
    <q-markup-table flat bordered wrap-cells separator="cell" class="sticky-header-table" dense>
      <thead>
        <tr>
          <th class="text-left">Наименование</th>
          <th class="text-right">Ед.изм.</th>
          <th class="text-right">Объем</th>
          <th class="text-right">Поставщик</th>
          <th class="text-right">Цена услуги (руб.)</th>
          <th class="text-right">Средняя цена (руб.)</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!estimateStore.estimateMaterials?.items.length">
          <tr>
            <td colspan="6" class="text-center text-blue-grey-14">
              <div class="q-pa-lg">Материалы отсутствуют</div>
            </td>
          </tr>
        </template>
        <template v-for="(item, i) in estimateStore.estimateMaterials?.items" :key="i">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.uom }}</td>
            <td>{{ item.volume }}</td>
            <td>
              <template v-for="source in item.sources" :key="source">
                <div>
                  <a :href="source.url" target="_blank">{{ source.url }}</a>
                </div>
              </template>
            </td>
            <td>
              <template v-for="source in item.sources" :key="source">
                <div>{{ source.price }}</div>
              </template>
            </td>
            <td>{{ item.averagePrice }}</td>
          </tr>
        </template>
        <tr>
          <td colspan="5">Итого, руб.</td>
          <td>{{ estimateStore.estimateMaterials?.itemsTotal }}</td>
        </tr>
        <tr>
          <td colspan="5">Непредвиденные расходы (2 % от итоговой суммы), руб.</td>
          <td>{{ estimateStore.estimateMaterials?.unexpectedExpenses }}</td>
        </tr>
        <tr>
          <td colspan="5">Транспортные расходы (5% от итоговой суммы), руб</td>
          <td>{{ estimateStore.estimateMaterials?.transportation }}</td>
        </tr>
        <tr>
          <td colspan="5">Итого с непредвиденными расходами, руб.</td>
          <td>{{ estimateStore.estimateMaterials?.total }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { useEstimateStore } from 'src/features/estimate/stores/estimate-store'
const estimateStore = useEstimateStore()
</script>
<style scoped>
.sticky-header-table {
  max-height: 80vh;
}

.sticky-header-table caption {
  border-bottom: 1px solid #e0e0e0;
}

.sticky-header-table thead tr:first-child th {
  background-color: white;
}

.sticky-header-table thead tr th {
  text-align: left;
  position: sticky;
  z-index: 1;
}

.sticky-header-table thead tr:first-child th {
  top: 0;
}

tbody {
  scroll-margin-top: 48px;
}
</style>
