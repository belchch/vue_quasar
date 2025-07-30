<template>
  <q-separator class="q-mb-xs q-mt-md" />

  <q-card flat class="border-cyan-6">
    <div class="row items-center text-grey-8">
      <div v-if="technicalReport">
        <div v-if="defectInfo?.technicalReportRowId">
          <template v-if="isConsistency">
            <q-icon name="link" color="green-8">
              <q-tooltip v-if="technicalReport">
                {{ technicalReportItem?.description }}
                <br>
                {{ technicalReportItem?.standard?.name }}
              </q-tooltip>
            </q-icon>
          </template>
          <template v-else>
            <q-icon name="error" size="'lg'" color="red">
              <q-tooltip>
                Несоответствие с техническим заключением
                <br>
                <span class="text-italic">{{ technicalReportItem?.description }}</span>
                <br>
                {{ technicalReportItem?.standard?.name }}
              </q-tooltip>
            </q-icon>
          </template>
        </div>
        <div v-else>
          <q-icon name="link_off">
            <q-tooltip>
              Дефект не привязан к техническому заключению
            </q-tooltip>
          </q-icon>
        </div>

      </div>
      <q-icon name="home_repair_service" class="q-ml-sm text-grey-8" />
      <div class="text-caption text-grey-8">
        &nbsp;&nbsp;&nbsp;{{truncatedStandard}}
        <q-tooltip :delay="500">
          {{ defectInfo?.defect?.standard?.description }}
        </q-tooltip>
      </div>
      <q-space />
      <DefectInfoPicker :photo-doc-id="photoDocId" :defect-info="defectInfo"
        @changeDefectInfo="(value) => emit('changeDefectInfo', value)" />
    </div>

    <div class="q-mt-sm">
      <DefectAttribute v-if="defectInfo?.structElem" :name="defectInfo?.structElem?.name" type="structElem" />
      <DefectAttribute v-if="defectInfo?.material" :name="defectInfo?.material?.name" type="material" />
      <DefectAttribute v-if="defectInfo?.flaw" :name="defectInfo?.flaw?.name" type="flaw" />
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import DefectInfoPicker from 'src/features/inspection/components/photo-doc/DefectInfoPicker.vue'
import { PhotoDocDefectInfo } from 'src/features/inspection/store/types'
import DefectAttribute from "src/features/inspection/components/photo-doc/DefectAttribute.vue";
import {computed} from "vue";
import _ from 'lodash';

const props = defineProps<{
  photoDocId: number,
  defectInfo: PhotoDocDefectInfo | undefined
}>()

const { technicalReport } = useTechnicalReportStore()

const emit = defineEmits<{
  changeDefectInfo: [defectInfo: PhotoDocDefectInfo]
}>()

const truncatedStandard = computed(() => _.truncate(props.defectInfo?.defect?.standard?.name, {length: 25}))

const technicalReportItem = computed(() => {

  const rowReport = technicalReport?.rows.find((item) => item.id === props.defectInfo?.technicalReportRowId);
  console.log(props.defectInfo?.defect?.standard?.id, rowReport);
  return rowReport;
    // if (rowReport) { return rowReport.description; }
});

const isConsistency = computed (() => {
  const rowReport = technicalReport?.rows.find((item) => item.id === props.defectInfo?.technicalReportRowId);
  if(!rowReport) return false;
  return props.defectInfo?.defect?.standard?.id === rowReport?.standard?.id;
});

</script>
