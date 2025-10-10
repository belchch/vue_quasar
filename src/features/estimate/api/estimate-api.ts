import { api } from "src/boot/axios"
import { Estimate } from "./types"

export const EstimateApi = {
  getEstimate: (inspectionId: number) =>{
    return api.get<Estimate>('/api/estimate-report',{
      params: {
        inspectionId: inspectionId
      }
    })
  }
}
