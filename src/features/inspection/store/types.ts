import type { Spot } from 'src/features/lookup/spot/stores/types'
import type { StructElem } from 'src/features/lookup/struct-elem/stores/types'
import type { Material } from 'src/features/lookup/material/stores/types'
import type { User } from 'src/features/user/stores/types'
import { Defect, Flaw } from 'src/features/defect/flaw/stores/types'

export type Inspection = {
  id?: number
  apartment: string
  address: string
  performedDate: string
  performedBy: User
  caseId: number
}

export type PhotoDoc = {
  id?: number
  sources: string[]
  urls?: string[]
  spot?: Spot
  spotNum?: number | undefined,
  type?: PhotoDocType
  defectInfo?: PhotoDocDefectInfo,
  photographable?: Photographable
}

export type Photographable = {
  entityId: number,
  entityType: PhotographableType
}

export type PhotographableType = 'OPENING' | 'FIXED_ASSET' | 'WALL_SECTION' |  'FLOOR_SECTION' |  'CEIL_SECTION' |  'ROOM'

export type PhotoDocDefectInfo = {
  structElem?: StructElem | undefined
  material?: Material | undefined
  flaw?: Flaw | undefined
  defect?: Defect | undefined
  value: string | undefined
  cause: string | undefined
  technicalReportRowId: number | undefined
  description?: string | undefined
}

export type PhotoDocType = 'DEFECT' | 'GENERAL_VIEW'

export const photographableDesc = (item: Photographable) => {
  switch (item.entityType) {
    case 'OPENING': return 'Проем'
    case 'WALL_SECTION': return 'Секция стены'
    case 'FLOOR_SECTION': return 'Секция пола'
    case 'CEIL_SECTION': return 'Секция потолка'
    case 'ROOM': return 'Помещение'
    case 'FIXED_ASSET': return 'Конструктив'
  }
}

export const photoDocTypeDesc = (type?: PhotoDocType) => {
  switch (type) {
    case 'DEFECT':
      return 'Дефект'
    case 'GENERAL_VIEW':
      return 'Общий вид'
    default:
      return undefined
  }
}
