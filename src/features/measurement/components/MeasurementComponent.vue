<template>
    <q-card>

        <q-table v-if="allRoomMeasurements" :rows="allRoomMeasurements" :columns="columns" :row-key="row => row.room.id"
            selection="single" wrap-cells flat bordered :pagination="{ rowsPerPage: 20 }" separator="cell">
            <template v-slot:top>
                <DownloadReportButton label="Скачать" :disable="false" :api-fn="buildDocx" />
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn size="xs" flat dense @click="props.expand = !props.expand"
                            :icon="props.expand ? 'remove' : 'add'" sor />
                    </q-td>
                    <q-td key="room" :props="props">
                        {{ props.row.room.name }}
                    </q-td>
                    <q-td key="declaredArea" :props="props">
                        <CellEditor :value="props.row.declaredArea as number" field="declaredArea"
                            :row="props.row as RoomMeasurement" />
                    </q-td>
                    <q-td key="width">
                        <CellEditor :value="props.row.width as number" field="width"
                            :row="props.row as RoomMeasurement" />
                    </q-td>
                    <q-td key="length" :props="props">
                        <CellEditor :value="props.row.length as number" field="length"
                            :row="props.row as RoomMeasurement" />
                    </q-td>
                    <q-td key="height" :props="props">
                        <CellEditor :value="props.row.height as number" field="height"
                            :row="props.row as RoomMeasurement" />
                    </q-td>
                    <q-td key="area" :props="props">
                        {{ props.row.area }}
                    </q-td>
                    <q-td key="perimeter" :props="props">
                        {{ props.row.perimeter }}
                    </q-td>
                    <q-td key="doorArea" :props="props">
                        {{ props.row.doorArea }}
                    </q-td>
                    <q-td key="windowArea" :props="props">
                        {{ props.row.windowArea }}
                    </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="text-left">
                            <div class="q-gutter-sm q-pa-lg">
                                <AddOpeningDialog :room="props.row.room" />
                                <OpeningTable :room-id="props.row.room.id" />
                            </div>
                        </div>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMeasurementStore } from '../stores/measurement-store';
import { RoomMeasurement } from '../stores/types';
import CellEditor from './CellEditor.vue';
import { onMounted } from 'vue';
import { useMeasurementService } from '../composables/measurement';
import AddOpeningDialog from './AddOpeningDialog.vue';
import OpeningTable from './OpeningTable.vue';
import { RoomMeasurementApi } from '../api/room-measurement-api';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import DownloadReportButton from 'src/components/DownloadReportButton.vue';

const { allRoomMeasurements } = storeToRefs(useMeasurementStore())
const { requestMeasurements } = useMeasurementService()
const { selectedInspectionId } = storeToRefs(useInspectionsStore())

const buildDocx = async () => {
    const response = await RoomMeasurementApi.buildDocx(selectedInspectionId.value!!)
    return response.data
}

const columns = [
    {
        name: 'room',
        field: (row: RoomMeasurement) => row.room.name,
        label: 'Локация',
        align: 'left' as const,
    },
    {
        name: 'declaredArea',
        field: (row: RoomMeasurement) => row.declaredArea,
        label: 'Площадь из договора ДДУ',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: RoomMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'length',
        field: (row: RoomMeasurement) => row.length,
        label: 'Длина',
        align: 'left' as const,
    },
    {
        name: 'height',
        field: (row: RoomMeasurement) => row.width,
        label: 'Высота потолков',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: RoomMeasurement) => row.area,
        label: 'Плащадь без учета проемов',
        align: 'left' as const,
    },
    {
        name: 'perimeter',
        field: (row: RoomMeasurement) => row.perimeter,
        label: 'Периметр без учета проемов',
        align: 'left' as const,
    },
    {
        name: 'doorArea',
        field: (row: RoomMeasurement) => row.doorArea,
        label: 'Площадь дверных проемов',
        align: 'left' as const,
    },
    {
        name: 'windowArea',
        field: (row: RoomMeasurement) => row.windowArea,
        label: 'Площадь оконных проемов',
        align: 'left' as const,
    },
]

onMounted(async () => {
    await requestMeasurements()
})
</script>