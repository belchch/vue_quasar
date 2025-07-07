import { useSelectedCaseStore } from "src/features/case/stores/selected-case-store";
import { storeToRefs } from "pinia";
import { CaseApi } from "src/features/case/api/case-api";
import { useInspectionsStore } from "src/features/inspection/store/inspection-store";
import { usePhotoDocsStore } from "src/features/inspection/store/photo-doc-store";
import { usePhotoDocs } from "src/features/inspection/composables/photo-doc";
import { useSpotStore } from "src/features/lookup/spot/stores/spot-store";
import { useStructElemStore } from "src/features/lookup/struct-elem/stores/struct-elem-store";
import { useMaterialStore } from "src/features/lookup/material/stores/material-store";
import { useFlawStore } from "src/features/defect/flaw/stores/flaw-store";
import { useTechnicalReportService } from "src/features/defect/composables/technical-report";
import { onMounted, ref } from "vue";
import { InspectionApi } from "src/features/inspection/api/inspection-api";
import _ from "lodash";
import { useSelectedInspection } from "src/features/inspection/composables/selected-inspection";
import { useStandardStore } from "src/features/lookup/standard/stores/standard-store";
import { Case } from "../stores/types";
import { CaseUpdateRequest } from "../api/types";
import { useCompanyStore } from "src/features/lookup/company/stores/compay-store";
import { useInspectionSpotService } from "src/features/inspection/composables/inspection-spot";
import { useTechnicalReportStore } from "src/features/defect/stores/technical-report-store";
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store";
import { useAllPhotoDocStore } from "src/features/inspection/store/all-photo-doc-store";
import { useAllPhotoDocsService } from "src/features/inspection/composables/all-photo-docs";

export const useSelectedCaseService = () => {
  const { selectedCase, caseLoaded } = storeToRefs(useSelectedCaseStore())
  const { photoDocs } = storeToRefs(usePhotoDocsStore())
  const { technicalReport } = storeToRefs(useTechnicalReportStore())
  const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
  const { allPhotoDocs } = storeToRefs(useAllPhotoDocStore())

  const inspectionsStore = useInspectionsStore()
  const photoDocService = usePhotoDocs()
  const spotStore = useSpotStore()
  const structElemStore = useStructElemStore()
  const materialStore = useMaterialStore()
  const standardStore = useStandardStore()
  const flawStore = useFlawStore()
  const companyStore = useCompanyStore()
  const { requestAllPhotoDocs } = useAllPhotoDocsService()
  const { requestTechnicalReport } = useTechnicalReportService()
  const { requestInspectionSpots } = useInspectionSpotService()

  const selectCase = async (caseId: number) => {
    const caseResponse = await CaseApi.getCase(caseId)
    selectedCase.value = caseResponse.data
    const inspectionResponse = await InspectionApi.getInspections(caseId)
    const inspectionId = _.first(inspectionResponse.data)!!.id!!
    inspectionsStore.setSelectedInspectionId(inspectionId)
    await requestAllPhotoDocs()
    photoDocs.value = allPhotoDocs.value
    await requestLookupIfEmpty(spotStore)
    await requestLookupIfEmpty(structElemStore)
    await requestLookupIfEmpty(materialStore)
    await requestLookupIfEmpty(flawStore)
    await requestLookupIfEmpty(standardStore)
    await requestLookupIfEmpty(companyStore)
    await requestTechnicalReport()
    await requestInspectionSpots()
    caseLoaded.value = true
  }

  const requestLookupIfEmpty = async (store: any) => {
    if (store.items.length == 0) {
      await store.requestLookup()
    }
  }

  const cleanCase = () => {
    inspectionsStore.setSelectedInspectionId(undefined)
    selectedCase.value = undefined
    photoDocs.value = []
    allPhotoDocs.value = []
    technicalReport.value = undefined
    inspectionSpots.value = []
    caseLoaded.value = false
  }

  const updateCase = async () => {
    const request = caseToUpdateRequest(selectedCase.value!)
    const response = await CaseApi.updateCase(request)
    selectedCase.value = response.data
  }

  return { selectCase, updateCase, cleanCase }
}

const caseToUpdateRequest = (data: Case): CaseUpdateRequest => {
  return {
    id: data.id!,
    number: data.number,
    status: data.status,
    priority: data.priority,
    facilityAddress: data.facilityAddress,
    courtId: data.court?.id,
    judgeId: data.judge?.id,
    companyId: data.company.id!,
    regionId: data.region.id!,
    createdById: data.createdBy.id!,
    createdAt: data.createdAt,
    deadline: data.deadline,
    expertId: data.expert?.id,
    managerId: data.manager?.id,
    headId: data.head?.id,
    expertiseType: data.expertiseType,
    inspectionStartAt: data.inspectionStartAt,
    inspectionEndAt: data.inspectionEndAt
  }
}