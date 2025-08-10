<template>
    <DefectComponent/>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import DefectComponent from 'src/features/defect/components/DefectComponent.vue';
import { useDefectReportService } from 'src/features/defect/composables/defect-report-service';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { watch } from 'vue';

const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { requestDefectReport } = useDefectReportService()

watch(selectedInspectionId, async () => {
    await requestDefectReport()
})
</script>