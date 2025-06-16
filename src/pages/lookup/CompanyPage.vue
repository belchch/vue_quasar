<template>
    <GenericCrudTable title="Организации" :columns="columns" :items="companyStore.items" :formFields="formFields"
        :store="companyStore" />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'

import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'

const companyStore = useCompanyStore()

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Наименование',
        editable: true,
    },
    {
        name: 'inn',
        field: 'inn',
        label: 'ИНН',
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
        name: 'inn',
        label: 'ИНН',
        type: 'text' as const,
    }
])

onMounted(async () => {
    await companyStore.requestLookup()
})
</script>