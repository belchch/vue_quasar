<template>
  <GenericCrudTable title="Регионы" :columns="columns" :items="regionStore.items" :formFields="formFields"
    :store="regionStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useUserStore } from "src/features/user/stores/user-store";

const regionStore = useRegionStore();
const { hasPermission } = useUserStore()

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
