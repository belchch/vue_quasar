<template>
  <div class="q-pt-md">
    <q-table :rows="estimateStore.processedEstimateGroups || []" :rows-per-page-options="[0]" :row-key="(row)=>row"
      hide-header hide-bottom hide-pagination bordered wrap-cells>
      <template v-slot:top-row>
        <q-tr class="main-row">
          <q-td colspan="100%" style="text-align: center;">
            <div>СМЕТА</div>
            <div>на выполнение строительно-ремонтных работ</div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="props.expand = !props.expand">
          <q-td class="second-row">
            <span>{{ props.row.description }}</span>
          </q-td>
          <q-td auto-width style="text-align: right;">
            <q-icon :name="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click.stop="props.expand = !props.expand" size="sm" color="grey-7" />
            <!-- <q-btn size="sm" color="primary" unelevated flat round dense
              :icon="props.expand ? 'expand_less' : 'expand_more'" @click.stop="props.expand = !props.expand" /> -->
          </q-td>
        </q-tr>

        <q-tr v-show="props.expand" :props="props" no-hover>
          <q-td colspan="100%">
            <estimate-table-group :total="props.row.total" :works="props.row.works" />
          </q-td>
        </q-tr>
      </template>
      <template #bottom-row>
        <q-tr class="main-row">
          <q-td>
            Итого, руб.
          </q-td>
          <q-td>{{ estimateStore.estimate?.worksTotal }}</q-td>
        </q-tr>
        <q-tr class="main-row">
          <q-td>
            Непредвиденные расходы (2 % от итоговой суммы), руб.
          </q-td>
          <q-td>{{ estimateStore.estimate?.unexpectedExpenses }}</q-td>
        </q-tr>
        <q-tr class="main-row">
          <q-td>
            Вывоз мусора (5% от итоговой суммы), руб
          </q-td>
          <q-td>{{ estimateStore.estimate?.garbageRemoval }}</q-td>
        </q-tr>
        <q-tr class="main-row">
          <q-td>
            Итого по всем разделам с непредвиденными расходами, руб.
          </q-td>
          <q-td>{{ estimateStore.estimate?.total }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Estimate } from 'src/features/estimate/api/types'
import { useEstimateStore } from "src/features/estimate/stores/estimate-store"
import { useEstimateService } from 'src/features/estimate/composables/estimate-service'
import { useQuasar } from 'quasar';
import EstimateTableGroup from './EstimateTableGroup.vue'


const estimateStore = useEstimateStore()
const estimateService = useEstimateService()

onMounted(async() => {
  await estimateService.getEstimate()
})

// const groupHeaders = computed(() => {
//   return Object.entries(rateStore.groupedByType).map(([type]) => ({
//     type,
//     title: getGroupTitle(type as ParamsType),
//   }))
// })

// const getGroupTitle = (type: ParamsType) => {
//   return ParamsTypeEnum[type];
// }


</script>
<style scoped>
.main-row{
  /* background-color: #e2e2e2; */
  font-weight: bold;
}
.second-row{
  /* background-color: #eeeeee; */
  font-weight: bold;
}
.edit-icon {
  opacity: 0;
  transition: opacity 0.3s;
  margin: -3px 0 0 10px;
}

td:hover {
  cursor: pointer;
}

td:hover .edit-icon {
  opacity: .5;
}

.action-btn {
  opacity: 0;
  transition: opacity 0.3s;
}

tr:hover .action-btn {
  opacity: 1;
}
</style>
