<template>
  <DefectComponent />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import DefectComponent from 'src/features/defect/components/DefectComponent.vue'
import { useDefectReportService } from 'src/features/defect/composables/defect-report-service'
import { useDefectMovableReportService } from 'src/features/defect/composables/defect-movable-report-service'
import { useFinishingReportService } from 'src/features/defect/composables/finishing-report-service'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { onMounted, watch } from 'vue'

const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { requestDefectReport } = useDefectReportService()
const { requestDefectMovableReport } = useDefectMovableReportService()
const { requestFinishingReport } = useFinishingReportService()

watch(selectedInspectionId, async () => {
  await requestDefectReport()
  await requestDefectMovableReport()
  await requestFinishingReport()
})

onMounted(async () => {
  await requestDefectReport()
  await requestDefectMovableReport()
  await requestFinishingReport()
})
</script>
