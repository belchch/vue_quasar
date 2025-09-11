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

export const userRoleLabel = (role: string) => {
    switch (role) {
        case 'ADMIN':
            return 'Администратор'
        case 'BUSINESS_ADMIN':
            return 'Бизнес администратор'
        case 'HEAD':
            return 'Руководитель'
        case 'MANAGER':
            return 'Менеджер'
        case 'EXPERT':
            return 'Эксперт'
        case 'INSPECTOR':
            return 'Осмотрщик'
        default:
            return ''
    }
}
