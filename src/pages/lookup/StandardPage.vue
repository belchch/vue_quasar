<template>
  <GenericCrudTable title="Нормативы" :columns="columns" :items="standardStore.items" :formFields="formFields"
    :store="standardStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStandardStore } from 'src/features/lookup/standard/stores/standard-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useUserStore } from "src/features/user/stores/user-store";

const standardStore = useStandardStore();
const { hasPermission } = useUserStore()

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Название',
        editable: true
    },
    {
        name: 'description',
        field: 'description',
        label: 'Описание',
        editable: true
    }
];

const formFields = ref<Field[]>([
    {
        name: 'name',
        label: 'Название',
        type: 'text' as const,
        required: true,
    },
    {
        name: 'description',
        label: 'Описание',
        type: 'textarea' as const,
        required: true,
    }
])

onMounted(async () => {
    await standardStore.requestLookup()
})
</script>
