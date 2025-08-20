import { storeToRefs } from "pinia"
import { useBoqLocationStore } from "../stores/boq-location-store"
import { useBoqStore } from "../stores/boq-store"
import { BoqFloorApi } from "../api/floor/boq-floor-api"
import { BoqLocation } from "../api/types"
import { useBoqWorkService } from "./boq-work"
import { useRouter } from "vue-router"
import { AxiosResponse } from "axios"
import { Ref } from "vue"
import { BoqCeilApi } from "../api/ceil/boq-ceil-api"

export const useBoqLocationService = () => {
    const { location, floorPhotos, ceilPhotos } = storeToRefs(useBoqLocationStore())
    const { boq, locations } = storeToRefs(useBoqStore())
    const { requestWorks } = useBoqWorkService()
    const router = useRouter()

    const selectLocation = async (id: number): Promise<BoqLocation> => {
        const newLocation = locations.value!.find(location => location.id == id)!
        location.value = newLocation
        
        await requestPhotos({
            photosRef: floorPhotos,
            api: BoqFloorApi,
            boqId: boq.value!.id,
            location: newLocation
        })

        await requestPhotos({
            photosRef: ceilPhotos,
            api: BoqCeilApi,
            boqId: boq.value!.id,
            location: newLocation
        })
        
        await requestWorks()
        return newLocation
    }

    const requestPhotos = async (
        { photosRef, api, boqId, location }: {
            photosRef: Ref<string[] | undefined, string[] | undefined>,
            api: { getPhotos: (boqId: number, roomId: number, rumNum?: number) => Promise<AxiosResponse<string[], any>> },
            boqId: number,
            location: BoqLocation,
        }
    ) => {
        const response = await api.getPhotos(boqId, location.room.id!, location.roomNum)
        photosRef.value = response.data
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