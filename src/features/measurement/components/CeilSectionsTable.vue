<template>
  <div v-if="ceilSectionMeasurements.length > 0">
    <div class="text-subtitle1 q-mb-sm">
      Секции потолка
    </div>
    <q-table :rows="ceilSectionMeasurements" :columns="columns" :row-key="row => row.id" wrap-cells flat bordered
      :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="material" :props="props">
            {{ props.row.material?.name }}
          </q-td>
          <q-td key="width">
            {{ props.row.width }}
          </q-td>
          <q-td key="length" :props="props">
            {{ props.row.length }}
          </q-td>
          <q-td key="perimeter" :props="props">
            {{ props.row.perimeter }}
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn v-if="canEdit" icon="delete" @click="() => deleteRow(props.row.id)" size="sm" color="negative" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMeasurementStore } from '../stores/measurement-store';
import { CeilSectionMeasurement } from '../stores/types';
import { computed } from 'vue';
import { useMeasurementService } from '../composables/measurement';

const { ceilSectionMeasurements } = storeToRefs(useMeasurementStore())
const { deleteCeilSectionMeasurement } = useMeasurementService()

const { roomId, canEdit=true} = defineProps<{
    roomId: number,
    canEdit?: boolean
}>()

const rows = computed(() => {
  //return ceilSectionMeasurements.value?.filter(item => item.room.id == roomId) || []
  return [];
})

const deleteRow = async (id: number) => {
  await deleteCeilSectionMeasurement(id)
}

const columns = [
    {
        name: 'material',
        field: (row: CeilSectionMeasurement) => row.material?.name,
        label: 'Материал',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: CeilSectionMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'length',
        field: (row: CeilSectionMeasurement) => row.length,
        label: 'Длина',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: CeilSectionMeasurement) => row.area,
        label: 'Площадь',
        align: 'left' as const,
    },
    {
      name: 'perimeter',
      field: (row: CeilSectionMeasurement) => row.perimeter,
      label: 'Периметр',
      align: 'left' as const,
    },
    {
        name: 'actions',
        field: '',
        label: '',
        align: 'right' as const
    }
]
</script>
