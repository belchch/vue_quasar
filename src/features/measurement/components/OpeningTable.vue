<template>
    <q-table v-if="rows.length > 0" :rows="rows" :columns="columns" :row-key="row => row.id" wrap-cells flat bordered
        :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination>
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="opening" :props="props">
                    {{ props.row.opening.name }}
                </q-td>
                <q-td key="material" :props="props">
                    {{ props.row.material?.name }}
                </q-td>
                <q-td key="width">
                    {{ props.row.width }}
                </q-td>
                <q-td key="height" :props="props">
                    {{ props.row.height }}
                </q-td>
                <q-td key="area" :props="props">
                    {{ props.row.area }}
                </q-td>
                <q-td key="actions" :props="props">
                    <q-btn v-if="canEdit" icon="delete" @click="() => deleteRow(props.row.id)" size="sm" color="negative"/>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMeasurementStore } from '../stores/measurement-store';
import { OpeningMeasurement } from '../stores/types';
import { computed } from 'vue';
import { useMeasurementService } from '../composables/measurement';

const { openingMeasurements } = storeToRefs(useMeasurementStore())
const { deleteOpeningMeasurement } = useMeasurementService()

const { roomId, canEdit=true} = defineProps<{
    roomId: number,
    canEdit?: boolean
}>()

const rows = computed(() => {
    return openingMeasurements.value?.filter(item => item.room.id == roomId) || []
})

const deleteRow = async (id: number) => {
    await deleteOpeningMeasurement(id)
}

const columns = [
    {
        name: 'opening',
        field: (row: OpeningMeasurement) => row.opening.name,
        label: 'Проем',
        align: 'left' as const,
    },
    {
        name: 'material',
        field: (row: OpeningMeasurement) => row.material?.name,
        label: 'Материал',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: OpeningMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'height',
        field: (row: OpeningMeasurement) => row.height,
        label: 'Длина',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: OpeningMeasurement) => row.area,
        label: 'Площадь',
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
