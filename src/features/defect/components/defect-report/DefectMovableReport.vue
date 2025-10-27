<template>
  <div class="q-gutter-md">
    <div class="row justify-between">
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
        <DownloadReportButton label="Скачать" :api-fn="buildDocx" :disable="!defectMovableReport" />
      </div>
    </div>

    <q-card flat style="background: #fafafa" class="q-pa-lg root-card">
      <q-card-section v-if="defectMovableReport">
        <draggable
          v-model="defectMovableReport.movables"
          item-key="id"
          tag="div"
          handle=".drag-handle"
          group="movables"
          @start="drag = true"
          @end="drag = false"
          @change="onDragChange"
          class="q-gutter-md"
        >
          <template #item="{ element }">
            <MovableReportItem :movable="element" class="drag-handle" />
          </template>
        </draggable>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import MovableReportItem from 'src/features/defect/components/defect-report/MovableReportItem.vue'
import { useDefectReportService } from 'src/features/defect/composables/defect-report-service'
import { useDefectReportStore } from 'src/features/defect/stores/defect-report-store'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { onMounted, ref } from 'vue'
import DownloadReportButton from 'src/components/DownloadReportButton.vue'
import { DefectReportApi } from '../../api/defect-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { useUserStore } from 'src/features/user/stores/user-store'

const { buildAndRequestMovableDefectReport, moveMovable } = useDefectReportService()
const { defectMovableReport } = storeToRefs(useDefectReportStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { hasPermission } = useUserStore()

const drag = ref(false)
const isBuilding = ref(false)

const buildDocx = async () => {
  const response = await DefectReportApi.builMovableDocx(selectedInspectionId.value!!)
  return response.data
}

const buildReport = async () => {
  isBuilding.value = true
  await buildAndRequestMovableDefectReport()
  isBuilding.value = false
}

const onDragChange = async (e: any) => {
  await moveMovable(e.moved.element.id, e.moved.oldIndex, e.moved.newIndex)
}
</script>
<style scoped lang="scss">
.root-card {
  overflow-y: scroll;
  height: calc(100vh - 320px);
}
</style>
