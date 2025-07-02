<template>
  <q-card flat bordered>
    <q-expansion-item
      :label="location.text"
      header-class="text-center text-weight-bolder"
      default-opened
    >
      <q-card flat>
        <div style="background: #fafafa" :style="{ 'pointer-events': hasPermission(['defectReport.update']) ? 'auto' : 'none' }">
          <draggable
            v-model="structElems"
            item-key="id"
            tag="div"
            handle=".drag-handle"
            :group="`structElems-${location.id}`"
            @change="onDragChange"
            class="q-gutter-md"
          >
            <template #item="{ element }">
              <StructElemReportItem :struct-elem="element" :show-technical-report="showTechnicalReport" class="drag-handle"/>
            </template>
          </draggable>
        </div>
      </q-card>
    </q-expansion-item>
  </q-card>
</template>
<script setup lang="ts">
import StructElemReportItem from "src/features/defect/components/defect-report/StructElemReportItem.vue";
import {DefectReportSpotModel} from "src/features/defect/stores/defect-report-types";
import draggable from "vuedraggable";
import {ref} from 'vue'
import {useDefectReportService} from "src/features/defect/composables/defect-report-service";
import { useUserStore } from "src/features/user/stores/user-store";

const {moveStructElem} = useDefectReportService()
const { hasPermission } = useUserStore()

const props = defineProps<{
  showTechnicalReport: boolean
  location: DefectReportSpotModel
}>()

const structElems = ref(props.location.structElems)

const onDragChange = async (e: any) => {
  await moveStructElem(e.moved.element.id, e.moved.oldIndex, e.moved.newIndex)
}
</script>
<style>
</style>
