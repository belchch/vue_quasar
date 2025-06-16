<template>
    <GenericCrudTable title="Судьи" :columns="columns" :items="judgeStore.items" :formFields="formFields"
        :store="judgeStore" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'

const judgeStore = useJudgeStore()
const courtStore = useCourtStore()

const columns = [
    {
        name: 'fullName',
        required: true,
        label: 'Имя' as string,
        field: (row: any) => `${row.lastName} ${row.firstName} ${row.middleName || ''}`,
        editable: true
    },
    {
        name: 'court',
        required: true,
        label: 'Суд' as string,
        field: (row: any) => row.court?.name,
        editable: true
    },
    {
        name: 'city',
        label: 'Город' as string,
        align: 'left' as 'left' | 'center' | 'right',
        field: (row: any) => row.court?.region,
        editable: true
    },
];

const formFields = computed((): Field[] => [
    {
        name: 'lastName',
        label: 'Фамилия',
        type: 'text' as const,
        required: true
    },
    {
        name: 'firstName',
        label: 'Имя',
        type: 'text' as const,
        required: true
    },
    {
        name: 'middleName',
        label: 'Отчество',
        type: 'text' as const
    },
    {
        name: 'court',
        label: 'Суд',
        type: 'select' as const,
        options: courtStore.items,
        required: true,
        selectValueField: 'name'
    }
])

onMounted(async () => {
    await judgeStore.requestLookup()
    await courtStore.requestLookup()
})
</script>