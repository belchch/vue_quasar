<template>
  <q-table :rows="works" :columns="columns" :row-key="row => row.id" wrap-cells
    :bordered="false"
    :selection="editable ? 'multiple' : 'none'" :pagination="{ rowsPerPage: 20 }" separator="cell">
    <template v-if="$slots['additional-top']" v-slot:top>
      <slot name="additional-top"></slot>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-if="editable">
          <q-toggle :model-value="!props.row.disabled"
            @update:model-value="(val: boolean) => setWorkDisabled(props.row, !val)" size="xs" color="secondary" />
        </q-td>
        <q-td key="name" :props="props">
          {{ props.row.rate.name }}
        </q-td>
        <q-td key="unitOfMeasure" :props="props">
          {{ uomDescription(props.row.rate.unitOfMeasure) }}
        </q-td>
        <q-td key="volume" :class="editable ? 'ceil-edit' : ''">
          <template v-if="editable">
            <WorkCellEditor field="volume" :row="props.row" :value="props.row.volume" />
            <q-icon name="edit" class="edit-icon" />
          </template>
          <div v-else>{{ props.row.volume }}</div>
        </q-td>
        <q-td v-if="showLocation" key="location" :props="props">
          {{ locationName(props.row) }}
        </q-td>
      </q-tr>
    </template>

    <template v-slot:header-selection>
      <q-toggle :model-value="disableAllValue()" @update:model-value="(val: boolean) => setDisabledAll(!val)" size="xs"
        color="secondary" />
    </template>
  </q-table>
</template>
<script lang="ts" setup>
import { uomDescription } from 'src/features/rate/stores/types';
import { BoqWork } from '../api/types';
import WorkCellEditor from './WorkCellEditor.vue';
import { ref } from 'vue';
import { useBoqWorkService } from '../composables/boq-work';
import { useEstimateService } from 'src/features/estimate/composables/estimate-service'
const { updateWork } = useBoqWorkService()
const estimateService = useEstimateService()
const props = defineProps<{
  works: BoqWork[],
  editable: boolean,
  showLocation: boolean
}>()


const setDisabledAll = (value: boolean) => {
  props.works.forEach(async item => {
    item.disabled = value
    await updateWork(item)
  })
}

const disableAllValue = () => {
  return props.works.filter(item => item.disabled).length == 0
}

const setWorkDisabled = async (work: BoqWork, disabled: boolean) => {
    work.disabled = disabled
    await updateWork(work)
    await estimateService.getEstimate()
}

const locationName = (row: BoqWork) => `${row.roomName || ''} ${row.roomNum || ''}`

const columns = [
  {
    name: 'name',
    field: (row: BoqWork) => row.rate.name,
    label: 'Работа',
    align: 'left' as const,
  },
  {
    name: 'unitOfMeasure',
    field: (row: BoqWork) => uomDescription(row.rate.unitOfMeasure),
    label: 'Ед. изм.',
    align: 'left' as const,
  },
  {
    name: 'volume',
    field: (row: BoqWork) => row.volume,
    label: 'Объем',
    align: 'left' as const,
  }
].concat(
  props.showLocation ? [{
    name: 'location',
    field: (row: BoqWork) => locationName(row),
    label: 'Локация',
    align: 'left' as const,
  }] : []
)
</script>
<style scoped>
.ceil-edit .edit-icon {
  opacity: .2;
  position: absolute;
  top: 2px;
  right: 2px;
}

.ceil-edit:hover {
  cursor: pointer;
}
</style>
