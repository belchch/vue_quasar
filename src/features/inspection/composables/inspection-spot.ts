import { storeToRefs } from "pinia"
import { useInspectionSpotStore } from "../store/inspection-spot-store"
import { useInspectionsStore } from "../store/inspection-store"
import { InspectionSpotApi } from "../api/inspection-spot-api"
import { InspectionSpot } from "../api/types"
import { name } from "@vue/eslint-config-prettier/skip-formatting"
import { Spot } from "src/features/lookup/spot/stores/types"
import _ from "lodash"

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

export type InspectionSpotOption = {
    id: string,
    name: string,
    spot: Spot,
    spotNum?: number | undefined
}

export const buildInspectionSpotOptions = (inspectionSpots: InspectionSpot[]) => {
    const result = [] as InspectionSpotOption[]
    
    inspectionSpots.filter(item => item.inUse).forEach(item => {
        const counted = item.count > 1

        for (let i = 1; i <= item.count; i++) {
            result.push({
                id: counted ? `${item.spot.id}_${i}` : `${item.spot.id}`,
                name: counted ? `${item.spot.name} ${i}` : `${item.spot.name}`,
                spot: item.spot,
                spotNum: counted ? i : undefined
            })
        }
    })

    return _.sortBy(result, 'name')
}