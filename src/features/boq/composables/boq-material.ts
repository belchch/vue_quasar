import { storeToRefs } from "pinia"
import { useBoqMaterialStore } from "../stores/boq-material-store"
import { BoqMaterialApi } from "../api/boq-material-api"
import { useBoqStore } from "../stores/boq-store"
import _ from "lodash"
import { BoqRawMaterial, toMaterialUpdateRequest } from "../api/types"

export const useBoqRawMaterialService = () => {
    const { materials } = storeToRefs(useBoqMaterialStore())
    const { boq } = storeToRefs(useBoqStore())

    const requestMaterials = async () => {
        const response = await BoqMaterialApi.getMaterials(boq.value!.id)
        materials.value = response.data
    }

    const updateMaterial = async (material: BoqRawMaterial) => {
        await BoqMaterialApi.updateMaterial(material.id, toMaterialUpdateRequest(material))
        await requestMaterials()
    }

    return {
        requestMaterials,
        updateMaterial
    }
}