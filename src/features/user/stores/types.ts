export type User = {
  id?: number,
  username: string,
  role: UserRole,
  firstName: string,
  lastName: string,
  middleName?: string
}

export type UserRole = 'USER' | 'ADMIN'
