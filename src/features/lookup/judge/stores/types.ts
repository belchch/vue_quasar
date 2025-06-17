import type {Court} from "src/features/lookup/court/stores/types";

export type Judge = {
  id?: number,
  court: Court,
  firstName: string,
  middleName?: string,
  lastName: string
}

export type JudgeUpdateRequest = {
  id: number
  courtId: number
  firstName: string
  middleName?: string | undefined,
  lastName: string
}

export const judgeName = (judge: Judge) => {
  return `${judge.firstName} ${judge.middleName} ${judge.lastName} `
}
