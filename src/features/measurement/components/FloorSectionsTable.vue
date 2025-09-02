<template>
  <div v-if="rows.length > 0">
    <div class="text-subtitle1 q-mb-sm">
      Секции пола
    </div>
    <q-table :rows="rows" :columns="columns" :row-key="row => row.id" wrap-cells flat bordered
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
import { FloorSectionMeasurement } from '../stores/types';
import { ref, onMounted } from 'vue';
import { useMeasurementService } from '../composables/measurement';

// const { floorSectionMeasurements } = storeToRefs(useMeasurementStore())
const { deleteFloorSectionMeasurement, requestFloorSectionMeasurements } = useMeasurementService()

const { roomId, canEdit=true} = defineProps<{
    roomId: number,
    canEdit?: boolean
}>()

const rows = ref<FloorSectionMeasurement[]>([]);

const deleteRow = async (id: number) => {
  await deleteFloorSectionMeasurement(id)
}
onMounted(async () => {
  rows.value = await requestFloorSectionMeasurements(roomId)
});
const columns = [
    {
        name: 'material',
        field: (row: FloorSectionMeasurement) => row.material?.name,
        label: 'Материал',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: FloorSectionMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'length',
        field: (row: FloorSectionMeasurement) => row.length,
        label: 'Длина',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: FloorSectionMeasurement) => row.area,
        label: 'Площадь',
        align: 'left' as const,
    },
    {
      name: 'perimeter',
      field: (row: FloorSectionMeasurement) => row.perimeter,
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
