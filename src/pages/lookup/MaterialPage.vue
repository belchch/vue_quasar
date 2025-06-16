<template>
    <GenericCrudTable title="Материалы" :columns="columns" :items="materialStore.items" :formFields="formFields"
        :store="materialStore" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'

const materialStore = useMaterialStore();

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Название',
        editable: true
    }
];

const formFields = ref<Field[]>([
    {
        name: 'name',
        label: 'Название',
        type: 'text' as const,
        required: true,
        rules: [(val) => val.length >= 3 || 'Минимум 3 символа'] //TODO не рабоает
    }
])

onMounted(async () => {
    await materialStore.requestLookup()
})
</script>