export type LookupItem = {
  id?: number
  name: string
}

export interface Field {
  name: string
  label: string
  type: 'select' | 'text' | 'checkbox' | 'textarea' | 'select-multiple'

  required?: boolean
  options?: any[]
  placeholder?: string
  selectValueField?: string
  rules?: ((val: any) => boolean | string)[]
}
