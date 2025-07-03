<template>
  <GenericCrudTable title="Локации" :columns="columns" :items="spotStore.items" :formFields="formFields"
    :store="spotStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSpotStore } from 'src/features/lookup/spot/stores/spot-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useUserStore } from "src/features/user/stores/user-store";

const spotStore = useSpotStore();
const { hasPermission } = useUserStore()

const columns = [
    {
        name: 'name',
        field: 'name',
        label: 'Название',
        editable: true
    },
    // {
    //     name: 'isRoom',
    //     field: (row: any) => row.isRoom ? true : false,
    //     label: 'Помещение',
    //     editable: false,
    //     classes: 'view-checkbox'
    // }
];

const formFields = ref<Field[]>([
    {
        name: 'name',
        label: 'Название',
        type: 'text' as const,
        required: true,
    },
    // {
    //     name: 'isRoom',
    //     label: 'Является помещением',
    //     type: 'checkbox' as const,
    //     required: true,
    // }
])

onMounted(async () => {
    await spotStore.requestLookup()
})
</script>
