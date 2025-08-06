<template>
    <q-table :rows="locations || []" :columns="columns" :row-key="row => row.id" wrap-cells flat
        bordered :pagination="{ rowsPerPage: 20 }" separator="cell">
        <template v-slot:top>
            <q-btn @click="buildAndRequestBoq" color="primary" size="sm">
                Сформировать
            </q-btn>
        </template>
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="name" :props="props" @click="navigateLocation(props.row)">
                    <div class="text-accent" style="cursor: pointer;">
                        {{ props.row.room.name }}
                    </div>
                </q-td>
                <q-td key="area" :props="props">
                    <LocationCellEditor
                        field="area"
                        :value="props.row.area"
                        :row="props.row"
                    />
                </q-td>
                <q-td key="height">
                    <LocationCellEditor
                        field="height"
                        :value="props.row.height"
                        :row="props.row"
                    />
                </q-td>
                <q-td key="perimeter" :props="props">
                    <LocationCellEditor
                        field="perimeter"
                        :value="props.row.perimeter"
                        :row="props.row"
                    />
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useBoqService } from '../composables/boq';
import { useBoqStore } from '../stores/boq-store';
import { storeToRefs } from 'pinia';
import { BoqLocation } from '../api/types';
import LocationCellEditor from './LocationCellEditor.vue';

const emits = defineEmits<{
    navigateLocation: [location: BoqLocation] 
}>()

const { requestBoq, buildAndRequestBoq } = useBoqService()
const { locations } = storeToRefs(useBoqStore())

const navigateLocation = (location: BoqLocation) => {
    emits('navigateLocation', location)
}

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Локация',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: 'area',
        label: 'Общая площадь',
        align: 'left' as const,
    },
    {
        name: 'height',
        field: 'height',
        label: 'Высота потолков',
        align: 'left' as const,
    },
    {
        name: 'perimeter',
        field: 'perimeter',
        label: 'Периметр',
        align: 'left' as const,
    }
]

onMounted(async () => {
    await requestBoq()
})

</script>