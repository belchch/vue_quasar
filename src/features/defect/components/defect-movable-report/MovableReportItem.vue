<template>
  <q-card flat bordered>
    <q-expansion-item
      :label="movable.text"
      header-class="text-center text-weight-bolder"
      default-opened
    >
      <q-card flat>
        <div
          style="background: #fafafa"
          :style="{ 'pointer-events': hasPermission(['defectReport.update']) ? 'auto' : 'none' }"
        >
          <draggable
            v-model="rows"
            item-key="id"
            tag="div"
            handle=".drag-handle"
            :group="`movable-${movable.id}`"
            @change="onDragChange"
            class="q-gutter-md"
          >
            <template #item="{ element }">
              <MovableElemReportItem :row="element" class="drag-handle" />
            </template>
          </draggable>
        </div>
      </q-card>
    </q-expansion-item>
  </q-card>
</template>
<script setup lang="ts">
import MovableElemReportItem from 'src/features/defect/components/defect-movable-report/MovableElemReportItem.vue'
import { DefectMovableModel } from 'src/features/defect/stores/defect-movable-report-types'
import draggable from 'vuedraggable'
import { ref } from 'vue'
import { useDefectMovableReportService } from 'src/features/defect/composables/defect-movable-report-service'
import { useUserStore } from 'src/features/user/stores/user-store'

const { moveMovableRow } = useDefectMovableReportService()
const { hasPermission } = useUserStore()

const props = defineProps<{
  movable: DefectMovableModel
}>()

const rows = ref(props.movable.rows)

const onDragChange = async (e: any) => {
  await moveMovableRow(e.moved.element.id, e.moved.oldIndex, e.moved.newIndex)
}
</script>
<style></style>
