import { storeToRefs } from "pinia"
import { useBoqStore } from "../stores/boq-store"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { BoqApi } from "../api/boq-api"
import { BoqLocation, toLocationUpdateRequest } from "../api/types"

export const useBoqService = () => {
    const { boq, locations, initialized } = storeToRefs(useBoqStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())

    const requestBoq = async () => {
        const response = await BoqApi.getBoq(selectedInspectionId.value!!)
        boq.value = response.data

        if (boq.value.id) {
            const response = await BoqApi.getLocations(boq.value.id)
            locations.value = response.data
        } else {
            locations.value = []
        }
        initialized.value = true
    }

    const buildAndRequestBoq = async () => {
        await BoqApi.buildBoq(selectedInspectionId.value!!)
        await requestBoq()    
    }

    const updateLocation = async (location: BoqLocation) => {
        await BoqApi.updateLocation(location.id, toLocationUpdateRequest(location))
        await requestBoq()
    }

    const deleteLocation = async (id: number) => {
        await BoqApi.deleteLocation(id)
    }

    return {
        requestBoq,
        buildAndRequestBoq,
        updateLocation,
        deleteLocation
    }   
}