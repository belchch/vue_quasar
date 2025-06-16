<template>
  <q-table
    :columns="columns"
    :rows="unusedRows || []"
    flat
    bordered
    selection="single"
    v-model:selected="row"
    wrap-cells
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-checkbox :model-value="props.selected" @update:model-value="props.selected = $event" />
        </q-td>
        <q-td key="description" :props="props">
          {{ props.row.description }}
        </q-td>
        <q-td key="standard" :props="props">
          {{ `${props.row.standard.name} ${props.row.standard.description || ''}` }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script setup lang="ts">
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import { storeToRefs } from 'pinia'
import { TechnicalReportRow } from 'src/features/defect/stores/types'
import {computed} from "vue";

const row = defineModel<TechnicalReportRow[]>()
const { technicalReport } = storeToRefs(useTechnicalReportStore())

const props = defineProps<{
  photoDocId: number
}>()

const unusedRows = computed(() => {
  return technicalReport.value?.rows.filter(row => !row.used || row.photoDoc?.id == props.photoDocId)
})

const columns = [
  {
    name: 'description',
    field: 'description',
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
]
</script>
