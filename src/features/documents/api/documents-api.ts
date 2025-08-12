import { api } from 'boot/axios';
import { FileInfo } from 'src/common/types';

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
  },
  downloadReport(inspectionId: number) {
    return api.post<FileInfo>(`/api/documents/build-docx`, {}, {
      params: {
        inspectionId
      }
    })
  }
}
