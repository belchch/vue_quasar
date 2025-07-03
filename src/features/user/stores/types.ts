export type User = {
  id?: number,
  username: string,
  role: UserRole,
  firstName: string,
  lastName: string,
  middleName?: string,
  permissions: AllowedPermissions[]
}

export type UserRole = 'USER' | 'ADMIN'

export type AllowedPermissions =
    'case.create' |
    'case.update' |
    'case.update.head' |
    'case.update.expert' |
    'case.update.priority' |
    'case.update.status' |
    'case.update.deadline' |
    'question.create' |
    'question.update' |
    'question.read' |
    'inspection.update' |
    'inspection.read' |
    'generalViewReport.read' |
    'generalViewReport.update' |
    'defectReport.read' |
    'defectReport.update' |
    'lookup.read' |
    'lookup.update'
    | 'measurement.read'
    | 'measurement.update'
    | 'photoDoc.update'
    | 'photoDoc.create'
    | 'document.read'
    | 'document.update';
