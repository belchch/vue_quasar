import {useSelectedCaseStore} from "src/features/case/stores/selected-case-store";
import {storeToRefs} from "pinia";
import {CaseApi} from "src/features/case/api/case-api";
import {useInspectionsStore} from "src/features/inspection/store/inspection-store";
import {usePhotoDocsStore} from "src/features/inspection/store/photo-doc-store";
import {usePhotoDocs} from "src/features/inspection/composables/photo-doc";
import {useSpotStore} from "src/features/lookup/spot/stores/spot-store";
import {useStructElemStore} from "src/features/lookup/struct-elem/stores/struct-elem-store";
import {useMaterialStore} from "src/features/lookup/material/stores/material-store";
import {useFlawStore} from "src/features/defect/flaw/stores/flaw-store";
import {useTechnicalReportService} from "src/features/defect/composables/technical-report";
import {onMounted, ref} from "vue";
import {InspectionApi} from "src/features/inspection/api/inspection-api";
import _ from "lodash";
import {useSelectedInspection} from "src/features/inspection/composables/selected-inspection";
import {useStandardStore} from "src/features/lookup/standard/stores/standard-store";

export const useSelectedCaseService = () => {
  const {selectedCase, caseLoaded} = storeToRefs(useSelectedCaseStore())

  const inspectionsStore = useInspectionsStore()
  const photoDocService = usePhotoDocs()
  const spotStore = useSpotStore()
  const structElemStore = useStructElemStore()
  const materialStore = useMaterialStore()
  const standardStore = useStandardStore()
  const flawStore = useFlawStore()
  const { requestTechnicalReport } = useTechnicalReportService()

  const selectCase = async (caseId: number) => {
    const caseResponse = await CaseApi.getCase(caseId)
    const inspectionResponse = await InspectionApi.getInspections(caseId)
    const inspectionId = _.first(inspectionResponse.data)!!.id!!
    inspectionsStore.setSelectedInspectionId(inspectionId)
    selectedCase.value = caseResponse.data
    await photoDocService.requestPhotoDocs(inspectionId, undefined, true)
    await spotStore.requestLookup()
    await structElemStore.requestLookup()
    await materialStore.requestLookup()
    await flawStore.requestLookup()
    await standardStore.requestLookup()
    await requestTechnicalReport()
    caseLoaded.value = true
  }

  return {selectCase}
}
