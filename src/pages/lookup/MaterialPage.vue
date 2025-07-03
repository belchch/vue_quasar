<template>
  <GenericCrudTable title="Материалы" :columns="columns" :items="materialStore.items" :formFields="formFields"
    :store="materialStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useUserStore } from "src/features/user/stores/user-store";

const materialStore = useMaterialStore();
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
        rules: [(val) => val.length >= 3 || 'Минимум 3 символа'] //TODO не рабоает
    }
])

onMounted(async () => {
    await materialStore.requestLookup()
})
</script>
