<template>
  <q-dialog v-model="rowEditorOpen" style="width: 600px">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 80vw">
      <div class="text-h6">Запись технического заключения</div>
      <q-card-section class="q-mt-lg">
        <div style="width: 700px">
          <q-form @submit="onSubmit()" @reset="onReset" class="q-gutter-lg" ref="form">
            <q-input
              dense
              outlined
              v-model="documented"
              label="Описание"
              hint="Описание из тех. заключения"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
            />

            <q-select
              dense
              outlined
              v-model="standardOption"
              :options="standardOptions"
              label="ГОСТ"
              menu-self="center right"
              @filter="filterStandards"
              use-input
              input-debounce="0"
              fill-input
              hide-selected
              behavior="dialog"
              hint="Справочник нормативов"
              :rules="[(val) => !_.isEmpty(val) || 'Обязательное поле']"
            />

            <div style="width: 800px" class="q-pt-lg">
              <TechnicalReportDefectTable
                :rows="candidatePhotoDocs"
                v-model:selected="photoDocId"
              >
                <template v-slot:after-header>
                  <StandardMissmatch
                    :one="standard"
                    :another="photoDoc?.defectInfo?.defect?.standard"
                  />
                </template>
              </TechnicalReportDefectTable>
            </div>

            <div>
              <q-btn label="Сохранить" :loading="creating" type="submit" color="primary" />
              <q-btn label="Отмена" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import { computed, ref } from 'vue'
import { useStandardStore } from 'src/features/lookup/standard/stores/standard-store'
import _ from 'lodash'
import { Standard } from 'src/features/lookup/standard/stores/types'
import { QForm } from 'quasar'
import { usePhotoDocsStore } from 'src/features/inspection/store/photo-doc-store'
import TechnicalReportDefectTable from 'src/features/defect/components/TechnicalReportDefectTable.vue'
import { DefectAttributeType } from 'src/features/inspection/components/photo-doc/DefectAttribute.vue'
import { useTechnicalReportService } from 'src/features/defect/composables/technical-report'
import { usePhotoDocs } from 'src/features/inspection/composables/photo-doc'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'
import StandardMissmatch from "src/features/defect/components/StandardMissmatch.vue";

const { rowEditorOpen } = storeToRefs(useTechnicalReportStore())
const { updateTechnicalReportRow } = useTechnicalReportService()
const standardStore = useStandardStore()
const technicalReportStore = useTechnicalReportStore()
const photoDocStore = usePhotoDocsStore()
const photoDocService = usePhotoDocs()
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { refreshPhotoDocs } = useSelectedInspection()
const form = ref<QForm>()
const creating = ref(false)

const props = defineProps<{
  rowId: number | undefined
  technicalReportId: number
}>()

const emits = defineEmits<{
  close: []
}>()

type SelectOption = {
  label: string
  value: number
}

const standardFilter = ref<string>('')
const standardLabel = (standard: Standard) => `${standard.name} ${standard.description || ''}`

const standardToOption = (item: Standard) => ({
  label: standardLabel(item),
  value: item.id!!,
})

const standardOptions = computed(() =>
  standardStore.items
    .filter((item) =>
      standardLabel(item).toLocaleLowerCase().includes(standardFilter.value.toLocaleLowerCase()),
    )
    .map(standardToOption),
)

const filterStandards = (val: any, update: any) => {
  update(() => {
    standardFilter.value = val
  })
}

const row =
  props.rowId != undefined
    ? _.find(technicalReportStore.technicalReport?.rows, { id: props.rowId })
    : undefined
const documented = ref<string | undefined>(row?.description)
const standardOption = ref<SelectOption | undefined>(row?.standard && standardToOption(row?.standard))

const standard = computed(() => {
  return standardStore.items.find(item => item.id == standardOption.value?.value)
})

const photoDocId = ref<number | undefined>(row?.photoDoc?.id)

const photoDoc = computed(() => {
  return photoDocStore.photoDocs.find(item => item.id == photoDocId.value)
})

const candidatePhotoDocs = computed(() => {
  if (standardOption.value) {
    return photoDocStore.photoDocs
      .filter((photoDoc) => {
        console.log('filter',  photoDoc.defectInfo?.technicalReportRowId, props.rowId)
        return photoDoc.defectInfo?.defect?.standard?.id == standardOption.value?.value ||
          (photoDoc.defectInfo?.technicalReportRowId == props.rowId && !!props.rowId)
      })
      .map((item) => ({
        photoDocId: item.id!!,
        location: item.spot?.name,
        defect: item.defectInfo?.defect?.template,
        attributes: [
          {
            name: item.defectInfo?.structElem?.name,
            type: 'structElem' as DefectAttributeType,
          },
          {
            name: item.defectInfo?.material?.name,
            type: 'material' as DefectAttributeType,
          },
          {
            name: item.defectInfo?.flaw?.name,
            type: 'flaw' as DefectAttributeType,
          },
        ].filter((item) => !!item.name),
      }))
  } else {
    return []
  }
})

const cleanAndClose = () => {
  standardOption.value = undefined
  documented.value = undefined
  rowEditorOpen.value = false
  emits('close')
}

//TODO - refactor двусторонняя связь
const onSubmit = async () => {
  creating.value = true
  await form.value?.validate()

  await updateTechnicalReportRow({
    id: props.rowId,
    description: documented.value!!,
    standardId: standardOption.value!!.value,
    photoDocId: photoDocId.value,
    technicalReportId: props.technicalReportId,
  })

  if (!photoDocId.value) {
    console.log('if')
    console.log('store', photoDocStore.photoDocs)

    const photoDoc = _.find(
      photoDocStore.photoDocs,
      (item) => item.defectInfo?.technicalReportRowId == props.rowId,
    )

    if (photoDoc && photoDoc.defectInfo) {
      const update = _.cloneDeep(photoDoc)
      update.defectInfo!!.technicalReportRowId = undefined
      await photoDocService.updatePhotoDoc(selectedInspectionId.value!!, update)
    }
  }

  await refreshPhotoDocs()

  cleanAndClose()
  creating.value = false
}
const onReset = () => {
  form.value?.resetValidation()
  cleanAndClose()
}
</script>
