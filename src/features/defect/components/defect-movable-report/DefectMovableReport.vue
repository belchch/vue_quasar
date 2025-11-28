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
        <DownloadReportButton label="Скачать" :api-fn="buildDocx" :disable="!defectMovableReport" />
      </div>
    </div>

    <q-card flat style="background: #fafafa" class="q-pa-xs-none q-pa-sm-lg root-card">
      <q-card-section v-if="defectMovableReport" class="q-pa-none q-pa-sm-md">
        <draggable
          v-model="defectMovableReport.objects"
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
            <MovableReportItem
              :movable="element"
              class="drag-handle"
              :class="{ 'none-event': !hasPermission(['defectReport.update']) }"
            />
          </template>
        </draggable>
      </q-card-section>
      <q-card-section v-else>
        <div>Необходимо сформировать отчет</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import MovableReportItem from 'src/features/defect/components/defect-movable-report/MovableReportItem.vue'
import { useDefectMovableReportService } from 'src/features/defect/composables/defect-movable-report-service'
import { useDefectMovableReportStore } from 'src/features/defect/stores/defect-movable-report-store'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { ref } from 'vue'
import DownloadReportButton from 'src/components/DownloadReportButton.vue'
import { DefectMovableReportApi } from '../../api/defect-movable-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { useUserStore } from 'src/features/user/stores/user-store'

const { buildAndRequestMovableDefectReport, moveMovable } = useDefectMovableReportService()
const { defectMovableReport } = storeToRefs(useDefectMovableReportStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { hasPermission } = useUserStore()

const drag = ref(false)
const isBuilding = ref(false)

const buildDocx = async () => {
  const response = await DefectMovableReportApi.buildMovableDocx(selectedInspectionId.value!!)
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
.none-event {
  pointer-events: none;
}
</style>
