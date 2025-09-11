import {CasePriority, CaseStatus, InspectionObjectType} from "src/features/case/stores/types";

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
  createdById?: number[] | undefined
  expertId?: number[] | undefined
  managerId?: number[] | undefined
  headId?: number[] | undefined
  initiator?: string | undefined
  customer?: string | undefined
}


export type CaseCreateRequest = {
  number: string,
  facilityAddress: string,
  apartment: string,
  companyId: number,
  regionId: number,
  deadline: string,
  expertiseType: string
}

export type CaseUpdateRequest = {
  id: number,
  number: string,
  status: CaseStatus,
  priority: CasePriority,
  facilityAddress: string,
  courtId?: number | undefined,
  judgeId?: number | undefined,
  companyId: number,
  regionId: number,
  createdById: number,
  createdAt: string,
  deadline: string,
  expertId?: number | undefined,
  expertIds?: number[] | undefined,
  inspectorId?: number | undefined,
  managerId?: number| undefined,
  headId?: number | undefined,
  initiator?: string | undefined,
  customer?: string | undefined,
  expertiseType: string,
  inspectionStartAt?: string | undefined,
  inspectionEndAt?: string | undefined,
  courtCaseNum?: string | undefined,
  numberOfVolumes?: number | undefined,
  determinationDate?: string | undefined,
  contactPerson?: string | undefined,
  contactPhone?: string | undefined,
  contactEmail?: string | undefined,
  inspectionObjectType?: InspectionObjectType
}
