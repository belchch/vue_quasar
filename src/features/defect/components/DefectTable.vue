<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="rowKey"
    selection="single"
    wrap-cells
    flat bordered
    :pagination="{rowsPerPage: 20}"
  >
    <template v-slot:top-left>
      <q-toggle v-model="showTechnicalReport" label="Техническое заклчение" color="secondary"/>
      <q-toggle v-model="showInspection" label="Натурный осмотр" color="secondary"/>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="xs"
            flat
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'"
            sor
          />
        </q-td>
        <q-td key="location" :props="props">
          {{ props.row.spot?.name }}
        </q-td>
        <q-td key="technicalReport" :props="props">
          {{ props.row.trRow?.description }}
        </q-td>
        <q-td key="structElem">
          {{ props.row.defect.structElem?.name }}
        </q-td>
        <q-td key="defect" :props="props">
          {{ props.row.defect.description }}
        </q-td>
        <q-td key="standard" :props="props">
          <StandardMissmatch
            :one="props.row.defect.defect?.standard"
            :another="props.row.trRow?.standard"
          />
          {{ standardDescription(props.row) }}
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">
            <DefectTablePhotos :urls="props.row.photos" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script setup lang="ts">
import { PhotoDoc, PhotoDocDefectInfo } from 'src/features/inspection/store/types'
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import {computed, ref} from 'vue'
import { storeToRefs } from 'pinia'
import { TechnicalReportRow } from 'src/features/defect/stores/types'
import StandardMissmatch from 'src/features/defect/components/StandardMissmatch.vue'
import { Spot } from 'src/features/lookup/spot/stores/types'
import DefectTablePhotos from 'src/features/defect/components/DefectTablePhotos.vue'
import { fieldComparator } from 'src/common/table'


const { technicalReport } = storeToRefs(useTechnicalReportStore())

const props = defineProps<{
  defects: PhotoDoc[]
}>()

const showTechnicalReport = ref(true)
const showInspection = ref(true)

const standardDescription = (row: any) => {
  const standard = row.defect.defect?.standard || row.trRow?.standard
  return standard ? `${standard?.name} ${standard?.description || ''}` : ''
}

const findTrRow = (defect: PhotoDocDefectInfo): TechnicalReportRow | undefined => {
  return technicalReport.value?.rows?.find((row) => row.id == defect.technicalReportRowId)
}

const rows = computed<TableRow[]>(() => {
  return props.defects.map((defect) => ({
    rowKey: defect.id!!,
    spot: defect.spot,
    defect: defect.defectInfo!!,
    trRow: findTrRow(defect.defectInfo!!),
    photos: defect.urls,
  }))
      .filter(item => showInspection.value || (!item.defect.defect || item.trRow) )
      .filter(item => showTechnicalReport.value || (!item.trRow || item.defect.defect) )
})

const columns = [
  {
    name: 'location',
    field: (row: TableRow) => row.spot?.name,
    label: 'Локация',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'technicalReport',
    field: (row: TableRow) => row.trRow?.description,
    label: 'Техническое заключение',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'structElem',
    field: (row: TableRow) => row.defect.structElem?.name,
    label: 'Поверхность',
    sortable: true,
    align: 'left' as const,
  },
  { name: 'defect', field: (row: TableRow) => row.defect.description, label: 'Недостаток', sortable: true, align: 'left' as const },
  {
    name: 'standard',
    label: 'Нормотив',
    field: (row: TableRow) => row,
    sortable: true,
    align: 'left' as const,
    sort: (a: TableRow, b: TableRow) => {
      return standardDescription(a).localeCompare(standardDescription(b))
    }
  },
]

type TableRow = {
  rowKey: number
  spot: Spot | undefined
  defect: PhotoDocDefectInfo
  trRow: TechnicalReportRow | undefined
}
</script>
