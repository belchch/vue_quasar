import { storeToRefs } from "pinia";
import { DocumentsAPI } from "../api/documents-api";
import { useDocumentStore } from "../stores/documents-store";
import { useInspectionsStore } from "src/features/inspection/store/inspection-store";

export const useDocumentService = () => {
    const { actDocuments } = storeToRefs(useDocumentStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())

    const requestDocuments = async () => {
        const response = await DocumentsAPI.getDocuments(selectedInspectionId.value!);
        actDocuments.value = response.data;
    }

    return {
        requestDocuments
    }
}