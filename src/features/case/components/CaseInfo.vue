<template>
  <div class="row-md column-xs column-sm q-col-gutter-sm text">
    <template v-if="selectedCase">
      <div class="col-9">
        <q-card class="shadow_custom rounded-borders text-grey-8" bordered>
          <InspectionInformationBlock title="Общая информация" template="8-4">
            <template #appendTitle v-if="hasPermission(['case.update'])">
              <q-btn
                flat
                icon="edit"
                class="edit-btn"
                size="sm"
                color="primary"
                @click="openDialog"
              />
            </template>
            <template #s1>
              <div style="color: var(--q-accent)" class="text-weight-medium q-mb-sm">
                Дело (договор) № {{ selectedCase?.number }}
              </div>
              <div
                class="grid-2 items-center"
                style="column-gap: 8px; grid-template-columns: 150px auto"
              >
                <div>Дата создания:</div>
                <span>{{ createdAt.format('DD.MM.YYYY') }}</span>
                <div>Дата сдачи:</div>
                <span style="width: fit-content">{{ deadline.format('DD.MM.YYYY') }}</span>
                <div>Дата начала осмотра:</div>
                <span style="width: fit-content">{{ inspectionStartAt }}</span>
                <div>Дата окончания осмотра:</div>
                <span style="width: fit-content">{{ inspectionEndAt }}</span>
                <span>Адрес:</span>
                <span>{{ selectedCase.facilityAddress }}</span>
              </div>
              <div
                class="grid-2 q-mt-md items-center2"
                v-show="false"
                style="column-gap: 8px; grid-template-columns: 150px auto"
              >
                <span>Автор:</span>
                <span>{{ selectedCase.createdBy ? userName(selectedCase.createdBy) : '' }}</span>
                <span>Менеджер:</span>
                <span>{{ selectedCase.manager ? userName(selectedCase.manager) : '' }}</span>
                <span>Руководитель:</span>
                <span>{{ selectedCase.head ? userName(selectedCase.head) : '' }}</span>
                <span>Эксперт:</span>
                <span>{{ selectedCase.expert ? userName(selectedCase.expert) : '' }}</span>
              </div>
            </template>
            <template #s2>
              <div
                class="grid-2 q-mt-md items-center2"
                style="column-gap: 8px; grid-template-columns: 90px auto"
              >
                <span>Статус:</span>
                <span :class="statusClass">{{ statusLabel }}</span>
                <span>Приоритет:</span>
                <span :class="priorityClass">{{ priorityLabel }}</span>
              </div>
            </template>
          </InspectionInformationBlock>
          <InspectionInformationBlock title="Ответственные" template="4-4-4">
            <template #appendTitle v-if="hasPermission(['case.update'])">
              <q-btn
                flat
                icon="edit"
                class="edit-btn"
                size="sm"
                color="primary"
                @click="openUpdateResponsablesDialog = true"
              />
            </template>
            <template #s1>
              <div
                class="grid-2 items-center2"
                style="column-gap: 8px; grid-template-columns: 150px auto"
              >
                <span>Автор:</span>
                <span>{{ selectedCase.createdBy ? userName(selectedCase.createdBy) : '' }}</span>
                <span>Менеджер:</span>
                <span>{{ selectedCase.manager ? userName(selectedCase.manager) : '' }}</span>
                <span>Руководитель:</span>
                <span>{{ selectedCase.head ? userName(selectedCase.head) : '' }}</span>
              </div>
            </template>
            <template #s2>
              <span>Эксперты:</span>
              <span v-if="selectedCase.experts?.length">
                <div v-for="expert in selectedCase.experts" :key="expert.id!">
                  {{ userName(expert) }}
                </div>
              </span>
              <div v-else>-</div>
            </template>
            <template #s3>
              <span>Осмотрщик:</span>
              <span v-if="selectedCase.inspector">
                <div>{{ userName(selectedCase.inspector) }}</div>
              </span>
              <div v-else>-</div>
            </template>
          </InspectionInformationBlock>
          <InspectionInformationBlock title="Организация" template="4-4-4">
            <template #appendTitle v-if="hasPermission(['case.update'])">
              <q-btn
                icon="edit"
                flat
                class="edit-btn"
                size="sm"
                color="primary"
                @click="openUpdateOrganizationDialog = true"
              />
            </template>
            <template #s1>
              ИНН
              <div>{{ selectedCase.company?.inn }}</div>
            </template>
            <template #s2>
              Наименование
              <div>{{ selectedCase.company?.name }}</div>
            </template>
            <template #s3>
              Регион
              <div>{{ selectedCase.region?.name }}</div>
            </template>
          </InspectionInformationBlock>

          <InspectionInformationBlock title="Объект исследования" template="6-6">
            <template #appendTitle v-if="hasPermission(['case.update'])">
              <q-btn
                icon="edit"
                flat
                class="edit-btn"
                size="sm"
                color="primary"
                @click="openUpdateObjectDialog = true"
              />
            </template>
            <template #s1>
              Тип объекта
              <div>{{ objectTypeText }}</div>
            </template>
            <template #s2>
              Адрес осмотра
              <div>{{ selectedCase.facilityAddress }}</div>
            </template>
          </InspectionInformationBlock>

          <InspectionInformationBlock title="" template="6-6">
            <template #appendTitle v-if="hasPermission(['case.update'])">
              <q-btn
                style="position: absolute; right: 32px"
                icon="edit"
                flat
                class="edit-btn"
                size="sm"
                color="primary"
                @click="openUpdateJudgeDialog = true"
              />
            </template>
            <template #s1>
              <q-toolbar-title ellipsis class="text-weight-mediu2 q-pb-lg"
                >Суд (инициатор)</q-toolbar-title
              >
              <div class="grid-2 items-center gap-sm2" style="grid-template-columns: 150px auto">
                <div>Инициатор:</div>
                <span>{{ selectedCase.initiator || '-' }}</span>
                <div>Дело:</div>
                <span>{{ selectedCase.courtCaseNum || '-' }}</span>
                <div>Количество томов:</div>
                <span>{{ selectedCase.numberOfVolumes }}</span>
                <div>Дата определения:</div>
                <span>{{ determinationDate || '-' }}</span>
                <span>Суд:</span>
                <span>{{ selectedCase.court?.name || '-' }}</span>
              </div>
            </template>
            <template #s2>
              <q-toolbar-title ellipsis class="text-weight-mediu2 q-pb-lg"
                >Судья (заказчик)</q-toolbar-title
              >
              <div class="grid-2 items-center gap-sm2">
                <div>Заказчик:</div>
                <span>{{ selectedCase.customer || '-' }}</span>
                <div>Судья:</div>
                <span>{{ selectedCase.judge ? judgeName(selectedCase.judge) : '-' }}</span>
                <div>ФИО контактного лица:</div>
                <span class="text-weight-medium relative">{{
                  selectedCase.contactPerson || '-'
                }}</span>
                <div>Телефон контактного лица:</div>
                <span class="text-weight-medium relative">
                  {{ selectedCase.contactPhone || '-' }}
                </span>
                <div>Email контактного лица:</div>
                <span class="text-weight-medium relative">{{
                  selectedCase.contactEmail || '-'
                }}</span>
              </div>
            </template>
          </InspectionInformationBlock>
        </q-card>
        <CaseCommets />
      </div>
      <div class="col-3 order-xs-first order-sm-first order-md-none">
        <q-card bordered class="shadow_custom rounded-borders text-grey-8">
          <q-card-section
            class="row row-xs column-md card-wrapper"
            style="border-bottom: 1px solid lightgrey"
          >
            <div class="col-xs-6 col-sm-6 col-md-12">
              <q-toolbar-title ellipsis class="q-pb-sm">Статус</q-toolbar-title>
              <q-option-group
                square
                dense2
                size="sm"
                color="secondary"
                type="radio"
                class="text-grey-8"
                v-model="selectedCase.status"
                :options="statusOptions"
                @update:model-value="onChange"
                :disable="!hasPermission(['case.update.status'])"
              />
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12">
              <q-toolbar-title
                ellipsis
                class="q-pb-sm q-pl-none q-mt-xs-none q-mt-sm-none q-mt-md-lg q-mt-lg-lg"
                >Приоритет</q-toolbar-title
              >
              <q-toggle
                v-model="selectedCase.priority"
                label="Срочный"
                color="secondary"
                true-value="HIGH"
                false-value="LOW"
                @update:model-value="onChange"
                :disable="!hasPermission(['case.update.priority'])"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </div>

  <q-dialog v-if="selectedCase" v-model="createDialogOpen" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <UpdateForm
        v-model="selectedCase"
        :statusOptions="statusOptions"
        @save="handleSave"
        @reset="resetForm"
      />
    </q-card>
  </q-dialog>
  <q-dialog v-if="selectedCase" v-model="openUpdateJudgeDialog" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <UpdateFormJudge
        v-model="selectedCase"
        @save="handeSaveJudge"
        @reset="openUpdateJudgeDialog = false"
      />
    </q-card>
  </q-dialog>
  <q-dialog v-if="selectedCase" v-model="openUpdateOrganizationDialog" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <UpdateFormOrganization
        v-model="selectedCase"
        @save="handeSaveOrganization"
        @reset="openUpdateOrganizationDialog = false"
      />
    </q-card>
  </q-dialog>
  <!-- Объект исследования -->
  <q-dialog v-if="selectedCase" v-model="openUpdateObjectDialog" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <UpdateFormObject
        v-model="selectedCase"
        @save="handeSaveObject"
        @reset="openUpdateObjectDialog = false"
      />
    </q-card>
  </q-dialog>
  <!-- Ответственные -->
  <q-dialog v-if="selectedCase" v-model="openUpdateResponsablesDialog" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <UpdateFormResponsables
        v-model="selectedCase"
        @save="handeSaveResponsables"
        @reset="openUpdateResponsablesDialog = false"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import dayjs from 'dayjs'

import { useUserStore } from 'src/features/user/stores/user-store'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import InspectionInformationBlock from 'src/features/inspection/components/InspectionInformationBlock.vue'
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store'
import { storeToRefs } from 'pinia'
import { useSelectedCaseService } from 'src/features/case/composables/selected-case'
import _ from 'lodash'
import { judgeName } from 'src/features/lookup/judge/stores/types'
import { userName } from 'src/features/user/api/types'
import { InspectionObjectTypeEnum } from 'src/features/case/stores/types'
import UpdateForm from 'src/features/inspection/components/form/UpdateForm.vue'
import InspectionLocations from 'src/features/inspection/components/InspectionLocations.vue'
import CaseCommets from 'src/features/case/components/comments/CaseCommets.vue'
import UpdateFormJudge from 'src/features/inspection/components/form/UpdateFormJudge.vue'
import UpdateFormOrganization from 'src/features/inspection/components/form/UpdateFormOrganization.vue'
import UpdateFormObject from 'src/features/inspection/components/form/UpdateFormObject.vue'
import UpdateFormResponsables from 'src/features/inspection/components/form/UpdateFormResponsables.vue'
const { selectedCase } = storeToRefs(useSelectedCaseStore())
const { updateCase } = useSelectedCaseService()

const dateOrNull = (date?: string) => {
  return date && dayjs(date).format('DD.MM.YYYY')
}
const dateTimeOrNull = (date?: string) => {
  return date && dayjs(date).format('DD.MM.YYYY HH:mm')
}

const deadline = computed(() => dayjs(selectedCase.value?.deadline))
const createdAt = computed(() => dayjs(selectedCase.value?.createdAt))
const inspectionStartAt = computed(() => dateTimeOrNull(selectedCase.value?.inspectionStartAt))
const inspectionEndAt = computed(() => dateTimeOrNull(selectedCase.value?.inspectionEndAt))
const determinationDate = computed(() => dateOrNull(selectedCase.value?.determinationDate))
const { hasPermission } = useUserStore()
const companyStore = useCompanyStore()
const judgeStore = useJudgeStore()
const courtStore = useCourtStore()
const regionStore = useRegionStore()

onMounted(async () => {
  await courtStore.requestLookup()
  await judgeStore.requestLookup()
  await companyStore.requestLookup()
  await regionStore.requestLookup()
})

const createDialogOpen = ref(false)
const openUpdateJudgeDialog = ref(false)
const openUpdateOrganizationDialog = ref(false)
const openUpdateObjectDialog = ref(false)
const openUpdateResponsablesDialog = ref(false)

const openDialog = () => {
  createDialogOpen.value = true
}

const save = async () => {
  console.log(selectedCase.value)
  await updateCase()
}
const handeSaveResponsables = async (localCase: any) => {
  if (localCase) {
    selectedCase.value = localCase
    await save()
  }
  openUpdateResponsablesDialog.value = false
}
const handeSaveObject = async (localCase: any) => {
  if (localCase) {
    selectedCase.value = localCase
    await save()
  }
  openUpdateObjectDialog.value = false
}
const handeSaveOrganization = async (localCase: any) => {
  if (localCase) {
    selectedCase.value = localCase
    await save()
  }
  openUpdateOrganizationDialog.value = false
}
const handeSaveJudge = async (localCase: any) => {
  if (localCase) {
    selectedCase.value = localCase
    await save()
  }
  openUpdateJudgeDialog.value = false
}
const handleSave = async (localCase: any) => {
  if (localCase) {
    selectedCase.value = localCase
    await save()
  }
  console.log('handleSave', localCase)
  createDialogOpen.value = false
}

const onChange = async () => {
  await save()
}
const resetForm = () => {
  createDialogOpen.value = false
}

const objectTypeText = computed(() => {
  if (!selectedCase.value?.inspectionObjectType) return '-'
  return InspectionObjectTypeEnum[selectedCase.value.inspectionObjectType]
})

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
const statusLabel = computed(() => {
  return statusOptions.find((option) => option.value === selectedCase.value?.status)?.label || ''
})
const priorityLabel = computed(() => {
  return selectedCase.value?.priority == 'HIGH' ? 'Срочный' : 'Не срочный'
})

const priorityClass = computed(() => {
  switch (selectedCase.value?.priority) {
    case 'HIGH':
      return 'text-negative text-weight-medium'
    default:
      return ''
  }
})
const computeStatusClass = () => {
  switch (selectedCase.value?.status) {
    case 'OPEN':
      return ''
    case 'IN_PROGRESS':
      return ''
    case 'DONE':
      return ''
  }
}

const statusClass = computed(() => computeStatusClass())
</script>

<style scoped lang="scss">
.grid-2 {
  display: grid;
  grid-template-columns: 200px auto;
  column-gap: 32px;
  // width: fit-content;
}

.can-edit {
  position: relative;
  width: fit-content;
}

.edit-icon {
  color: $grey-5;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -22px;
  transition: all 0.3s ease;

  &:hover {
    color: var(--q-primary);
  }
}

.edit-btn {
  align-self: flex-start;
  aspect-ratio: 1;
  width: 32px;
}
.card-wrapper {
  padding: 32px 32px 40px;
}

.q-input {
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
}

.main-save {
  // padding: 16px;
  margin-inline: auto;
  display: flex;
  margin-block: 16px;
}
</style>
<style lang="scss">
.input-slim {
  width: fit-content;
  font-size: inherit;

  .q-field__control {
    height: 28px;
    width: fit-content;
    min-height: 0;
  }

  .q-field__marginal {
    height: 100%;
    min-height: 0;
  }

  .q-field__control {
    min-height: 0 !important;
  }

  .q-field__native {
    min-height: 0 !important;
  }

  input {
    padding-block: 0;
    field-sizing: content;
    width: fit-content;
  }
}
</style>
