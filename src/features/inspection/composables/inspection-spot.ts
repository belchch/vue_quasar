import { storeToRefs } from "pinia"
import { useInspectionSpotStore } from "../store/inspection-spot-store"
import { useInspectionsStore } from "../store/inspection-store"
import { InspectionSpotApi } from "../api/inspection-spot-api"
import { InspectionSpot } from "../api/types"

export const useInspectionSpotService = () => {
    const {inspectionSpots} = storeToRefs(useInspectionSpotStore())
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())

    const requestInspectionSpots = async () => {
        const response = await InspectionSpotApi.getInspectionSpots(selectedInspectionId.value!!)
        inspectionSpots.value = response.data
    }

    const updateInspectionSpot = async (inspectionSpot: InspectionSpot) => {
        await InspectionSpotApi.updateInspectionSpot(selectedInspectionId.value!!, {
            id: inspectionSpot.id,
            spotId: inspectionSpot.spot.id!,
            count: inspectionSpot.count,
            inUse: inspectionSpot.inUse
        })
        await requestInspectionSpots()
    }

    return {
        requestInspectionSpots,
        updateInspectionSpot
    }
}