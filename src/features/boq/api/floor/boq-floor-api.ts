import { BoqFloor, BoqFloorSection, BoqFloorSectionUpdateRequest, BoqFloorUpdateRequest } from "../types"
import { api } from "src/boot/axios"

export const BoqFloorApi = {
    updateFloor: (id: number, request: BoqFloorUpdateRequest, updateVolume: boolean) => {
        return api.put<BoqFloor>(`/api/boq/floor/${id}`, request, {
            params: {
                updateVolume
            }
        })
    },

    updateFloorSection: (id: number, request: BoqFloorSectionUpdateRequest, updateVolume: boolean) => {
        return api.put<BoqFloorSection>(`/api/boq/floor-sections/${id}`, request, {
            params: {
                updateVolume
            }
        })
    },

    createFloorSection: (floorId: number) => {
        return api.post<BoqFloorSection>(`/api/boq/floor-sections`, {}, {
            params: {
                floorId
            }
        })
    },

    deleteFloorSection: (id: number) => {
        return api.delete(`/api/boq/floor-sections/${id}`)
    },

    getPhotos: (boqId: number, spotId: number, spotNum: number | undefined) => {
        return api.get<string[]>(`/api/boq/floor/photos`, {
            params: {
                boqId, spotId, spotNum
            }
        })
    }
}