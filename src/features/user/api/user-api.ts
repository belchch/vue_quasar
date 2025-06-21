import type {User} from "src/features/user/stores/types";
import {api} from "boot/axios";
import { UserCreateRequest } from "./types";

export const UserService = {
  currentUser() {
    return api.get<User>('/api/users/current')
  },

  createUser(request: UserCreateRequest) {
    return api.post<User>(`/api/users`, request)
  },

  updateUser(request: User) {
    return api.put<User>(`/api/users`, request)
  },

  getAllUsers() {
    return api.get<User[]>(`/api/users`)
  }
}
