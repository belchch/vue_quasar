import { api } from "src/boot/axios"
import { InspectionSpot, InspectionSpotUpdateRequest } from "./types"

export const InspectionSpotApi = {
    getInspectionSpots(inspectionId: number) {
        return api.get<InspectionSpot[]>(`/api/inspection/spot`, {
            params: {
                inspectionId
            }
        })
    },

    updateInspectionSpot(inspectionId: number, request: InspectionSpotUpdateRequest) {
        return api.put<InspectionSpot>(`/api/inspection/spot`, request, {
            params: {
                inspectionId
            }
        })
    }
}