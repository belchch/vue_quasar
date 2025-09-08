import { storeToRefs } from "pinia";
import { CaseApi } from "src/features/case/api/case-api";
import { useSelectedCaseStore } from "src/features/case/stores/selected-case-store";
import { useFlawStore } from "src/features/defect/flaw/stores/flaw-store";
import { useInspections } from "src/features/inspection/composables/inspection";
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store";
import { useInspectionsStore } from "src/features/inspection/store/inspection-store";
import { useCompanyStore } from "src/features/lookup/company/stores/compay-store";
import { useMaterialStore } from "src/features/lookup/material/stores/material-store";
import { useSpotStore } from "src/features/lookup/spot/stores/spot-store";
import { useStandardStore } from "src/features/lookup/standard/stores/standard-store";
import { useStructElemStore } from "src/features/lookup/struct-elem/stores/struct-elem-store";
import { CaseUpdateRequest } from "../api/types";
import { Case } from "../stores/types";


export const useSelectedCaseService = () => {
  const { selectedCase, caseLoaded } = storeToRefs(useSelectedCaseStore())
  const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
  const { requestInspections } = useInspections()
  const spotStore = useSpotStore()
  const structElemStore = useStructElemStore()
  const materialStore = useMaterialStore()
  const standardStore = useStandardStore()
  const flawStore = useFlawStore()
  const companyStore = useCompanyStore()

  const selectCase = async (caseId: number) => {
    const caseResponse = await CaseApi.getCase(caseId)
    selectedCase.value = caseResponse.data
    await requestInspections()

    await requestLookupIfEmpty(spotStore)
    await requestLookupIfEmpty(structElemStore)
    await requestLookupIfEmpty(materialStore)
    await requestLookupIfEmpty(flawStore)
    await requestLookupIfEmpty(standardStore)
    await requestLookupIfEmpty(companyStore)

    caseLoaded.value = true
  }

  const requestLookupIfEmpty = async (store: any) => {
    if (store.items.length == 0) {
      await store.requestLookup()
    }
  }

  const cleanCase = () => {
    selectedCase.value = undefined
    caseLoaded.value = false
    inspectionSpots.value = []
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
    expertIds: data.experts?.map(expert => expert.id!),
    inspectorId: data.inspector?.id,
    managerId: data.manager?.id,
    headId: data.head?.id,
    expertiseType: data.expertiseType,
    inspectionStartAt: data.inspectionStartAt,
    inspectionEndAt: data.inspectionEndAt,
    courtCaseNum: data.courtCaseNum,
    numberOfVolumes: data.numberOfVolumes,
    determinationDate: data.determinationDate,
    contactPerson: data.contactPerson,
    contactPhone: data.contactPhone,
    contactEmail: data.contactEmail,
    inspectionObjectType: data.inspectionObjectType!
  }
}
