import { api } from 'boot/axios'

export const S3Api = {
  async generateUploadUrl(objectKey: string) {
    return api.get<string>('/api/s3/generate-upload-url', {
      params: {
        objectKey
      }
    })
  },

  async generateDownloadUrl(objectKey: string) {
    return api.get<string>('/api/s3/generate-download-url', {
      params: {
        objectKey
      }
    })
  },
}
