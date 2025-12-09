<template>
  <div class="q-pa-md">
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
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>-с учетом износа</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-weight-bold">На дату Акта примема-передачи:</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>-без учета износа</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>-с учетом износа</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { QTableColumn } from 'quasar'
import { SalvageableMaterialType } from 'src/features/salvageable/types'
import { useSalvageableService } from 'src/features/salvageable/service'
import { useSalvageableMaterialStore } from 'src/features/salvageable/store'
import { uomDescription } from 'src/features/rate/stores/types'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const salvageableService = useSalvageableService()
const {
  salvageableMaterials,
  usedSalvageableMaterials,
  unUsedSalvageableMaterials,
  smId,
  isCreate,
  salvageableMaterialsObject,
} = storeToRefs(useSalvageableMaterialStore())

const { title } = defineProps<{
  title: string
}>()

onMounted(async () => {
  const res = await salvageableService.requestSalvageable()
  await salvageableService.requestSalvageableMaterials()
})

const columns = [
  {
    name: 'date',
    label: 'Дата расчета',
    field: 'date',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'restorePrice',
    align: 'center' as const,
    label: 'Стоимость восстановительного ремрнта, руб',
    field: 'restorePrice',
    sortable: true,
  },
  {
    name: 'averagePriceTotal',
    label: 'Стоимость годных остатков, руб',
    field: 'salvageablePrice',
    sortable: true,
  },
  { name: 'averagePriceTotal', label: 'Общая сумма к возмещению,руб', field: 'averagePriceTotal' },
]
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
