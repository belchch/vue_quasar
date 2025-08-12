<template>
  <q-card flat>
    <TechnicalReportEditor v-if="technicalReport" />
    <TechnicalReportEmpty v-else />
  </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import TechnicalReportEditor from 'src/features/defect/components/TechnicalReportEditor.vue'
import TechnicalReportEmpty from 'src/features/defect/components/TechnicalReportEmpty.vue'
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'

const { technicalReport } = storeToRefs(useTechnicalReportStore())

</script>
