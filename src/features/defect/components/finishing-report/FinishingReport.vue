<template>
  <div class="q-gutter-md">
    <div class="row justify-between q-gutter-y-sm">
      <div>
        <div class="row" v-if="hasPermission(['defectReport.update'])">
          <q-btn
            label="Сформировать отчет"
            color="primary"
            @click="buildReport()"
            :loading="isBuilding"
          />
        </div>
      </div>
      <div>
        <DownloadReportButton label="Скачать" :api-fn="buildDocx" :disable="!finishingReport" />
      </div>
    </div>

    <q-card flat style="background: #fafafa" class="q-pa-xs-none q-pa-sm-lg root-card">
      <q-card-section
        v-if="finishingReport"
        :class="{ 'none-event': !hasPermission(['defectReport.update']) }"
      >
        <draggable
          v-model="finishingReport.spots"
          item-key="id"
          tag="div"
          handle=".drag-handle"
          group="locations"
          @start="drag = true"
          @end="drag = false"
          @change="onDragChange"
          class="q-gutter-md"
        >
          <template #item="{ element }">
            <LocationReportItem :location="element" class="drag-handle" />
          </template>
        </draggable>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { useFinishingReportService } from 'src/features/defect/composables/finishing-report-service'
import { useFinishingReportStore } from 'src/features/defect/stores/finishing-report-store'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { onMounted, ref } from 'vue'
import DownloadReportButton from 'src/components/DownloadReportButton.vue'
import { FinishingReportApi } from '../../api/finishing-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { useUserStore } from 'src/features/user/stores/user-store'
import LocationReportItem from './LocationReportItem.vue'

const { buildAndRequestReport, moveSpot } = useFinishingReportService()
const { finishingReport } = storeToRefs(useFinishingReportStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { hasPermission } = useUserStore()

const drag = ref(false)
const isBuilding = ref(false)

const buildDocx = async () => {
  const response = await FinishingReportApi.buildDocx(selectedInspectionId.value!!)
  return response.data
}

const buildReport = async () => {
  isBuilding.value = true
  await buildAndRequestReport()
  isBuilding.value = false
}

const onDragChange = async (e: any) => {
  await moveSpot(e.moved.element.id, e.moved.oldIndex, e.moved.newIndex)
}
</script>
<style scoped lang="scss">
.root-card {
  overflow-y: scroll;
  height: 75vh;
}
.none-event {
  pointer-events: none;
}
</style>
