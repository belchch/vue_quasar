<template>
  <q-card flat class="q-pa-md">
    <q-card flat>
      <div class="row justify-between">
        <q-card-section>
          <q-btn label="Сформировать отчет" @click="buildReport" color="primary" />
        </q-card-section>
        <DownloadReportButton label="Скачать" :api-fn="buildDocx" :disable="!generalViewReport" />        
      </div>
    </q-card>
    <q-splitter v-model="split">
      <template v-slot:before>
        <div class="split-pane report q-mr-md q-pa-md">
          <GeneralViewReport />
        </div>
      </template>
      <template v-slot:after>
        <div class="split-pane">
          <GeneralViewGallery />
        </div>
      </template>
    </q-splitter>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import GeneralViewGallery from './GeneralViewGallery.vue';
import GeneralViewReport from './GeneralViewReport.vue';
import DownloadReportButton from 'src/components/DownloadReportButton.vue';
import { useGeneralViewReportService } from '../composables/general-view';
import { useGeneralViewGalleryService } from '../composables/gallery';
import { storeToRefs } from 'pinia';
import { useGeneralViewReportStore } from '../store/general-view-store';
import { GeneralViewReportApi } from '../api/general-view-report-api';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';

const { buildGeneralViewReport, requestGeneralViewReport } = useGeneralViewReportService()
const { requestGallery } = useGeneralViewGalleryService()
const { generalViewReport } = storeToRefs(useGeneralViewReportStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())

const split = ref(60)

const buildDocx = async () => {
  const response = await GeneralViewReportApi.buildDocx(selectedInspectionId.value!!)
  return response.data
}

const buildReport = async () => {
  await buildGeneralViewReport()
  await requestGeneralViewReport()
  await requestGallery()
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