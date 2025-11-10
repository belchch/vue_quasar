<template>
  <q-card flat class="q-mt-md">
    <q-expansion-item
      :label="structElem.text"
      header-class="text-center text-weight-bolder"
      default-opened
    >
      <q-card-section>
        <draggable
          v-model="rows"
          item-key="id"
          tag="div"
          handle=".drag-handle"
          :group="`rows-${structElem.id}`"
          @change="onDragChange"
          class="q-gutter-md"
        >
          <template #item="{ element }">
            <DefectReportRow :row="element" class="drag-handle" />
          </template>
        </draggable>
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>
<script setup lang="ts">
import { DefectReportStructElemModel } from 'src/features/defect/stores/defect-report-types'
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useFinishingReportService } from 'src/features/defect/composables/finishing-report-service'
import DefectReportRow from './DefectReportRow.vue'

const { moveRow } = useFinishingReportService()

const props = defineProps<{
  structElem: DefectReportStructElemModel
}>()

const onDragChange = async (e: any) => {
  await moveRow(e.moved.element.id, e.moved.oldIndex, e.moved.newIndex)
}

const rows = ref(props.structElem.rows)
</script>
<style></style>
