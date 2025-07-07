import type {Court} from "src/features/lookup/court/stores/types";
import type {Judge} from "src/features/lookup/judge/stores/types";
import type {Company} from "src/features/lookup/company/stores/types";
import type {Region} from "src/features/lookup/region/stores/types";
import type {User} from "src/features/user/stores/types";

export type Case = {
  id?: number,
  number: string,
  status: CaseStatus,
  priority: CasePriority,
  facilityAddress: string,
  court?: Court,
  judge?: Judge,
  company: Company,
  region: Region,
  createdBy: User,
  createdAt: string,
  deadline: string,
  inspectionIds: number[],
  stages: CaseStages,
  expert?: User,
  manager?: User,
  head?: User,
  inspectionStartAt?: string | undefined,
  inspectionEndAt?: string | undefined,
  expertiseType: string
}

export type CaseStages = {
  inspection: boolean,
  defect: boolean,
  generalView: boolean,
  workVolume: boolean
}

export type CaseStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE'
export type CasePriority = 'HIGH' | 'MEDIUM' | 'LOW'

export type CaseQuestion = {
  id?: number | undefined,
  text: string,
  caseId: number
}

export type CaseComment = {
  id?: number | undefined,
  text: string,
  caseId: number
}
