<template>
  <q-card class="row no-wrap" flat>
    <q-card-section class="row no-wrap full-width">
      <div class="col-4">
        <DefectReportTextItem label="Описание" :value="row.defect" />
      </div>
      <div class="col-4">
        <DefectReportTextItem label="Размеры" :value="row.measurements" />
      </div>
      <div class="col-4">
        <DefectReportPhotos :photos="row.photos" />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { DefectMovableItemRowModel } from 'src/features/defect/stores/defect-report-types'
import DefectReportTextItem from 'src/features/defect/components/defect-report/DefectReportTextItem.vue'
import DefectReportPhotos from 'src/features/defect/components/defect-report/DefectReportPhotos.vue'
const props = defineProps<{
  row: DefectMovableItemRowModel
}>()
</script>
<style></style>
