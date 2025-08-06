import { storeToRefs } from "pinia"
import { useBoqLocationStore } from "../stores/boq-location-store"
import { useBoqStore } from "../stores/boq-store"
import { BoqFloorApi } from "../api/boq-floor-api"
import { BoqLocation } from "../api/types"
import { useBoqWorkService } from "./boq-work"

export const useBoqLocationService = () => {
    const { location, floorPhotos } = storeToRefs(useBoqLocationStore())
    const { boq } = storeToRefs(useBoqStore())
    const { requestWorks } = useBoqWorkService()

    const selectLocation = async (newLocation: BoqLocation) => {
        location.value = newLocation        
        const photoResponse = await BoqFloorApi.getPhotos(boq.value!.id, newLocation.room.id!, newLocation.roomNum)
        floorPhotos.value = photoResponse.data
        await requestWorks()
    }

    return {
        selectLocation
    }
}