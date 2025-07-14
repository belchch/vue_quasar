import {S3Api} from "src/features/inspection/api/s3-api";
import { v4 as uuidv4 } from 'uuid';

export const useUploadLookup = () => {
  return async (extension: string) => {
    const objectKey = `lookup/_${uuidv4()}.${extension}`
    const uploadUrl = await S3Api.generateUploadUrl(objectKey)

    return {
      url: uploadUrl.data,
      objectKey
    }
  }
}