<template>
    <GenericCrudTable title="Суды" :columns="columns" :items="courtStore.items" :formFields="formFields"
        :store="courtStore" />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'

import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'

const courtStore = useCourtStore()
const regionStore = useRegionStore()

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Наименование',
        editable: true,
    },
    {
        name: 'postalCode',
        field: 'postalCode',
        label: 'Почтовый индекс',
        editable: true,
    },
    {
        name: 'region',
        field: (row: any) => row.region?.name,
        label: 'Регион',
        editable: true,
    }
];

const formFields = computed((): Field[] => [
    {
        name: 'name',
        label: 'Наименование',
        type: 'text' as const,
        required: true,
    },
    {
        name: 'postalCode',
        label: 'Почтовый индекс',
        type: 'text' as const,
    },
    {
        name: 'region',
        label: 'Регион',
        type: 'select' as const,
        required: true,
        options: regionStore.items,
        selectValueField: 'name'
    }
])

onMounted(async () => {
    await courtStore.requestLookup()
    await regionStore.requestLookup()
})
</script>