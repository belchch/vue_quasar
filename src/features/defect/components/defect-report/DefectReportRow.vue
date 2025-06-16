<template>
  <q-card class="row no-wrap" flat>
    <q-card-section class="row no-wrap full-width">
      <div v-if="showTechnicalReport" class="col-2">
        <DefectReportTextItem label="Техническое заключение" :value="row.technicalReport" />
      </div>
      <div :class="`col-${defectSpan}`">
        <DefectReportTextItem label="Натурный осмотр" :value="row.defect" />
      </div>
      <div :class="`col-${standardSpan}`">
        <DefectReportTextItem label="Норматив" :value="row.standard" />
      </div>
      <div class="col-3">
        <DefectReportPhotos :photos="row.photos" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import DefectReportTextItem from 'src/features/defect/components/defect-report/DefectReportTextItem.vue'
import DefectReportPhotos from 'src/features/defect/components/defect-report/DefectReportPhotos.vue'
import { DefectReportRowModel } from 'src/features/defect/stores/defect-report-types'

const props = defineProps<{
  showTechnicalReport: boolean,
  row: DefectReportRowModel
}>()

const defectSpan = props.showTechnicalReport ? 3 : 4
const standardSpan = props.showTechnicalReport ? 4 : 5
</script>
