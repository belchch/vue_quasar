<template>
  <q-card class="q-pa-md">
    <q-tabs v-model="tab" no-caps active-color="primary" align="left">
      <q-tab v-if="showDefects" label="Дефекты" name="defects" class="defect-tab" />
      <q-tab v-if="showTechnicalReport" label="Техническое заключение" name="technicalReport" class="defect-tab" />
      <q-tab v-if="showDefectsReport" label="Отчет" name="defectReport" class="defect-tab" />
      <q-tab v-if="showMovableReport" label="Движимое имущество" name="defectMovableReport" class="defect-tab" />
      <q-tab v-if="showFinishingReport" label="Отделка" name="finishingReport" class="defect-tab" />
    </q-tabs>

    <q-tab-panels v-model="tab" class="full-width q-mt-md">
      <q-tab-panel name="defects" class="q-pt-none">
        <DefectContent />
      </q-tab-panel>
      <q-tab-panel name="technicalReport" class="q-pt-none">
        <TechnicalReportContent />
      </q-tab-panel>
      <q-tab-panel name="defectReport" class="q-pt-none">
        <DefectReport />
      </q-tab-panel>
      <q-tab-panel name="defectMovableReport" class="q-pt-none">
        <DefectMovableReport />
      </q-tab-panel>
      <q-tab-panel name="finishingReport" class="q-pt-none">
        <FinishingReport />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script setup lang="ts">
import { useExpertiseTypeService } from 'src/features/case/composables/expertise-type'
import DefectContent from 'src/features/defect/components/DefectContent.vue'
import TechnicalReportContent from 'src/features/defect/components/TechnicalReportContent.vue'
import DefectMovableReport from 'src/features/defect/components/defect-movable-report/DefectMovableReport.vue'
import DefectReport from 'src/features/defect/components/defect-report/DefectReport.vue'
import { ref } from 'vue'
import FinishingReport from './finishing-report/FinishingReport.vue'

const {
  showDefects,
  showDefectsReport,
  showTechnicalReport,
  showMovableReport,
  showFinishingReport
} = useExpertiseTypeService()

const tab = ref('defects')
</script>
<style scoped>
.defect-tab {
  text-align: left;
  justify-content: flex-start;
}
</style>
