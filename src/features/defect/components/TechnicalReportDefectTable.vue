<template>
  <q-table
    :columns="columns"
    :rows="unusedDefects"
    flat
    bordered
    selection="single"
    @update:selected="onDefectSelected"
    wrap-cells
  >
    <template v-slot:top-left>
      <div>Выявленные дефекты, соответствующие нормативу</div>
      <slot name="after-header"/>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-checkbox :model-value="isRowSelected(props.row)" @update:model-value="handleTableRowSelection(props.row, $event)"/>
        </q-td>
        <q-td key="location" :props="props">
          {{ props.row.location }}
        </q-td>
        <q-td key="defect" :props="props">
          {{ props.row.defect }}
        </q-td>
        <q-td key="attributes" :props="props">
          <DefectAttribute
            v-for="item in props.row.attributes"
            :key="`${item.type}_${item.name}`"
            :name="item.name"
            :type="item.type"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue'

import DefectAttribute, {
  DefectAttributeType
} from 'src/features/inspection/components/photo-doc/DefectAttribute.vue'
import _ from "lodash";

const props = defineProps<{
  rows: DefectTableRow[]
}>()

const isRowSelected = (row: any) => {
  console.log('isSelected', row)
  return photoDocId.value == row.photoDocId
}

const handleTableRowSelection = (row: any, event: boolean) => {
  console.log('handle', row, event)

  if (event) {
    photoDocId.value = row.photoDocId
  } else {
    photoDocId.value = undefined
  }
}

const selectedDefect = ref<any[]>([])
const photoDocId = defineModel('selected')

const unusedDefects = computed(() => {
  return props.rows.filter(row => !!row.photoDocId || row.photoDocId == photoDocId.value)
})

if (photoDocId.value != undefined) {
  selectedDefect.value = [_.find(props.rows, {photoDocId: photoDocId.value})]
}

const onDefectSelected = () => {
  photoDocId.value = _.first(selectedDefect.value)?.photoDocId
}

export type DefectTableRow = {
  photoDocId: number,
  location: string | undefined
  defect: string | undefined
  attributes: DefectTableRowAttribute[]
}

type DefectTableRowAttribute = {
  name: string | undefined,
  type: DefectAttributeType
}

const columns = [
  { name: 'location', field: 'location', label: 'Локация', sortable: true, align: 'left' as const },
  { name: 'defect', field: 'defect', label: 'Дефект', sortable: true, align: 'left' as const },
  { name: 'attributes', field: 'attributes', label: 'Свойства', sortable: true, align: 'center' as const },
]
</script>
