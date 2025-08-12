<template>
    {{ value }}
    <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
        <q-input type="number" v-model="scope.value" dense autofocus />
    </q-popup-edit>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import _ from 'lodash';
import { useBoqService } from '../composables/boq';
import { BoqWork, toWorkUpdateRequest } from '../api/types';
import { BoqWorkApi } from '../api/boq-work-api';
import { useBoqWorkStore } from '../stores/boq-work-store';
import { useBoqWorkService } from '../composables/boq-work';

const { updateWork } = useBoqWorkService()

const { field, value, row, canEdit = true } = defineProps<{
    field: string,
    value: number,
    row: BoqWork,
    canEdit?: boolean
}>()

const localValue = ref(value)

const updateValue = async () => {
    const update = _.cloneDeep(row) as any
    update[field] = localValue.value
    await updateWork(update)
}
</script>