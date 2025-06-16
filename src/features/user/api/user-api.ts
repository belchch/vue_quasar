import type {User} from "src/features/user/stores/types";
import {api} from "boot/axios";

export const UserService = {
  async currentUser() {
    return api.get<User>('/api/users/current')
  }
}
