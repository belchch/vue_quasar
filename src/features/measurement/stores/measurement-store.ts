import { defineStore, storeToRefs } from "pinia"
import { OpeningMeasurement, RoomMeasurement } from "./types"
import { computed, ref } from "vue"
import { useOpeningStore } from "src/features/lookup/opening/opening-store"
import InspectionLocations from "src/features/inspection/components/InspectionLocations.vue"
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import _ from "lodash"

export const useMeasurementStore = defineStore('room-measurements', () => {
    const roomMeasurements = ref<RoomMeasurement[]>()
    const openingMeasurements = ref<OpeningMeasurement[]>()
    const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())

    const allRoomMeasurements = computed(() => {
        const result = inspectionSpots.value.filter(item => item.inUse && item.spot.isRoom)
            .map(item => {
                const roomMeasurement = roomMeasurements.value?.find(rm => rm.room.id == item.spot.id)
                
                return roomMeasurement || {
                    inspectionId: selectedInspectionId.value!,
                    room: item.spot,                    
                } as RoomMeasurement
            })

        return _.sortBy(result, 'room.name')
    })

    return {
        allRoomMeasurements,
        roomMeasurements,
        openingMeasurements
    }
})