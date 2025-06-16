<template>
  <q-card flat class="q-pa-md">
    <q-card flat>
    <q-card-section>
      <q-btn label="Сформировать отчет" @click="buildReport" color="primary"/>
    </q-card-section>
  </q-card>
  <q-splitter
    v-model="split"
  >
    <template v-slot:before>
      <div class="split-pane report q-mr-md q-pa-md">
        <GeneralViewReport/>
      </div>
    </template>
    <template v-slot:after>
      <div class="split-pane">
        <GeneralViewGallery/>
      </div>
    </template>
  </q-splitter>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import GeneralViewGallery from './GeneralViewGallery.vue';
import GeneralViewReport from './GeneralViewReport.vue';
import { useGeneralViewReportService } from '../composables/general-view';

const { buildGeneralViewReport, requestGeneralViewReport } = useGeneralViewReportService()

const split = ref(60)

const buildReport = async () => {
    await buildGeneralViewReport()
    await requestGeneralViewReport()
}
</script>
<style scoped>
.split-pane {
  height: 72vh;
  overflow: auto;
}

.report {
    background: #fafafa
}
</style>