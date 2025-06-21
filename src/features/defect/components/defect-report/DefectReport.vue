<template>
  <div class="q-gutter-md">
    <div class="row justify-between">
      <div class="row">
        <q-btn label="Сформировать отчет" color="primary" @click="buildReport()" />
        <q-checkbox v-if="technicalReport" v-model="useTechnicalReport" color="primary" label="Техническое заключение">
        </q-checkbox>
      </div>
      <div>
        <DownloadReportButton label="Скачать" :api-fn="buildDocx" :disable="!defectReport"/>
      </div>
    </div>

    <q-card flat style="background: #fafafa" class="q-pa-lg root-card">
      <q-card-section v-if="defectReport">
        <draggable v-model="defectReport.spots" item-key="id" tag="div" handle=".drag-handle" group="locations"
          @start="drag = true" @end="drag = false" @change="onDragChange" class="q-gutter-md">
          <template #item="{ element }">
            <LocationReportItem :location="element" :show-technical-report="defectReport.useTechnicalReport"
              class="drag-handle" />
          </template>
        </draggable>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import LocationReportItem from 'src/features/defect/components/defect-report/LocationReportItem.vue'
import { useDefectReportService } from 'src/features/defect/composables/defect-report-service'
import { useDefectReportStore } from 'src/features/defect/stores/defect-report-store'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { onMounted, ref } from 'vue'
import { useTechnicalReportStore } from "src/features/defect/stores/technical-report-store";
import DownloadReportButton from 'src/components/DownloadReportButton.vue'
import { DefectReportApi } from '../../api/defect-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'

const { buildAndRequestDefectReport, requestDefectReport, moveSpot } = useDefectReportService()
const { defectReport } = storeToRefs(useDefectReportStore())
const { technicalReport } = storeToRefs(useTechnicalReportStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())

const drag = ref(false)
const useTechnicalReport = ref(!!technicalReport.value)

const buildDocx = async () => {
  const response = await DefectReportApi.buildDocx(selectedInspectionId.value!!)
  return response.data
}

const buildReport = async () => {
  await buildAndRequestDefectReport(useTechnicalReport.value)
}

const onDragChange = async (e: any) => {
  await moveSpot(e.moved.element.id, e.moved.oldIndex, e.moved.newIndex)
}

onMounted(async () => {
  await requestDefectReport()
})
</script>
<style scoped lang="scss">
.root-card {
  overflow-y: scroll;
  height: 75vh;
}
</style>
