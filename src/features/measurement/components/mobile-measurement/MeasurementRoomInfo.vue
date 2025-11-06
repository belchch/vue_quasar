<template>
  <div>
    <q-table flat :rows="rows" wrap-cells hide-header hide-bottom>
      <template #body="props">
        <q-tr :props="props" v-for="(col, i) in columns" :key="i">
          <q-td class="cell-label">{{ col.label }}</q-td>
          <q-td class="cell-value">
            <cell-editor
              v-if="col.isEdit"
              :value="props.row[col.fieldKey]"
              :row="props.row"
              :field="col.fieldKey"
            />
            <template v-else>
              <template v-if="col.formatValue">
                {{ col.formatValue(props.row, col.fieldKey) }}
              </template>
              <template v-else>
                {{ props.row[col.fieldKey] }}
              </template>
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <div class="row no-wrap">
      <div class="q-col">
        <div v-for="(key, i) in columns" :key="`label_${i}`" class="q-pa-sm">{{ key.label }}</div>
      </div>
      <div class="q-col">
        <div v-for="(key, i) in columns" :key="`value_${i}`" class="q-pa-sm">
          {{ roomMeasurement[key.name] }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RoomMeasurement } from '../../stores/types'
import CellEditor from '../CellEditor.vue'

const { roomMeasurement } = defineProps<{
  roomMeasurement: RoomMeasurement
}>()

const rows = computed(() => {
  if (roomMeasurement) {
    return [roomMeasurement]
  } else {
    return []
  }
})
type fieldNameType = keyof RoomMeasurement
type columnType = {
  fieldKey: fieldNameType
  label: string
  formatValue?: ValueFormatter
  isEdit?: boolean
  align?: string
  field?: (row: RoomMeasurement) => any
}
type ValueFormatter = (measurement: RoomMeasurement, field: fieldNameType) => any

const getOriginalValue = (measurement: RoomMeasurement, field: fieldNameType) => {
  return roomMeasurement[field]
}

const getFloorMaterialName = (measurement: RoomMeasurement, field: fieldNameType) => {
  return roomMeasurement.floorMaterial?.name
}
const getCeilMaterialName = (measurement: RoomMeasurement, field: fieldNameType) => {
  return roomMeasurement.ceilMaterial?.name
}
const getWallMaterialName = (measurement: RoomMeasurement, field: fieldNameType) => {
  return roomMeasurement.wallMaterial?.name
}
const columns: columnType[] = [
  {
    fieldKey: 'declaredArea',
    label: 'Площадь из договора ДДУ',
    isEdit: true,
    formatValue: getOriginalValue,
  },
  {
    fieldKey: 'width',
    field: (row: RoomMeasurement) => row.width,
    label: 'Ширина',
    isEdit: true,
    align: 'left' as const,
  },
  {
    fieldKey: 'length',
    field: (row: RoomMeasurement) => row.length,
    label: 'Длина',
    isEdit: true,
    align: 'left' as const,
  },
  {
    fieldKey: 'height',
    field: (row: RoomMeasurement) => row.width,
    label: 'Высота потолков',
    isEdit: true,
    align: 'left' as const,
  },
  {
    fieldKey: 'floorArea',
    field: (row: RoomMeasurement) => row.floorArea,
    label: 'Площадь пола',
    align: 'left' as const,
  },
  {
    fieldKey: 'ceilArea',
    formatValue: getCeilMaterialName,
    field: (row: RoomMeasurement) => row.ceilArea,
    label: 'Площадь потолка',
    align: 'left' as const,
  },
  {
    fieldKey: 'wallMaterial',
    formatValue: getWallMaterialName,
    field: (row: RoomMeasurement) => row.wallMaterial,
    label: 'Материал стен',
    align: 'left' as const,
  },
  {
    fieldKey: 'floorMaterial',
    formatValue: getFloorMaterialName,
    field: (row: RoomMeasurement) => row.floorMaterial,
    label: 'Материал пола',
    align: 'left' as const,
  },
  {
    fieldKey: 'ceilMaterial',
    field: (row: RoomMeasurement) => row.ceilMaterial,
    label: 'Материал потолка',
    align: 'left' as const,
  },
  {
    fieldKey: 'area',
    field: (row: RoomMeasurement) => row.area,
    label: 'Площадь без учета проемов',
    align: 'left' as const,
  },
  {
    fieldKey: 'perimeter',
    field: (row: RoomMeasurement) => row.perimeter,
    label: 'Периметр без учета проемов',
    align: 'left' as const,
  },
  {
    fieldKey: 'doorArea',
    field: (row: RoomMeasurement) => row.doorArea,
    label: 'Площадь дверных проемов',
    align: 'left' as const,
  },
  {
    fieldKey: 'windowArea',
    field: (row: RoomMeasurement) => row.windowArea,
    label: 'Площадь оконных проемов',
    align: 'left' as const,
  },
]
</script>

<style scoped>
.cell-label {
  /* font-weight: bold; */
  background-color: rgba(0, 0, 0, 0.05);
}
.cell-value {
  /* background-color: #f2dede; */
}
.cell-value:empty::before {
  content: 'Отсутствует';
  color: #999;
  font-style: italic;
  display: contents;
}
</style>
