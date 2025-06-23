import { User, UserRole } from "../stores/types"

export type UserCreateRequest = {    
      username: string,
      password: string,
      role: UserRole,
      firstName: string,
      lastName: string,
      middleName?: string
}

export const userName = (user: User) => {
  return `${user.firstName} ${user.middleName} ${user.lastName} `
}

export const userRoleLabel = (user: User) => {
  switch (user.role) {
    case 'ADMIN':
      return 'Администратор'
    case 'USER':
      return 'Пользователь'
    default:
      return ''
  }
}