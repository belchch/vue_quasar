<template>
  <q-card flat>
    <q-card-section>
      <div class="row justify-between">
        <div>
          <div class="text-h6">Техническое заключение</div>
          <div class="text-body2">
            Доступно в разделе «Осмотр» для привязки дефектов и фотографий
          </div>
        </div>
        <div class="q-gutter-sm">
          <div class="text-accent text-subtitle2">№ {{ technicalReport?.name }}</div>
          <div class="row justify-end" v-if="hasPermission(['technicalReport.update'])">
            <q-btn
              label="Удалить"
              color="negative"
              size="sm"
              icon="delete"
              @click="deleteTechnicalReport"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-table :columns="columns" :rows="rows" @row-click="onEditRow" flat bordered wrap-cells>
        <template v-if="hasPermission(['technicalReport.update'])" v-slot:top-left>
          <q-btn
            label="Добавить запись"
            class="q-mb-sm"
            size="sm"
            color="primary"
            icon="add"
            @click="openRowEditor()"
          />
        </template>
        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="{ 'no-event': !hasPermission(['technicalReport.update']) }"
            @click="onEditRow(props.rowIndex, props.row)"
            class="cursor-pointer"
          >
            <q-td key="documented" :props="props">
              {{ props.row.documented }}
            </q-td>
            <q-td key="standard" :props="props">
              <StandardMissmatch
                :one="props.row.standard as Standard"
                :another="findPhotoDocStandard(props.row.id)"
              />
              {{ `${props.row.standard?.name} ${props.row.standard?.description || ''}` }}
            </q-td>
            <q-td key="onSite" :props="props">
              {{ props.row.onSite }}
            </q-td>
            <q-td key="photo" :props="props">
              {{ props.row.photo?.length }}
            </q-td>
            <q-td key="actions">
              <q-btn
                v-if="hasPermission(['technicalReport.update'])"
                icon="delete"
                flat
                color="negative"
                size="sm"
                @click.stop="deleteRow(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <TechnicalReportRowEditor
    v-if="rowEditorOpen"
    :row-id="editedRowId"
    @close="onCloseEditor()"
    :technical-report-id="technicalReport!!.id"
  />
</template>
<script setup lang="ts">
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import { computed, ref } from 'vue'
import TechnicalReportRowEditor from 'src/features/defect/components/TechnicalReportRowEditor.vue'
import { storeToRefs } from 'pinia'
import { useTechnicalReportService } from 'src/features/defect/composables/technical-report'
import StandardMissmatch from 'src/features/defect/components/StandardMissmatch.vue'
import { usePhotoDocsStore } from 'src/features/inspection/store/photo-doc-store'
import { Standard } from 'src/features/lookup/standard/stores/types'
import { useUserStore } from 'src/features/user/stores/user-store'

const { technicalReport, rowEditorOpen } = storeToRefs(useTechnicalReportStore())
const { requestTechnicalReport, deleteTechnicalReport, deleteTechnicalReportRow } =
  useTechnicalReportService()
const { hasPermission } = useUserStore()
const photoDocStore = usePhotoDocsStore()

const findPhotoDocStandard = (rowId: number): Standard | undefined => {
  return photoDocStore.photoDocs.find((item) => item.defectInfo?.technicalReportRowId == rowId)
    ?.defectInfo?.defect?.standard
}

const openRowEditor = () => {
  rowEditorOpen.value = true
}

const editedRowId = ref<number>()

const onEditRow = (e: any, row: any) => {
  editedRowId.value = row.id
  rowEditorOpen.value = true
}

const onCloseEditor = async () => {
  editedRowId.value = undefined
  await requestTechnicalReport()
}

const deleteRow = async (row: any) => {
  await deleteTechnicalReportRow(row.id)
}

const rows = computed(
  () =>
    technicalReport.value?.rows?.map((item) => ({
      id: item.id,
      documented: item.description,
      standard: item.standard,
      onSite: item.photoDoc?.defectInfo?.defect?.template,
      photo: item.photoDoc?.urls,
      actions: null,
    })) || [],
)

const columns = [
  {
    name: 'documented',
    field: 'documented',
    label: 'Техническое заключение',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'standard',
    field: 'standard',
    label: 'Норматив',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'onSite',
    field: 'onSite',
    label: 'Натурный осмотр',
    sortable: true,
    align: 'left' as const,
  },
  { name: 'photo', field: 'photo', label: 'Фото', sortable: true, align: 'left' as const },
  { name: 'actions', field: 'action', label: '', sortable: false, align: 'right' as const },
]
</script>
<style scoped>
.no-event {
  cursor: default;
  pointer-events: none;
}
</style>
