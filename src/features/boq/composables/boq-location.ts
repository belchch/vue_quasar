import { storeToRefs } from "pinia"
import { useBoqLocationStore } from "../stores/boq-location-store"
import { useBoqStore } from "../stores/boq-store"
import { BoqFloorApi } from "../api/floor/boq-floor-api"
import { BoqLocation } from "../api/types"
import { useBoqWorkService } from "./boq-work"
import { useRouter } from "vue-router"

export const useBoqLocationService = () => {
    const { location, floorPhotos } = storeToRefs(useBoqLocationStore())
    const { boq, locations } = storeToRefs(useBoqStore())
    const { requestWorks } = useBoqWorkService()
    const router = useRouter()    

    const selectLocation = async (id: number): Promise<BoqLocation> => {
        const newLocation = locations.value!.find(location => location.id == id)!
        location.value = newLocation
        const photoResponse = await BoqFloorApi.getPhotos(boq.value!.id, newLocation.room.id!, newLocation.roomNum)
        floorPhotos.value = photoResponse.data
        await requestWorks()
        return newLocation
    }

    const navigateLocation = async (id: number) => {
        await router.push({
            name: 'boq-configuration',
            params: {
                locationId: id
            }
        })
    }

    return {
        selectLocation, navigateLocation
    }
}