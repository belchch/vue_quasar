import type {Court} from "src/features/lookup/court/stores/types";

export type Judge = {
  id?: string,
  court: Court,
  firstName: string,
  middleName?: string,
  lastName: string
}

export const judgeName = (judge: Judge) => {
  return `${judge.firstName} ${judge.middleName} ${judge.lastName} `
}
