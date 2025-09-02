<template>
  <div v-if="wallSectionMeasurements.length > 0">
    <div class="text-subtitle1 q-mb-sm">
      Секции стены
    </div>
    <q-table :rows="wallSectionMeasurements" :columns="columns" :row-key="row => row.id" wrap-cells flat bordered
      :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="material" :props="props">
            {{ props.row.material?.name }}
          </q-td>
          <q-td key="width">
            {{ props.row.width }}
          </q-td>
          <q-td key="height" :props="props">
            {{ props.row.height }}
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
import { WallSectionMeasurement } from '../stores/types';
import { computed } from 'vue';
import { useMeasurementService } from '../composables/measurement';

const { wallSectionMeasurements } = storeToRefs(useMeasurementStore())
const { deleteWallSectionMeasurement } = useMeasurementService()

const { canEdit=true} = defineProps<{
    canEdit?: boolean
}>()

const deleteRow = async (id: number) => {
  await deleteWallSectionMeasurement(id)
}

const columns = [
    {
        name: 'material',
        field: (row: WallSectionMeasurement) => row.material?.name,
        label: 'Материал',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: WallSectionMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'height',
        field: (row: WallSectionMeasurement) => row.height,
        label: 'Высота',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: WallSectionMeasurement) => row.area,
        label: 'Площадь',
        align: 'left' as const,
    },
    {
      name: 'perimeter',
      field: (row: WallSectionMeasurement) => row.perimeter,
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
