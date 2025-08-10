import { storeToRefs } from "pinia"
import { useSelectedCaseStore } from "src/features/case/stores/selected-case-store"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { useRouter } from "vue-router"

export const useNavigate = () => {
    const { selectedCase } = storeToRefs(useSelectedCaseStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())
    const router = useRouter()
    const caseHome = 'information'
    const inspectionHome = 'photos'

    const navigateCaseHome = async (caseId?: number) => {
        console.log('navigateCasePage', caseId)
        await navigateCasePage('information', caseId)
    }

    const navigateCasePage = async (page: string, caseId?: number) => {
        console.log('push', router, page, caseId)
        await router.push(caseUrl(page, caseId))
    }

    const navigateInspectionPage = async (page: string, inspectionId?: number) => {
        await router.push(inspectionUrl(page, inspectionId))
    }

    const caseHomeUrl = () =>  caseUrl(caseHome)
    const inspectionHomeUrl = () => inspectionUrl(inspectionHome)

    const caseUrl = (page: string, caseId?: number) => {
        console.log("caseUrl")
        return `/cases/${caseId || selectedCase.value?.id}/${page}`
    }

    const inspectionUrl = (page: string, inspectionId?: number) => {
        return `/cases/${selectedCase.value?.id}/inspection/${inspectionId || selectedInspectionId.value}/${page}`
    }

    return {
        navigateCasePage, navigateInspectionPage, caseUrl, inspectionUrl, navigateCaseHome, caseHomeUrl, inspectionHomeUrl
    }
}