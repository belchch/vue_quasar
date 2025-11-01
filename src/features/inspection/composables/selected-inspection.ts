import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { usePhotoDocs } from 'src/features/inspection/composables/photo-doc'
import { PhotoDocSearchRequest } from 'src/features/inspection/api/types'
import { PhotoDoc, PhotoDocFinishingInfo, PhotoDocMovableInfo } from 'src/features/inspection/store/types'
import { InspectionApi } from 'src/features/inspection/api/inspection-api'
import { storeToRefs } from 'pinia'
import { useTechnicalReportService } from 'src/features/defect/composables/technical-report'
import FinishingInfo from '../components/photo-doc/FinishingInfo.vue'

export const useSelectedInspection = () => {
  const { selectedInspectionId } = storeToRefs(useInspectionsStore())
  const photoDocService = usePhotoDocs()

  const requestPhotoDocs = async (
    search?: PhotoDocSearchRequest,
    generatePresignedUrls: boolean = false,
  ) => {
    await photoDocService.requestPhotoDocs(
      selectedInspectionId.value!!,
      search,
      generatePresignedUrls,
    )
  }

  const refreshPhotoDocs = async (generatePresignedUrls: boolean = false) => {
    await photoDocService.refreshPhotoDocs(selectedInspectionId.value!!, generatePresignedUrls)
  }

  const createPhotoDoc = async (source: string) => {
    await photoDocService.createPhotoDoc(selectedInspectionId.value!!, source)
  }

  const updatePhotoDoc = async (photoDoc: PhotoDoc) => {
    await photoDocService.updatePhotoDoc(selectedInspectionId.value!!, photoDoc)
  }

  const updatePhotoDocMovableInfo = async (
    photoDocId: number,
    movableInfo: PhotoDocMovableInfo,
  ) => {
    await photoDocService.updatePhotoDocMovableInfo(
      selectedInspectionId.value!!,
      photoDocId,
      movableInfo,
    )
  }

  const updatePhotoDocFinishingInfo = async(photoDocId: number, finishingInfo: PhotoDocFinishingInfo)  => {
    await photoDocService.updatePhotoDocFinishingInfo(
      selectedInspectionId.value!!,
      photoDocId,
      finishingInfo,
    )
  }

  const groupPhotoDocs = async (targetId: number, otherIds: number[]) => {
    await InspectionApi.groupPhotoDocs(selectedInspectionId.value!!, targetId, otherIds)
    await refreshPhotoDocs()
  }

  const deletePhotoDoc = async (photoDocId: number) => {
    await InspectionApi.deletePhotoDoc(selectedInspectionId.value!!, photoDocId)
    await refreshPhotoDocs()
  }

  const ungroupPhotoDoc = async (photoDocId: number) => {
    await InspectionApi.ungroupPhotoDoc(selectedInspectionId.value!!, photoDocId)
    await refreshPhotoDocs()
  }

  const requestAllPhotoDocs = async () => {
    await photoDocService.requestAllPhotoDocs(selectedInspectionId.value!!, true)
  }

  return {
    refreshPhotoDocs,
    requestPhotoDocs,
    createPhotoDoc,
    updatePhotoDoc,
    updatePhotoDocFinishingInfo,
    updatePhotoDocMovableInfo,
    groupPhotoDocs,
    deletePhotoDoc,
    ungroupPhotoDoc,
    requestAllPhotoDocs,
  }
}
