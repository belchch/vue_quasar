<template>
  <div v-if="rows.length > 0">
    <div class="text-subtitle1 q-mb-sm">Проемы</div>
    <q-table :rows="rows" :columns="columns" :row-key="row => row.id" wrap-cells flat bordered
      :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="opening" :props="props">
            {{ props.row.opening.name }}
          </q-td>
          <q-td key="material" :props="props">
            {{ props.row.material?.name }}
          </q-td>
          <q-td key="width">
            {{ props.row.width }}
          </q-td>
          <q-td key="height" :props="props">
            {{ props.row.height }}
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area }}
          </q-td>
          <q-td key="hasTrims" :props="props">
            {{ props.row.hasTrims ? 'Да' : 'Нет' }}
          </q-td>
          <q-td key="trimWidth" :props="props">
            {{ props.row.trimWidth || '-' }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn v-if="canEdit" icon="delete" @click="() => deleteRow(props.row.id)" size="sm" color="negative" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMeasurementStore } from '../stores/measurement-store';
import { OpeningMeasurement } from '../stores/types';
import { computed } from 'vue';
import { useMeasurementService } from '../composables/measurement';

const { openingMeasurements } = storeToRefs(useMeasurementStore())
const { deleteOpeningMeasurement } = useMeasurementService()

const { roomId, roomNum, canEdit=true} = defineProps<{
    roomId: number,
    roomNum?: number | undefined | null,
    canEdit?: boolean
}>()

const rows = computed(() => {
    return openingMeasurements.value?.filter(item => {
      if(item.room.id == roomId){
        if(roomNum) return _isRightLocation(item);
        else return ( item.roomNum == null || item.roomNum == 1);
      }
      // if(!item.roomNum)
      // if(roomNum && item.roomNum){
      //   return item.room.id == roomId && item.roomNum == roomNum;
      // }
      // return item.room.id == roomId
    }) || []
})
const _isRightLocation = (oItem:OpeningMeasurement)=>{
  if(oItem.roomNum == roomNum) return true;
  if(roomNum == 1) return oItem.roomNum == null;
}
const deleteRow = async (id: number) => {
    await deleteOpeningMeasurement(id)
}

const columns = [
    {
        name: 'opening',
        field: (row: OpeningMeasurement) => row.opening.name,
        label: 'Проем',
        align: 'left' as const,
    },
    {
        name: 'material',
        field: (row: OpeningMeasurement) => row.material?.name,
        label: 'Материал',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: OpeningMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'height',
        field: (row: OpeningMeasurement) => row.height,
        label: 'Длина',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: OpeningMeasurement) => row.area,
        label: 'Площадь',
        align: 'left' as const,
    },
    {
      name: 'hasTrims',
      field: (row: OpeningMeasurement) => row.hasTrims,
      label: 'Отделка',
      align: 'left' as const,
    },
    {
      name: 'trimWidth',
      field: (row: OpeningMeasurement) => row.trimWidth,
      label: 'Ширина отделки',
      align: 'left' as const,
    },
    {
        name: 'actions',
        field: '',
        label: '',
        align: 'right' as const
    }
]
</script>
