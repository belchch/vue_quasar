import { api } from 'boot/axios'
import { Movable } from '../stores/types'
import { MovableCreateRequest, MovableUpdateRequest } from './types'

export const MovableObjectApi = {
  get(inspectionId: number) {
    return api.get<Movable[]>(`/api/movables?inspectionId=${inspectionId}`)
  },
  create(request: MovableCreateRequest) {
    return api.post<Movable>(`/api/movables`, request);
  },
  update(id: number, request: MovableUpdateRequest) {
    return api.put<Movable>(`/api/movables/${id}`, request)
  },
  delete(id: number) {
    return api.delete(`/api/movables/${id}`);
  },

}
