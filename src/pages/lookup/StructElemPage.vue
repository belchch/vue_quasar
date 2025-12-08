<template>
  <GenericCrudTable title="Поверхности" :columns="columns" :items="structElemStore.items" :formFields="formFields"
    :store="structElemStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useUserStore } from "src/features/user/stores/user-store";

const structElemStore = useStructElemStore()
const materialStore = useMaterialStore()
const { hasPermission } = useUserStore()

const boqSectionOptions = [
    {id: 'FLOOR', name: 'Пол'},
    {id: 'FLOOR_SECTION', name: 'Секция пола'},
    {id: 'CEIL', name: 'Потолок'},
    {id: 'CEIL_SECTION', name: 'Секция потолка'},
    {id: 'DOOR', name: 'Двери'},
    {id: 'WINDOW', name: 'Окна'},
    {id: 'WALL', name: 'Стены'},
    {id: 'FIXED_ASSET', name: 'Конструктив'},
]

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Название',
        editable: true
    },
    {
        name: 'materials',
        field: (row: any) => row.materials?.map((item: any) => item.name).join(', '),
        label: 'Материал',
        editable: true
    },
   {
        name: 'boqSection',
        field: (row: any) => boqSectionOptions.find(item => item.id == row.boqSection)?.name,
        label: 'Секция ВОР',
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
        name: 'materials',
        label: 'Материал',
        type: 'select-multiple' as const,
        required: true,
        options: materialStore.items,
        selectValueField: 'name'
    },
    {
        name: 'boqSection',
        label: 'Секция ВОР',
        type: 'select' as const,
        required: true,
        options: boqSectionOptions,
        selectValueField: 'name'
    },
])

const onAdd = () => {

}

const onUpdate = () => {

}

onMounted(async () => {
    await structElemStore.requestLookup()
    await materialStore.requestLookup()
})
</script>
