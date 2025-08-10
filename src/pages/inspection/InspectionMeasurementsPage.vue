<template>
    <MeasurementComponent/>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import MeasurementComponent from 'src/features/measurement/components/MeasurementComponent.vue';
import { useMeasurementService } from 'src/features/measurement/composables/measurement';
import { usePlanTreeService } from 'src/features/measurement/composables/plan-tree';
import { watch } from 'vue';

const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { requestMeasurements } = useMeasurementService()
const { requestPlanTree } = usePlanTreeService()

watch(selectedInspectionId, async () => {
    await requestMeasurements()
    await requestPlanTree()
})
</script>