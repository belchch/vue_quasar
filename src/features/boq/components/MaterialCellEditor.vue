<template>
    {{ value }}
    <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
        <q-input type="number" v-model="scope.value" dense autofocus />
    </q-popup-edit>
</template>
<script setup lang="ts">
import _ from 'lodash';
import { ref } from 'vue';
import { BoqRawMaterial } from '../api/types';
import { useBoqRawMaterialService } from '../composables/boq-material';

const { updateMaterial } = useBoqRawMaterialService()

const { field, value, row, canEdit = true } = defineProps<{
    field: string,
    value: number,
    row: BoqRawMaterial,
    canEdit?: boolean
}>()

const localValue = ref(value)

const updateValue = async () => {
    console.log("update material")
    const update = _.cloneDeep(row) as any
    update[field] = localValue.value
    await updateMaterial(update)
}
</script>