<template>
  <q-card class="q-pa-md">
    <q-tabs v-model="tab" no-caps active-color="primary" align="left">
      <q-tab label="Дефекты" name="defects" class="defect-tab" />
      <q-tab label="Техническое заключение" name="technicalReport" class="defect-tab" />
      <q-tab label="Отчет" name="defectReport" class="defect-tab" />
      <q-tab label="Движимое имущество" name="defectMovableReport" class="defect-tab" />
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
    </q-tab-panels>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TechnicalReportContent from 'src/features/defect/components/TechnicalReportContent.vue'
import DefectContent from 'src/features/defect/components/DefectContent.vue'
import DefectReport from 'src/features/defect/components/defect-report/DefectReport.vue'
import DefectMovableReport from 'src/features/defect/components/defect-movable-report/DefectMovableReport.vue'
const tab = ref('defects')
</script>
<style scoped>
.defect-tab {
  text-align: left;
  justify-content: flex-start;
}
</style>
