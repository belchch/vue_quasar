<template>
    <GenericCrudTable title="Тип недостатка" :columns="columns" :items="flawStore.items" :formFields="formFields"
        :store="flawStore" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFlawStore } from 'src/features/defect/flaw/stores/flaw-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'

const flawStore = useFlawStore();

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
    }
])

onMounted(async () => {
    await flawStore.requestLookup()
})
</script>