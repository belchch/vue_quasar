<template>
    <q-table :rows="inspections" :columns="columns" :row-key="row => row.id" wrap-cells flat bordered
        :pagination="{ rowsPerPage: 20 }" separator="cell" class="q-ma-md" @row-click="rowClick">
        <template v-slot:top>
            <q-btn @click="createInspection" color="primary" size="sm">
                Создать осмотр
            </q-btn>
        </template>
    </q-table>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { Inspection } from 'src/features/inspection/store/types';

const { inspections, selectedInspectionId } = storeToRefs(useInspectionsStore())

const rowClick = (evt: any, row: Inspection) => {
    selectedInspectionId.value = row.id
}

const createInspection = () => {
    
}

const columns = [
    {
        name: 'apartment',
        field: 'address',
        label: 'Номер квартиры',
        align: 'left' as const,
    },
    {
        name: 'Дата осмотра',
        field: 'performedAt',
        label: 'Дата исполнения',
        align: 'left' as const,
    },
    {
        name: 'performedBy',
        field: 'performedBy',
        label: 'Эксперт',
        align: 'left' as const,
    }
]
</script>