<template>
  <q-card class="q-pa-sm">
    <q-card flat>
      <div class="row justify-between">
        <q-card-section>
          <q-btn v-if="hasPermission(['generalViewReport.update'])" label="Сформировать отчет" @click="confirmOpen = true" color="primary" :loading="isBuilding"/>
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
  <GeneralViewFormatConfirmDialog v-model:open="confirmOpen" v-model:format="format" @confirm="buildReport"/>
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
import GeneralViewFormatConfirmDialog from './GeneralViewFormatConfirmDialog.vue';
import { ReportFormat } from '../api/types';
import { useUserStore } from "src/features/user/stores/user-store";

const { buildGeneralViewReport, requestGeneralViewReport } = useGeneralViewReportService()
const { requestGallery } = useGeneralViewGalleryService()
const { generalViewReport } = storeToRefs(useGeneralViewReportStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { hasPermission } = useUserStore()

const split = ref(65)
const isBuilding = ref(false)

const confirmOpen = ref<boolean>(false)
const format = ref<ReportFormat>('SINGLE_SPOT_ROW')

const buildDocx = async () => {
  const response = await GeneralViewReportApi.buildDocx(selectedInspectionId.value!!)
  return response.data
}

const buildReport = async () => {
  confirmOpen.value = false
  isBuilding.value = true
  await buildGeneralViewReport(format.value)
  await requestGeneralViewReport()
  await requestGallery()
  isBuilding.value = false
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
