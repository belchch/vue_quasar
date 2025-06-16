import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import { Judge } from 'src/features/lookup/judge/stores/types'

export const useJudgeStore = defineLookupStore<Judge>('judges')
