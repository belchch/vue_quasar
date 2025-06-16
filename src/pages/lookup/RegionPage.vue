<template>
    <GenericCrudTable title="Регионы" :columns="columns" :items="regionStore.items" :formFields="formFields"
        :store="regionStore" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'

const regionStore = useRegionStore();

const columns = [
    {
        name: 'code',
        field: 'code',
        label: 'Код',
        editable: true
    },
    {
        name: 'name',
        field: 'name',
        label: 'Название',
        editable: true
    }
];

const formFields = ref<Field[]>([
    {
        name: 'code',
        label: 'Код',
        type: 'text' as const,
        required: true,
    },
    {
        name: 'name',
        label: 'Название',
        type: 'text' as const,
        required: true,
    }
])

onMounted(async () => {
    await regionStore.requestLookup()
})
</script>