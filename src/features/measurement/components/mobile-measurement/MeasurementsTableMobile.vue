<template>
  <div>
    <q-list bordered separator>
      <template v-for="item in allRoomMeasurements" :key="item.id">
        <q-expansion-item expand-separator :label="getLocationName(item)">
          <q-card>
            <div class="row gap-sm q-mb-sm q-ml-sm">
              <section-floor-dialog
                section-type="floor_section"
                :room-num="item.roomNum || 0"
                :room="item.room"
              />
              <SectionFloorDialog
                section-type="ceil_section"
                :room="item.room"
                :room-num="item.roomNum || 0"
                btn-text="Секция потолка"
              />
              <SectionFloorDialog
                section-type="wall_section"
                :room="item.room"
                :room-num="item.roomNum || 0"
                btn-text="Секция стены"
              />
              <SectionFloorDialog
                section-type="fixed_asset"
                :room="item.room"
                :room-num="item.roomNum || 0"
                btn-text="Конструктив"
              />
            </div>

            <measurement-room-info :room-measurement="item" />
          </q-card>
          <opening-table :room-id="item.room.id!!" :room-num="item.roomNum!" />
          <wall-sections-table :room-id="item.room.id!!" :room-num="item.roomNum!" />
          <floor-sections-table :room-id="item.room.id!!" :room-num="item.roomNum!" />
          <ceil-sections-table :room-id="item.room.id!!" :room-num="item.roomNum!" />
          <fixed-assets-table
            title="Колонны"
            fixed-type="COLUMN"
            :room-num="item.roomNum!"
            :room-id="item.room.id!!"
          />
          <fixed-assets-table
            title="Лестницы"
            fixed-type="STAIRWAY"
            :room-num="item.roomNum!"
            :room-id="item.room.id!!"
          />
        </q-expansion-item>
      </template>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMeasurementStore } from '../../stores/measurement-store'
import { RoomMeasurement } from '../../stores/types'
import MeasurementRoomInfo from './MeasurementRoomInfo.vue'
import SectionFloorDialog from '../SectionFloorDialog.vue'
import OpeningTable from './OpeningTable.vue'
import WallSectionsTable from './WallSectionsTable.vue'
import FloorSectionsTable from './FloorSectionsTable.vue'
import CeilSectionsTable from './CeilSectionsTable.vue'
import FixedAssetsTable from './FixedAssetsTable.vue'

const { allRoomMeasurements } = storeToRefs(useMeasurementStore())

const getLocationName = (roomMeasurement: RoomMeasurement) => {
  if (roomMeasurement.roomNum) {
    return `${roomMeasurement.room.name} - ${roomMeasurement.roomNum}`
  } else {
    return roomMeasurement.room.name
  }
}
</script>

<style scoped></style>
