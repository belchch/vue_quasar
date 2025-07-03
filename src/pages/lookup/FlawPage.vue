<template>
  <GenericCrudTable title="Тип недостатка" :columns="columns" :items="flawStore.items" :formFields="formFields"
    :store="flawStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFlawStore } from 'src/features/defect/flaw/stores/flaw-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useUserStore } from "src/features/user/stores/user-store";

const flawStore = useFlawStore();
const { hasPermission } = useUserStore()

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
