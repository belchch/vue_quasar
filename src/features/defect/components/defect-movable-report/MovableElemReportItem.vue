<template>
  <q-card class="row no-wrap" flat>
    <q-card-section class="row full-width" :class="$q.screen.gt.xs ? 'no-wrap' : ''">
      <div class="col-sm-4 col-xs-12">
        <DefectReportTextItem label="Описание" :value="row.defect" />
      </div>
      <div class="col-sm-4 col-xs-12">
        <DefectReportTextItem label="Размеры" :value="row.measurements" />
      </div>
      <div class="col-sm-4 col-xs-12">
        <DefectReportPhotos :use-photo-api="usePhoto" :photos="row.photos" />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { DefectMovableItemRowModel } from 'src/features/defect/stores/defect-movable-report-types'
import DefectReportTextItem from 'src/features/defect/components/defect-report/DefectReportTextItem.vue'
import DefectReportPhotos from 'src/features/defect/components/defect-report/DefectReportPhotos.vue'
import { useDefectMovableReportService } from 'src/features/defect/composables/defect-movable-report-service'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const props = defineProps<{
  row: DefectMovableItemRowModel
}>()
const { usePhoto } = useDefectMovableReportService()
</script>
<style></style>
