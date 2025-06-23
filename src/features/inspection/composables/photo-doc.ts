import { InspectionApi } from 'src/features/inspection/api/inspection-api'
import { usePhotoDocsStore } from 'src/features/inspection/store/photo-doc-store'
import { PhotoDoc } from 'src/features/inspection/store/types'
import { PhotoDocSearchRequest } from "src/features/inspection/api/types";
import { storeToRefs } from "pinia";
import { useAllPhotoDocStore } from '../store/all-photo-doc-store';

export const usePhotoDocs = () => {
  const photoDocsStore = usePhotoDocsStore()
  const { setSearch, setPhotoDocs } = photoDocsStore
  const { search, photoDocsLoading, photoDocs } = storeToRefs(photoDocsStore)
  const {allPhotoDocs} = storeToRefs(useAllPhotoDocStore())

  const createPhotoDoc = async (inspectionId: number, source: string) => {
    return InspectionApi.createPhotoDoc(inspectionId, { sources: [source] })
  }

  const updatePhotoDoc = async (inspectionId: number, photoDoc: PhotoDoc) => {
    const updateRequest = {
      id: photoDoc.id!!,
      sources: photoDoc.sources,
      spotId: photoDoc.spot?.id,
      type: photoDoc.type,
      spotNum: photoDoc.spotNum,
      defectInfo: {
        structElemId: photoDoc.defectInfo?.structElem?.id,
        materialId: photoDoc.defectInfo?.material?.id,
        flawId: photoDoc.defectInfo?.flaw?.id,
        defectId: photoDoc.defectInfo?.defect?.id,
        value: photoDoc.defectInfo?.value,
        cause: photoDoc.defectInfo?.cause,
        technicalReportRowId: photoDoc.defectInfo?.technicalReportRowId
      },
    }

    const response =  await InspectionApi.updatePhotoDoc(inspectionId, updateRequest)
    photoDocs.value = replacePhotoDoc(photoDocs.value, response.data) 
    allPhotoDocs.value = replacePhotoDoc(allPhotoDocs.value, response.data)
  }

  const replacePhotoDoc = (target: PhotoDoc[], replacement: PhotoDoc): PhotoDoc[] => {
    return photoDocs.value.map(item => {
      if (item.id == replacement.id) {
        return replacement
      } else {
        return item
      }
    })
  }

  const searchAndSet = async (inspectionId: number, newSearch?: PhotoDocSearchRequest, generatePresignedUrls?: boolean) => {
    try {
      photoDocsLoading.value = true

      if (generatePresignedUrls) {
        await InspectionApi.generatePresignedUrls(inspectionId)
      }

      const response = await InspectionApi.searchPhotoDocs(inspectionId, newSearch)
      setPhotoDocs(response.data)
    } finally {
      photoDocsLoading.value = false
    }
  }

  const refreshPhotoDocs = async (inspectionId: number, generatePresignedUrls: boolean) => {
    await searchAndSet(inspectionId, search.value, generatePresignedUrls)
  }

  const requestPhotoDocs = async (inspectionId: number, newSearch?: PhotoDocSearchRequest, generatePresignedUrls: boolean = false) => {
    setSearch(newSearch)
    await searchAndSet(inspectionId, newSearch, generatePresignedUrls)
  }

  const requestAllPhotoDocs = async (inspectionId: number, generatePresignedUrls: boolean = false) => {
    if (generatePresignedUrls) {
      await InspectionApi.generatePresignedUrls(inspectionId)
    }

    const response = await InspectionApi.searchPhotoDocs(inspectionId)
    setPhotoDocs(response.data)
  }

  return { createPhotoDoc, updatePhotoDoc, requestPhotoDocs, refreshPhotoDocs, requestAllPhotoDocs }
}
