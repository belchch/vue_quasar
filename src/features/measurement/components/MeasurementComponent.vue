<template>
  <q-card>
    <q-tabs v-model="tab" no-caps active-color="primary" align="left">
      <q-tab label="Линейные размеры" name="measurements" />
      <q-tab label="ЭПСЭ План" name="plan" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="measurements">
        <q-table
          v-if="allRoomMeasurements"
          :rows="allRoomMeasurements"
          :columns="columns"
          :row-key="(row) => `${row.room.id}_${row.roomNum | 0}`"
          selection="single"
          wrap-cells
          flat
          bordered
          :pagination="{ rowsPerPage: 20 }"
          separator="cell"
        >
          <template v-slot:top>
            <div class="row q-gutter-md">
              <q-btn @click="onBuildingBoq" :loading="buildingBoq" color="primary" size="sm">
                Сформировать ВОР
              </q-btn>
              <DownloadReportButton label="Скачать" :disable="false" :api-fn="buildDocx" />
            </div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="xs"
                  flat
                  dense
                  @click="
                    () => {
                      props.expand = !props.expand
                    }
                  "
                  :icon="props.expand ? 'remove' : 'add'"
                  sor
                />
              </q-td>
              <q-td key="room" :props="props">
                {{ getLocationName(props.row) }}
              </q-td>
              <q-td key="declaredArea" :props="props">
                <CellEditor
                  :can-edit="hasPermission(['measurement.update'])"
                  :value="props.row.declaredArea as number"
                  field="declaredArea"
                  :row="props.row as RoomMeasurement"
                />
              </q-td>
              <q-td key="width">
                <CellEditor
                  :can-edit="hasPermission(['measurement.update'])"
                  :value="props.row.width as number"
                  field="width"
                  :row="props.row as RoomMeasurement"
                />
              </q-td>
              <q-td key="length" :props="props">
                <CellEditor
                  :can-edit="hasPermission(['measurement.update'])"
                  :value="props.row.length as number"
                  field="length"
                  :row="props.row as RoomMeasurement"
                />
              </q-td>
              <q-td key="height" :props="props">
                <CellEditor
                  :can-edit="hasPermission(['measurement.update'])"
                  :value="props.row.height as number"
                  field="height"
                  :row="props.row as RoomMeasurement"
                />
              </q-td>
              <q-td key="floorArea" :props="props">
                {{ props.row.floorArea }}
              </q-td>
              <q-td key="ceilArea" :props="props">
                {{ props.row.ceilArea }}
              </q-td>
              <q-td key="wallMaterial" :props="props">
                {{ props.row.wallMaterial?.name }}
              </q-td>
              <q-td key="floorMaterial" :props="props">
                {{ props.row.floorMaterial?.name }}
              </q-td>
              <q-td key="ceilMaterial" :props="props">
                {{ props.row.ceilMaterial?.name }}
              </q-td>
              <q-td key="area" :props="props">
                {{ props.row.area }}
              </q-td>
              <q-td key="perimeter" :props="props">
                {{ props.row.perimeter }}
              </q-td>
              <q-td key="doorArea" :props="props">
                {{ props.row.doorArea }}
              </q-td>
              <q-td key="windowArea" :props="props">
                {{ props.row.windowArea }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  <div class="q-gutter-sm q-pa-lg">
                    <div class="row q-gutter-sm q-ma-none">
                      <AddOpeningDialog
                        v-if="hasPermission(['measurement.update'])"
                        :room="props.row.room"
                      />
                      <!-- Секция пола-->
                      <SectionFloorDialog
                        section-type="floor_section"
                        :room="props.row.room"
                        :room-num="props.row.roomNum"
                        btn-text="Секция пола"
                      />
                      <SectionFloorDialog
                        section-type="ceil_section"
                        :room="props.row.room"
                        :room-num="props.row.roomNum"
                        btn-text="Секция потолка"
                      />
                      <SectionFloorDialog
                        section-type="wall_section"
                        :room="props.row.room"
                        :room-num="props.row.roomNum"
                        btn-text="Секция стены"
                      />
                      <SectionFloorDialog
                        section-type="fixed_asset"
                        :room="props.row.room"
                        :room-num="props.row.roomNum"
                        btn-text="Конструктив"
                      />
                    </div>
                    <OpeningTable
                      :room-id="props.row.room.id"
                      :room-num="props.row.roomNum"
                      :can-edit="hasPermission(['measurement.update'])"
                    />
                    <FloorSectionsTable
                      :room-id="props.row.room.id"
                      :room-num="props.row.roomNum"
                      :can-edit="hasPermission(['measurement.update'])"
                    />
                    <CeilSectionsTable
                      :room-id="props.row.room.id"
                      :room-num="props.row.roomNum"
                      :can-edit="hasPermission(['measurement.update'])"
                    />
                    <WallSectionsTable
                      :room-id="props.row.room.id"
                      :room-num="props.row.roomNum"
                      :can-edit="hasPermission(['measurement.update'])"
                    />
                    <FixedAssetsTable
                      :room-id="props.row.room.id"
                      :room-num="props.row.roomNum"
                      :can-edit="hasPermission(['measurement.update'])"
                    />
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-tab-panel>
      <!-- ЭПСЭ План -->
      <q-tab-panel name="plan">
        <PlanTree />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMeasurementStore } from '../stores/measurement-store'
import { RoomMeasurement } from '../stores/types'
import CellEditor from './CellEditor.vue'
import AddOpeningDialog from './AddOpeningDialog.vue'
import OpeningTable from './OpeningTable.vue'
import { RoomMeasurementApi } from '../api/room-measurement-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import DownloadReportButton from 'src/components/DownloadReportButton.vue'
import { useUserStore } from 'src/features/user/stores/user-store'
import PlanTree from './plan-tree/PlanTree.vue'
import { ref, onMounted } from 'vue'
import SectionFloorDialog from './SectionFloorDialog.vue'
import CeilSectionsTable from './CeilSectionsTable.vue'
import FloorSectionsTable from './FloorSectionsTable.vue'
import WallSectionsTable from './WallSectionsTable.vue'
import FixedAssetsTable from './FixedAssetsTable.vue'
const { allRoomMeasurements } = storeToRefs(useMeasurementStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { hasPermission } = useUserStore()
import { useOpeningStore } from 'src/features/lookup/opening/opening-store'
import { useBoqService } from '../../boq/composables/boq'

const { buildAndRequestBoq } = useBoqService()
const onBuildingBoq = async () => {
  buildingBoq.value = true
  await buildAndRequestBoq()
  buildingBoq.value = false
}
const buildDocx = async () => {
  const response = await RoomMeasurementApi.buildDocx(selectedInspectionId.value!!)
  return response.data
}
const getLocationName = (row: RoomMeasurement) => {
  if (row.roomNum) {
    return `${row.room.name} - ${row.roomNum}`
  } else {
    return row.room.name
  }
}
const openingStore = useOpeningStore()
const buildingBoq = ref(false)
const tab = ref('measurements')
const columns = [
  {
    name: 'room',
    field: (row: RoomMeasurement) => row.room.name,
    label: 'Локация',
    align: 'left' as const,
  },
  {
    name: 'declaredArea',
    field: (row: RoomMeasurement) => row.declaredArea,
    label: 'Площадь из договора ДДУ',
    align: 'left' as const,
  },
  {
    name: 'width',
    field: (row: RoomMeasurement) => row.width,
    label: 'Ширина',
    align: 'left' as const,
  },
  {
    name: 'length',
    field: (row: RoomMeasurement) => row.length,
    label: 'Длина',
    align: 'left' as const,
  },
  {
    name: 'height',
    field: (row: RoomMeasurement) => row.width,
    label: 'Высота потолков',
    align: 'left' as const,
  },
  {
    name: 'floorArea',
    field: (row: RoomMeasurement) => row.floorArea,
    label: 'Площадь пола',
    align: 'left' as const,
  },
  {
    name: 'ceilArea',
    field: (row: RoomMeasurement) => row.ceilArea,
    label: 'Площадь потолка',
    align: 'left' as const,
  },
  {
    name: 'wallMaterial',
    field: (row: RoomMeasurement) => row.wallMaterial,
    label: 'Материал стен',
    align: 'left' as const,
  },
  {
    name: 'floorMaterial',
    field: (row: RoomMeasurement) => row.floorMaterial,
    label: 'Материал пола',
    align: 'left' as const,
  },
  {
    name: 'ceilMaterial',
    field: (row: RoomMeasurement) => row.ceilMaterial,
    label: 'Материал потолка',
    align: 'left' as const,
  },
  {
    name: 'area',
    field: (row: RoomMeasurement) => row.area,
    label: 'Площадь без учета проемов',
    align: 'left' as const,
  },
  {
    name: 'perimeter',
    field: (row: RoomMeasurement) => row.perimeter,
    label: 'Периметр без учета проемов',
    align: 'left' as const,
  },
  {
    name: 'doorArea',
    field: (row: RoomMeasurement) => row.doorArea,
    label: 'Площадь дверных проемов',
    align: 'left' as const,
  },
  {
    name: 'windowArea',
    field: (row: RoomMeasurement) => row.windowArea,
    label: 'Площадь оконных проемов',
    align: 'left' as const,
  },
]

onMounted(async () => {
  await openingStore.requestLookup()
})
</script>
<style scoped>
td:hover {
  cursor: pointer;
}

.action-btn {
  opacity: 0;
  transition: opacity 0.3s;
}

tr:hover .action-btn {
  opacity: 1;
}
</style>
