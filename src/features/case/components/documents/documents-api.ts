import { api } from 'boot/axios';
import { useUploadConfig } from 'src/features/inspection/composables/upload-config'
const uploadConfig = useUploadConfig();
export const DocumentsAPI = {
  getDocuments(id:number) {
    return api.get('/api/documents', {
      params: {
        inspectionId: id
      }
    })
  },
  deleteDocument(id:number) {
    return api.delete('/api/documents/' + id)
  },
  postDocument(obj:any) {
    return api.post('/api/documents', obj)
  },
  updateDocument(id:"number", obj:any) {
    return api.put('/api/documents/' + id, obj);
  }
}
