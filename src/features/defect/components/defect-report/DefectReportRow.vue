<template>
  <q-card class="row no-wrap" flat>
    <q-card-section class="row full-width" :class="$q.screen.gt.xs ? 'no-wrap' : ''">
      <div v-if="showTechnicalReport" class="col-sm-2 col-xs-12">
        <DefectReportTextItem label="Техническое заключение" :value="row.technicalReport" />
      </div>
      <div :class="`col-sm-${defectSpan}`" class="col-xs-12">
        <DefectReportTextItem label="Натурный осмотр" :value="row.defect" />
      </div>
      <div :class="`col-sm-${standardSpan}`" class="col-xs-12">
        <DefectReportTextItem label="Норматив" :value="row.standard" />
      </div>
      <div class="col-sm-3 col-xs-12">
        <DefectReportPhotos :use-photo-api="usePhoto" :photos="row.photos" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import DefectReportTextItem from 'src/features/defect/components/defect-report/DefectReportTextItem.vue'
import DefectReportPhotos from 'src/features/defect/components/defect-report/DefectReportPhotos.vue'
import { DefectReportRowModel } from 'src/features/defect/stores/defect-report-types'
import { useDefectReportService } from 'src/features/defect/composables/defect-report-service'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const props = defineProps<{
  showTechnicalReport: boolean
  row: DefectReportRowModel
}>()

const { usePhoto } = useDefectReportService()

const defectSpan = props.showTechnicalReport ? 3 : 4
const standardSpan = props.showTechnicalReport ? 4 : 5
</script>
