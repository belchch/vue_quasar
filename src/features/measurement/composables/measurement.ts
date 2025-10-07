import { storeToRefs } from "pinia"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { RoomMeasurementApi } from "../api/room-measurement-api"
import { OpeningMeasurementApi } from "../api/opening-measurement-api"
import { CeilSectionsMeasurementApi } from "../api/ceil-section-measurement-api"
import { FloorSectionsMeasurementApi } from "../api/floor-section-measurement-api"
import { WallSectionsMeasurementApi } from "../api/wall-section-measurement-api"
import { FixedAssetMeasurementApi } from "../api/fixed-asset-measurement-api"
import { useMeasurementStore } from "../stores/measurement-store"
import { OpeningMeasurement, RoomMeasurement, SectionMeasurementCreate, FloorSectionMeasurement, CeilSectionMeasurement } from "../stores/types"
import { FixedAssetCreateRequest, OpeningMeasurementUpdateRequest, RoomMeasurementUpdateRequest, SectionMeasurementUpdateRequest, FixedAssetUpdateRequest } from "../api/types"

export const
useMeasurementService = () => {
    const {roomMeasurements, openingMeasurements, ceilSectionMeasurements, floorSectionMeasurements, wallSectionMeasurements, fixedAssetMeasurements} = storeToRefs(useMeasurementStore())
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())

    const requestAllMeasurements = async () => {
        await requestRoomMeasurements()
        await requestOpeningMeasurements()
        await requestCeilSectionMeasurements()
        await requestFloorSectionMeasurements()
        await requestWallSectionMeasurements()
        await requestFixedAssetMeasurements()
    }

    const requestRoomMeasurements = async () => {
        const response = await RoomMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        roomMeasurements.value = response.data
    }

    const requestOpeningMeasurements = async () => {
        const response = await OpeningMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        openingMeasurements.value = response.data
    }
    const requestCeilSectionMeasurements = async () => {
        const response = await CeilSectionsMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        ceilSectionMeasurements.value = response.data
    }
    const requestFloorSectionMeasurements = async () => {
        const response = await FloorSectionsMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        floorSectionMeasurements.value = response.data
    }
    const requestWallSectionMeasurements = async () => {
        const response = await WallSectionsMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        wallSectionMeasurements.value = response.data
    }
    const requestFixedAssetMeasurements = async () => {
      const response = await FixedAssetMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
      fixedAssetMeasurements.value = response.data;
    }
    const requestMeasurements = async () => {
        await requestRoomMeasurements()
        await requestOpeningMeasurements()
        await requestCeilSectionMeasurements()
        await requestFloorSectionMeasurements()
        await requestWallSectionMeasurements()
        await requestFixedAssetMeasurements()
    }

    const createOpeningMeasurement = async (request: OpeningMeasurementUpdateRequest) => {
        await OpeningMeasurementApi.create(request)
        await requestMeasurements()
    }

    const deleteOpeningMeasurement = async (id: number) => {
        await OpeningMeasurementApi.delete(id)
        await requestMeasurements()
    }

    const createFloorSectionMeasurement = async (request: SectionMeasurementCreate) => {
      const response = await FloorSectionsMeasurementApi.create(request)
      floorSectionMeasurements.value.push(response.data);
    }

    const createCeilSectionMeasurement = async (request: SectionMeasurementCreate) => {
      const response = await CeilSectionsMeasurementApi.create(request)
      ceilSectionMeasurements.value.push(response.data);
    }

    const createWallSectionMeasurement = async (request: SectionMeasurementCreate) => {
      const response = await WallSectionsMeasurementApi.create(request)
      wallSectionMeasurements.value.push(response.data);
    }

    const createFixedAssetMeasurement = async (request: FixedAssetCreateRequest) => {
      const response = await FixedAssetMeasurementApi.create(request)
      fixedAssetMeasurements.value.push(response.data);
    }

    const deleteCeilSectionMeasurement = async (id: number) => {
        await CeilSectionsMeasurementApi.delete(id)
        ceilSectionMeasurements.value = ceilSectionMeasurements.value.filter(item=> item.id != id)
    }

    const deleteFloorSectionMeasurement = async (id: number) => {
        await FloorSectionsMeasurementApi.delete(id)
        floorSectionMeasurements.value = floorSectionMeasurements.value.filter(item=> item.id != id)
    }

    const deleteWallSectionMeasurement = async (id: number) => {
        await WallSectionsMeasurementApi.delete(id)
        wallSectionMeasurements.value = wallSectionMeasurements.value.filter(item=> item.id !=id)
    }

    const deletefixedAssetMeasurement = async (id: number) => {
      await FixedAssetMeasurementApi.delete(id)
      fixedAssetMeasurements.value = fixedAssetMeasurements.value.filter(item=> item.id != id)
    }

    const updateFixedAssetMeasurement = async (id:number, fixedAssetMeasurement: FixedAssetUpdateRequest) => {
      const response = await FixedAssetMeasurementApi.update(id, fixedAssetMeasurement)
      const findIndx  = fixedAssetMeasurements.value.findIndex(item => item.id == id);
      if(findIndx>=0) fixedAssetMeasurements.value[findIndx] = response.data;
    }

    const updateFloorSectionMeasurement = async (section: FloorSectionMeasurement) => {
      const request = toFloorSectionUpdateRequest(section)
      const response = await FloorSectionsMeasurementApi.update(section.id, request)
      const indx = floorSectionMeasurements.value.findIndex(item => item.id == section.id);
      if(indx>=0){
        floorSectionMeasurements.value[indx] = response.data;
      }
    }

    const updateCeilSectionMeasurement = async (id:number, section: SectionMeasurementUpdateRequest) => {
      const response = await CeilSectionsMeasurementApi.update(id, section);
      const indx = ceilSectionMeasurements.value.findIndex(item => item.id == id);
      if(indx>=0){
        ceilSectionMeasurements.value[indx] = response.data;
      }
    }

    const updateWallSectionMeasurement = async (id:number, section: SectionMeasurementUpdateRequest) => {
      const response = await WallSectionsMeasurementApi.update(id, section);
      const indx = wallSectionMeasurements.value.findIndex(item => item.id == id);
      if(indx>=0){
        wallSectionMeasurements.value[indx] = response.data;
      }
    }

    const updateOpeningMeasurement = async (id:number, opening: OpeningMeasurement) => {
      const request = toOpeningUpdateRequest(opening);
      const response = await OpeningMeasurementApi.update(id, request);
      const indx = openingMeasurements.value?.findIndex(item => item.id == id);
      if(indx>=0){
        openingMeasurements.value[indx] = response.data;
      }
    }

    const updateRoomMeasurement = async (roomMeasurement: RoomMeasurement) => {
        const request = toRoomUpdateRequest(roomMeasurement)

        if (roomMeasurement.id) {
            await RoomMeasurementApi.update(roomMeasurement.id, request)
        } else {
            await RoomMeasurementApi.create(request)
        }

        await requestMeasurements()
    }

    return {
        requestAllMeasurements,
        deleteOpeningMeasurement,
        requestMeasurements,
        updateRoomMeasurement,
        updateFloorSectionMeasurement,
        updateFixedAssetMeasurement,
        updateCeilSectionMeasurement,
        updateWallSectionMeasurement,
        updateOpeningMeasurement,
        createOpeningMeasurement,
        requestCeilSectionMeasurements,
        requestFloorSectionMeasurements,
        createFloorSectionMeasurement,
        createCeilSectionMeasurement,
        createWallSectionMeasurement,
        createFixedAssetMeasurement,
        requestWallSectionMeasurements,
        requestFixedAssetMeasurements,
        deleteCeilSectionMeasurement,
        deleteFloorSectionMeasurement,
        deleteWallSectionMeasurement,
        deletefixedAssetMeasurement
    }
}

const toRoomUpdateRequest = (roomMeasurement: RoomMeasurement): RoomMeasurementUpdateRequest => {
    return {
        ...roomMeasurement,
        inspectionId: roomMeasurement.inspectionId,
        roomId: roomMeasurement.room.id!,
    }
}

const toOpeningUpdateRequest = (opening: OpeningMeasurement): OpeningMeasurementUpdateRequest => {
    return {
        ...opening,
        roomId: opening.room.id!,
        openingId: opening.opening.id,
        materialId: opening.material?.id,
    }
}

const toFloorSectionUpdateRequest = (section: FloorSectionMeasurement): SectionMeasurementUpdateRequest => {
  return {
    width: section.width,
    length: section.length,
    materialId: section.material?.id,
  }
}

