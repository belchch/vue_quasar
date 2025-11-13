export type LookupItem = {
  id?: number
  name: string
}

export interface Field {
  name: string
  label: string
  type: 'select' | 'text' | 'checkbox' | 'textarea' | 'select-multiple' | 'decimal'
  formatOptionLabel?: (val: any) => string
  behavior?: 'dialog' | 'menu'
  required?: boolean
  options?: any[]
  emitValue?: boolean
  placeholder?: string
  selectValueField?: string
  rules?: ((val: any) => boolean | string)[]
}
