import { UserRole } from "../stores/types"

export type UserCreateRequest = {    
      username: string,
      password: string,
      role: UserRole,
      firstName: string,
      lastName: string,
      middleName?: string
}