<template>
  <GenericCrudTable title="Проемы" :columns="columns" :items="openingStore.items" :formFields="formFields"
    :store="openingStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useOpeningStore } from 'src/features/lookup/opening/opening-store'
import { useUserStore } from "src/features/user/stores/user-store";

const openingStore = useOpeningStore()
const { hasPermission } = useUserStore()

const typeOptions = [
    {id: 'DOOR', name: 'Дверь'},
    {id: 'WINDOW', name: 'Окно'},
]

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Название',
        editable: true
    },
    {
        name: 'width',
        field: 'width',
        label: 'Ширина',
        editable: true
    },
    {
        name: 'height',
        field: 'height',
        label: 'Высота',
        editable: true
    },
    {
        name: 'type',
        field: (row: any) => typeOptions.find(item => item.id == row.type)?.name,
        label: 'Тип',
        editable: true,
    },
];

const formFields = computed((): Field[] => [
    {
        name: 'name',
        label: 'Название',
        type: 'text' as const,
        required: true,
    },
    {
        name: 'width',
        label: 'Ширина',
        type: 'decimal' as const,
        required: true
    },
    {
        name: 'height',
        label: 'Высота',
        type: 'decimal' as const,
        required: true
    },
    {
        name: 'type',
        label: 'Тип',
        type: 'select' as const,
        required: true,
        options: typeOptions,
        selectValueField: 'name'
    },
])

const onAdd = () => {

}

const onUpdate = () => {

}

onMounted(async () => {
    await openingStore.requestLookup()
})
</script>
