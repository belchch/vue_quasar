<template>
  <q-card class="row no-wrap" flat>
    <q-card-section class="row no-wrap full-width">
      <div :class="`col-9`">
        <DefectReportTextItem label="Недостаток" :value="row.defect" />
      </div>
      <div class="col-3">
        <DefectReportPhotos :use-photo-api="usePhoto" :photos="row.photos" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import DefectReportTextItem from 'src/features/defect/components/defect-report/DefectReportTextItem.vue'
import DefectReportPhotos from 'src/features/defect/components/defect-report/DefectReportPhotos.vue'
import { DefectReportRowModel } from 'src/features/defect/stores/defect-report-types'
import { useFinishingReportService } from 'src/features/defect/composables/finishing-report-service'

const props = defineProps<{
  row: DefectReportRowModel
}>()

const { usePhoto } = useFinishingReportService()
</script>
