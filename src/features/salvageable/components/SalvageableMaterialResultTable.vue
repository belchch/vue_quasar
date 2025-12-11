<template>
  <div class="q-pa-md" v-if="isInitialized">
    <q-markup-table wrap-cells separator="cell">
      <thead>
        <tr>
          <th class="text-left">Дата расчета</th>
          <th class="text-right">Стоимость восстановительного ремрнта, руб</th>
          <th class="text-right">Стоимость годных остатков, руб</th>
          <th class="text-right">Общая сумма к возмещению,руб</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-weight-bold">На дату проведения экспертизы:</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>-без учета износа</td>
          <td>{{ salvageableMaterialsObject?.total1 }}</td>
          <td>{{ salvageableMaterialsObject?.cost1 }}</td>
          <td>{{ salvageableMaterialsObject?.sum1 }}</td>
        </tr>
        <tr>
          <td>-с учетом износа</td>
          <td>{{ salvageableMaterialsObject?.total2 }}</td>
          <td>{{ salvageableMaterialsObject?.cost2 }}</td>
          <td>{{ salvageableMaterialsObject?.sum2 }}</td>
        </tr>
        <tr>
          <td class="text-weight-bold">На дату Акта примема-передачи:</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>-без учета износа</td>
          <td>{{ salvageableMaterialsObject?.total3 }}</td>
          <td>{{ salvageableMaterialsObject?.cost3 }}</td>
          <td>{{ salvageableMaterialsObject?.sum3 }}</td>
        </tr>
        <tr>
          <td>-с учетом износа</td>
          <td title="total4">{{ salvageableMaterialsObject?.total4 }}</td>
          <td title="cost4">{{ salvageableMaterialsObject?.cost4 }}</td>
          <td title="sum4">{{ salvageableMaterialsObject?.sum4 }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { SalvageableMaterialType } from 'src/features/salvageable/types'
import { useSalvageableService } from 'src/features/salvageable/service'
import { useSalvageableMaterialStore } from 'src/features/salvageable/store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const salvageableService = useSalvageableService()
const {
  salvageableMaterials,
  usedSalvageableMaterials,
  unUsedSalvageableMaterials,
  smId,
  isInitialized,
  salvageableMaterialsObject,
} = storeToRefs(useSalvageableMaterialStore())

const { title } = defineProps<{
  title: string
}>()
</script>

<style scoped>
.edit-icon {
  opacity: var(--e-opacity-edit-icon);
  transition: opacity 0.3s;
  margin: -3px 0 0 10px;
}
.action-btn {
  opacity: 0;
  transition: opacity 0.3s;
}
tr:hover .action-btn {
  opacity: 1;
}
</style>
