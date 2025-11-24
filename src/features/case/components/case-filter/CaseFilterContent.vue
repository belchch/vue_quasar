<template>
  <div class="full-width q-ma-none">
    <q-input
      dense
      v-model="search"
      placeholder="По номеру или адресу"
      outlined2
      square
      class="filter-search-input q-ma-none full-width"
    >
      <template v-slot:append>
        <q-icon
          v-if="!_.isEmpty(filter.search)"
          name="close"
          @click="search = undefined"
          class="cursor-pointer"
        />
        <q-icon v-else name="search" />
      </template>
    </q-input>
    <div class="row no-wrap q-gutter-md full-width q-mt-none" style="position: relative">
      <OptionGroupFilter :options="statusOptions" title="Статус" v-model="selectedStatuses" />
      <OptionGroupFilter
        :options="priorityOptions"
        title="Приоритет"
        v-model="selectedPriorities"
      />
    </div>
    <q-card-section class="q-pb-xs">
      <ListFilter
        v-model="selectedExpertiseType"
        :options="expertiseTypeOptions"
        label="Вид экспертизы"
      />
    </q-card-section>
    <q-card-section class="q-pb-none q-px-none q-ma-none full-width">
      <q-separator />
      <q-card-section class="row justify-between2">
        <DateFilter
          title="Дата создания"
          v-model="createdAt"
          @update:model-value="updateCreatedAt"
        />
        <DateFilter title="Срок исполнения" v-model="deadline" />
      </q-card-section>
    </q-card-section>
    <q-card-section class="q-py-sm q-px-none q-ma-none full-width">
      <q-list class="">
        <q-separator />

        <q-item class="q-mt-none text-grey-8 grid-2 q-py-md">
          <ListFilter v-model="selectedCourts" :options="courtOptions" label="Суд" />
          <ListFilter v-model="selectedCompanies" :options="companyOptions" label="Компания" />
          <ListFilter v-model="selectedJudges" :options="judgeOptions" label="Судья" />
          <ListFilter v-model="selectedRegions" :options="regionOptions" label="Регион" />
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section class="q-py-sm q-px-none q-ma-none full-width">
      <q-list>
        <q-separator />

        <q-item class="q-mt-none text-grey-8 grid-2 q-py-md">
          <ListFilter v-model="selectedAuthors" :options="userOptions" label="Автор" />
          <ListFilter v-model="selectedExperts" :options="userOptions" label="Эксперт" />
          <ListFilter v-model="selectedManagers" :options="userOptions" label="Менеджер" />
          <ListFilter v-model="selectedHeads" :options="userOptions" label="Руководитель" />
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section
      class="row justify-center full-width q-gutter-x-md q-mt-none q-pt-none text-grey-8"
    >
      {{ wordDeclension(casesStore.cases?.length || 0, ['Найдена', 'Найдено', 'Найдено']) }}
      {{ casesStore.cases?.length || 0 }}
      {{ wordDeclension(casesStore.cases?.length || 0, ['запись', 'записи', 'записей']) }}
    </q-card-section>
    <q-card-section class="row justify-center full-width q-gutter-x-md q-mt-none q-pt-none">
      <q-btn
        no-caps
        outline
        color="secondary"
        icon="close"
        @click="clearFilters()"
        label="Сбросить"
      />
      <q-btn no-caps color="secondary" icon="check" label="Применить" @click="applyFilters()" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { useCases } from 'src/features/case/composables/case'
import _ from 'lodash'
import { computed, ref, Ref, onMounted } from 'vue'
import DateFilter from 'src/features/case/components/case-filter/DateFilter.vue'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import { judgeName } from 'src/features/lookup/judge/stores/types'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import ListFilter from 'src/features/case/components/case-filter/ListFilter.vue'
import OptionGroupFilter from 'src/features/case/components/case-filter/OptionGroupFilter.vue'
import {
  CasePriority,
  CaseStatus,
  ExpertiseTypeEnum,
  ExpertiseType,
} from 'src/features/case/stores/types'
import dayjs from 'dayjs'
import { useCasesStore } from 'src/features/case/stores/case-store'
import { wordDeclension } from 'src/support/word-declension'
import { UserService } from 'src/features/user/api'
import { userName } from 'src/features/user/api/types'

const { requestCases, filter } = useCases()
const courtStore = useCourtStore()
const judgeStore = useJudgeStore()
const regionStore = useRegionStore()
const companyStore = useCompanyStore()
const casesStore = useCasesStore()

const courtOptions = computed(() =>
  courtStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)
const companyOptions = computed(() =>
  companyStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)
const judgeOptions = computed(() =>
  judgeStore.items.map((item) => ({ label: judgeName(item), value: item.id!! })),
)
const regionOptions = computed(() =>
  regionStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)
const userOptions = ref<any[]>()

const statusOptions = [
  {
    label: 'Создан',
    value: 'OPEN',
  },
  {
    label: 'В работе',
    value: 'IN_PROGRESS',
  },
  {
    label: 'Выполнен',
    value: 'DONE',
  },
]
const priorityOptions = [
  {
    label: 'Срочный',
    value: 'HIGH',
  },
  {
    label: 'Не срочный',
    value: 'LOW',
  },
]

type NumberOption = {
  label: string
  value: number
}

type StringOption = {
  label: string
  value: string
}
const search = ref<string>()
const selectedCourts = ref<NumberOption[]>([])
const selectedCompanies = ref<NumberOption[]>([])
const selectedJudges = ref<NumberOption[]>([])
const selectedRegions = ref<NumberOption[]>([])
const selectedAuthors = ref<NumberOption[]>([])
const selectedExperts = ref<NumberOption[]>([])
const selectedManagers = ref<NumberOption[]>([])
const selectedHeads = ref<NumberOption[]>([])
const selectedStatuses = ref<{ [key: number]: CaseStatus }>([])
const selectedPriorities = ref<{ [key: number]: CasePriority }>([])
const dateDefaultValue = { from: '', to: '' }
const createdAt = ref<DateRange>(dateDefaultValue)
const deadline = ref<DateRange>(dateDefaultValue)
const selectedExpertiseType = ref<StringOption[]>([])

type DateRange = {
  from: string | undefined
  to: string | undefined
}

const updateCreatedAt = () => {
  console.log(createdAt.value)
}

const numberOptionValues = (options: Ref<any[]>): number[] => {
  return options.value.map((option) => option.value.id)
}

const applyFilters = async () => {
  const toISO = (date: string | undefined) => {
    return _.isEmpty(date) ? undefined : dayjs(date).toISOString()
  }

  await requestCases({
    search: search.value,
    status: Object.values(selectedStatuses.value),
    priority: Object.values(selectedPriorities.value),
    courtId: numberOptionValues(selectedCourts),
    judgeId: numberOptionValues(selectedJudges),
    companyId: numberOptionValues(selectedCompanies),
    regionId: numberOptionValues(selectedRegions),
    createdAtFrom: toISO(createdAt.value.from),
    createdAtTo: toISO(createdAt.value.to),
    deadlineFrom: toISO(deadline.value.from),
    deadlineTo: toISO(deadline.value.to),
    createdById: numberOptionValues(selectedAuthors),
    expertId: numberOptionValues(selectedExperts),
    managerId: numberOptionValues(selectedManagers),
    headId: numberOptionValues(selectedHeads),
    expertiseType: selectedExpertiseType.value.map((option) => option.value) as ExpertiseType[],
  })
}

const clearFilters = async () => {
  selectedCourts.value = []
  selectedCompanies.value = []
  selectedJudges.value = []
  selectedRegions.value = []
  selectedStatuses.value = []
  selectedPriorities.value = []
  createdAt.value = dateDefaultValue
  deadline.value = dateDefaultValue
  search.value = ''
  selectedAuthors.value = []
  selectedExperts.value = []
  selectedManagers.value = []
  selectedHeads.value = []

  await requestCases({})
}

onMounted(async () => {
  const gettedUsers = await UserService.getAllUsers()
  userOptions.value = gettedUsers.data.map((u) => ({
    label: userName(u),
    value: u,
  }))
})

const expertiseTypeOptions = Object.entries(ExpertiseTypeEnum).map(([value, label]) => ({
  label,
  value,
}))
</script>

<style lang="scss" scoped>
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 48%);
  gap: 16px;
}
</style>
<style lang="scss">
.filter-search-input .q-field__control {
  padding-inline: 16px !important;
}

/* Для выбранных чекбоксов */
// .q-option-group .q-checkbox__inner--truthy .q-checkbox__bg {
//   border-color: green !important;
//   background-color: green !important;
// }
</style>
