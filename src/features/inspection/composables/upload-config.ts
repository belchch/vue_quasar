import {S3Api} from "src/features/inspection/api/s3-api";
import {useInspectionsStore} from "src/features/inspection/store/inspection-store";
import { v4 as uuidv4 } from 'uuid';

export const useUploadConfig = () => {
  const inspectionStore = useInspectionsStore()

  return async (extension: string) => {
    const objectKey = `inspections/${inspectionStore.selectedInspectionId}_${uuidv4()}.${extension}`
    const uploadUrl = await S3Api.generateUploadUrl(objectKey)

    return {
      url: uploadUrl.data,
      objectKey
    }
  }
}
