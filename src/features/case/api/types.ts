import {CasePriority, CaseStatus} from "src/features/case/stores/types";

export type CaseFilterRequest = {
  search?: string | undefined
  status?: CaseStatus[] | undefined
  priority?: CasePriority[] | undefined
  facilityAddress?: string | undefined
  courtId?: number[] | undefined
  judgeId?: number[] | undefined
  companyId?: number[] | undefined
  regionId?: number[] | undefined
  createdAtFrom?: string | undefined
  createdAtTo?: string | undefined
  deadlineFrom?: string | undefined
  deadlineTo?: string | undefined
}


export type CaseCreateRequest = {
  number: string,
  facilityAddress: string,
  companyId: number,
  regionId: number,
  deadline: string
}
