<template>
    <GenericCrudTable title="Недостатки" :columns="columns" :items="defectStore.items" :formFields="formFields"
        :store="defectStore" :visibleColumns="visibleColumns" :addForm="{ classname: 'defect' }" />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDefectLookupStore } from 'src/features/defect/stores/defect-lookup-store'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useFlawStore } from 'src/features/defect/flaw/stores/flaw-store'
import { useStandardStore } from 'src/features/lookup/standard/stores/standard-store'

import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'

const defectStore = useDefectLookupStore()
const structElemnStore = useStructElemStore()
const materialStore = useMaterialStore()
const flawStore = useFlawStore()
const standardStore = useStandardStore()

const columns = [
    {
        name: 'structElem',
        field: (row: any) => row.structElem?.name,
        label: 'Поверхность',
        editable: true,
        style: 'width: 80px'
    },
    {
        name: 'template',
        field: 'template',
        label: 'Шаблон',
        editable: true,
    },
    {
        name: 'material',
        field: (row: any) => row.material?.name,
        label: 'Материал',
        editable: true,
    },
    {
        name: 'flaw',
        field: (row: any) => row.flaw?.name,
        label: 'Тип',
        editable: true,
    },
    {
        name: 'standard',
        field: (row: any) => row.standard?.name,
        label: 'ГОСТ',
        editable: true,
    },

];

const visibleColumns = ['structElem', 'template', 'material', 'flaw', 'standard'];

const formFields = computed((): Field[] => [
    {
        name: 'template',
        label: 'Шаблон',
        type: 'textarea' as const,
        required: true,
    },
    {
        name: 'structElem',
        label: 'Поверхность',
        type: 'select' as const,
        required: true,
        options: structElemnStore.items,
        selectValueField: 'name'
    },
    {
        name: 'material',
        label: 'Материал',
        type: 'select' as const,
        required: true,
        options: materialStore.items,
        selectValueField: 'name'
    },
    {
        name: 'flaw',
        label: 'Тип недостатка',
        type: 'select' as const,
        required: true,
        options: flawStore.items,
        selectValueField: 'name'
    },
    {
        name: 'standard',
        label: 'ГОСТ',
        type: 'select' as const,
        required: true,
        options: standardStore.items,
        selectValueField: 'name'
    },
    {
        name: 'hasValue',
        label: 'Вводить значение',
        type: 'checkbox' as const,
    },
    {
        name: 'hasCause',
        label: 'Выбирать причину возникновения',
        type: 'checkbox' as const,
    },
])

onMounted(async () => {
    await defectStore.requestLookup()
    await structElemnStore.requestLookup()
    await materialStore.requestLookup()
    await flawStore.requestLookup()
    await standardStore.requestLookup()
})
</script>