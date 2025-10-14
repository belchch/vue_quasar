<template>
  <q-btn v-if="hasPermission(['inspection.update'])" square icon="edit" color="secondary" size="xs" outline
    @click="openDialog" />
  <q-dialog v-model="open" full-width full-height>
    <q-card class="column full-height q-pa-lg">
      <q-card-section class="row items-center q-pa-none">
        <q-tabs v-model="tab" dense active-color="primary" indicator-color="primary" align="left" narrow-indicator
          no-caps>
          <q-tab name="defect" label="Дефект" />
          <q-tab name="values" label="Значения шаблона" :disable="!valuesEnabled()" />
          <q-tab name="technicalReport" label="Техническое заключение" :disable="!technicalReport" />
        </q-tabs>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-tab-panels v-model="tab" class="col">
        <q-tab-panel name="defect">
          <DefectPickerDefect :defect-info="defectInfo" />
        </q-tab-panel>
        <q-tab-panel name="values">
          <DefectInfoPickerValues v-model:defect-value="defectValue" v-model:defect-cause="defectCause" />
        </q-tab-panel>
        <q-tab-panel name="technicalReport">
          <DefectInfoPickerTechnicalReport v-model="technicalReportRow" :photo-doc-id="photoDocId" />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Отмена" color="grey-8" v-close-popup />
        <q-btn flat label="ОК" @click="checkAndEmitChangeDefectInfo" />
      </q-card-actions>
      <q-inner-loading :showing="defectSearchService.isLoading" label="Загрузка..." label-style="font-size: 1.1em" />
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import DefectPickerDefect from 'src/features/inspection/components/photo-doc/DefectPickerDefect.vue'
import { PhotoDocDefectInfo } from 'src/features/inspection/store/types'
import { useDefectSearch } from 'src/features/inspection/store/defect-search-store'
import _ from 'lodash'
import DefectInfoPickerValues from 'src/features/inspection/components/photo-doc/DefectInfoPickerValues.vue'
import DefectInfoPickerTechnicalReport from 'src/features/inspection/components/photo-doc/DefectInfoPickerTechnicalReport.vue'
import { TechnicalReportRow } from 'src/features/defect/stores/types'
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/features/user/stores/user-store';

const props = defineProps<{
  photoDocId: number
  defectInfo: PhotoDocDefectInfo | undefined
}>()

const emit = defineEmits<{
  changeDefectInfo: [defectInfo: PhotoDocDefectInfo]
}>()
const $q = useQuasar();
const { technicalReport } = storeToRefs(useTechnicalReportStore())
const { hasPermission } = useUserStore()

const defectValue = ref<string | undefined>(props.defectInfo?.value)
const defectCause = ref<string | undefined>(props.defectInfo?.cause)

const technicalReportRowSelected = _.filter(technicalReport.value?.rows, {
  id: props.defectInfo?.technicalReportRowId,
}) as TechnicalReportRow[]

const technicalReportRow = ref<TechnicalReportRow[]>(technicalReportRowSelected || [])

const defectSearchService = useDefectSearch()
const tab = ref('defect')
const open = ref<boolean>(false)

const valuesEnabled = () => {
  const defects = defectSearchService.response.defects
  const first = _.first(defects)
  return defects.length == 1 && (first?.hasCause || first?.hasValue)
}

const openDialog = async () => {
  open.value = true
  await defectSearchService.search({
    structElemId: props.defectInfo?.structElem?.id,
    materialId: props.defectInfo?.material?.id,
    flawId: props.defectInfo?.flaw?.id,
    defectId: props.defectInfo?.defect?.id,
  })
}
const checkAndEmitChangeDefectInfo = () => {
  if (technicalReportRow.value.length==1 &&
      defectSearchService.response.structElems.length != 1
  ){
    $q.dialog({
      title: 'Внимание',
      message: 'Для того, чтобы запись попала в отчет необходимо выбрать поверхность',
    }).onOk(() => {
      tab.value = 'defect';
    });
    return;
  }
  if(technicalReportRow.value.length == 1 && defectSearchService.response.materials.length>1){
    $q.dialog({
      title: 'Внимание',
      message: 'Для того, чтобы запись попала в отчет необходимо выбрать материал',
    }).onOk(() => {
      tab.value = 'defect';
    });
    return;
  }
  emitChangeDefectInfo();

}
const emitChangeDefectInfo = () => {

  const ifSingle = <T,>(array: T[]) => {
    return array.length == 1 ? array[0] : undefined
  }

  console.log('rowId', _.first(technicalReportRow.value)?.id)

  const newDefectInfo = {
    structElem: ifSingle(defectSearchService.response.structElems),
    material: ifSingle(defectSearchService.response.materials),
    flaw: ifSingle(defectSearchService.response.flaws),
    defect: ifSingle(defectSearchService.response.defects),
    value: defectValue.value,
    cause: defectCause.value,
    technicalReportRowId: _.first(technicalReportRow.value)?.id,
  }
  open.value = false;
  emit('changeDefectInfo', newDefectInfo)
}
</script>

<style>
.tag-card {
  height: 180px;
}
</style>
