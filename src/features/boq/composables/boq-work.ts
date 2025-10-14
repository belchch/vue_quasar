import { storeToRefs } from "pinia"
import { useBoqWorkStore } from "../stores/boq-work-store"
import { BoqWorkApi } from "../api/boq-work-api"
import { useBoqStore } from "../stores/boq-store"
import _ from "lodash"
import { BoqWork, toWorkUpdateRequest } from "../api/types"
import { useBoqRawMaterialService } from "./boq-material"

export const useBoqWorkService = () => {
    const { works } = storeToRefs(useBoqWorkStore())
    const { boq } = storeToRefs(useBoqStore())
    const { requestMaterials } = useBoqRawMaterialService()

    const requestWorks = async () => {
        const response = await BoqWorkApi.getWorks(boq.value!.id)
        works.value = response.data
        await requestMaterials()
    }

    const updateWork = async (work: BoqWork) => {
        await BoqWorkApi.updateWork(work.id, toWorkUpdateRequest(work))
        await requestWorks()
    }

    return {
        requestWorks,
        updateWork
    }
}