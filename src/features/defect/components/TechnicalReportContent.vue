<template>
  <q-card flat>
    <TechnicalReportEditor v-if="technicalReport" />
    <TechnicalReportEmpty v-else />
  </q-card>
</template>
<script setup lang="ts">
import TechnicalReportEmpty from 'src/features/defect/components/TechnicalReportEmpty.vue'
import { storeToRefs } from 'pinia'
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import TechnicalReportEditor from 'src/features/defect/components/TechnicalReportEditor.vue'
import { onMounted } from 'vue'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { usePhotoDocs } from 'src/features/inspection/composables/photo-doc'
import { useStandardStore } from 'src/features/lookup/standard/stores/standard-store'
import { useTechnicalReportService } from 'src/features/defect/composables/technical-report'

const { technicalReport } = storeToRefs(useTechnicalReportStore())

</script>
