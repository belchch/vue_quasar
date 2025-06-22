<template>
    <div class="row q-col-gutter-lg text">
        <template v-if="selectedCase">
            <div class="col-9">
                <q-card class="shadow_custom rounded-borders text-grey-8" bordered>
                    <InspectionInformationBlock title="Общая информация" template="8-4">
                        <template #appendTitle>
                            <q-btn
                                icon="edit" 
                                class="edit-btn" 
                                size="sm" 
                                color="primary"
                                @click="openDialog"
                            />
                        </template>
                        <template #s1>
                            <div style="color:var(--q-accent)" class="text-weight-medium q-mb-sm">Дело № {{
                                selectedCase?.number }}</div>
                            <div class="grid-2 items-center" style="column-gap: 8px;grid-template-columns: 150px auto;">
                                <div>Дата создания:</div>
                                <span>{{ createdAt.format('DD.MM.YYYY') }}</span>
                                <div>Дата сдачи: </div>
                                <span style="width: fit-content;">{{ deadline.format('DD.MM.YYYY') }}</span>
                                <span>Адрес:</span>
                                <span>{{ selectedCase.facilityAddress }}</span>
                            </div>
                            <div class="grid-2 q-mt-md items-center2"
                                style="column-gap: 8px;grid-template-columns: 150px auto;">
                                <span>Автор:</span>
                                <span>{{ selectedCase.createdBy? userName(selectedCase.createdBy) : '' }}</span>
                                <span>Менеджер:</span>
                                <span>{{ selectedCase.manager? userName(selectedCase.manager) : '' }}</span>
                                <span>Руководитель:</span>
                                <span>{{ selectedCase.head? userName(selectedCase.head) : '' }}</span>
                                <span>Эксперт:</span>
                                <span>{{ selectedCase.expert? userName(selectedCase.expert) : '' }}</span>
                            </div>
                        </template>
                        <template #s2>
                            <div class="grid-2 q-mt-md items-center2"
                                style="column-gap: 8px;grid-template-columns: 90px auto;">
                                <span>Статус:</span>
                                <span :class="statusClass">{{ statusLabel }}</span>
                                <span>Приоритет:</span>
                                <span :class="priorityClass">{{ priorityLabel
                                }}</span>
                            </div>
                        </template>
                    </InspectionInformationBlock>

                    <InspectionInformationBlock title="Организация" template="4-4-4">
                        <template #s1>
                            ИНН
                            <div>{{ selectedCase.company?.inn }}</div>
                        </template>
                        <template #s2>
                            Наименовние
                            <div>{{ selectedCase.company?.name }}</div>
                        </template>
                        <template #s3>
                            Регион
                            <div>-</div>
                        </template>
                    </InspectionInformationBlock>

                    <InspectionInformationBlock title="Объект исследнования" template="6-6">
                        <template #s1>
                            Тип объекта
                            <div>-</div>
                        </template>
                        <template #s2>
                            Адрес осмотра
                            <div>{{ selectedCase.facilityAddress }}</div>
                        </template>
                    </InspectionInformationBlock>

                    <InspectionInformationBlock title="" template="6-6">
                        <template #s1>
                            <q-toolbar-title ellipsis class="text-weight-mediu2 q-pb-lg">Суд</q-toolbar-title>
                            <div class="grid-2 items-center gap-sm2" style="grid-template-columns: 150px auto;">
                                <div>Дело:</div>
                                <span>1</span>
                                <div>Количетво томов:</div>
                                <span>1</span>
                                <div>Дата определения: </div>
                                <span>-</span>
                                <span>Суд:</span>
                                <span>{{ selectedCase.court?.name }}</span>
                            </div>
                        </template>
                        <template #s2>
                            <q-toolbar-title ellipsis class="text-weight-mediu2 q-pb-lg">Судья</q-toolbar-title>
                            <div class="grid-2 items-center gap-sm2">
                                <div>Судья:</div>
                                <span>{{ selectedCase.judge ? judgeName(selectedCase.judge) : '' }}</span>
                                <div>ФИО контактного лица:</div>
                                <span class="text-weight-medium relative">-</span>
                                <div>Телефон контактного лица:</div>
                                <span class="text-weight-medium relative"></span>
                                <div>Email контактного лица:</div>
                                <span class="text-weight-medium relative"></span>
                            </div>
                        </template>
                    </InspectionInformationBlock>
                </q-card>
            </div>
            <div class="col-3">
                <q-card bordered class="shadow_custom rounded-borders text-grey-8">
                    <q-card-section class="row card-wrapper" style="border-bottom: 1px solid lightgrey;">
                        <div class="col-12">
                            <q-toolbar-title ellipsis class="q-pb-sm">Статус</q-toolbar-title>
                            <q-option-group square dense2 size="sm" color="secondary" type="radio" class="text-grey-8"
                                v-model="selectedCase.status" :options="statusOptions" @update:model-value="onChange" />
                            
                            <q-toolbar-title ellipsis class="q-pb-sm q-pl-none q-mt-lg">Приоритет</q-toolbar-title>
                            <q-toggle v-model="selectedCase.priority" label="Срочный" color="secondary"
                                true-value="HIGH" false-value="LOW" @update:model-value="onChange" />
                        </div>
                    </q-card-section>
                </q-card>
                <InspectionLocations/>
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
</template>

<script setup lang="ts">
import { computed, ref,onMounted } from 'vue'
import dayjs from 'dayjs'

import { useUserStore } from 'src/features/user/stores/user-store'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import InspectionInformationBlock from './InspectionInformationBlock.vue'
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store'
import { storeToRefs } from 'pinia';
import { useSelectedCaseService } from 'src/features/case/composables/selected-case'
import _ from 'lodash'
import { judgeName } from 'src/features/lookup/judge/stores/types'
import { userName } from 'src/features/user/api/types'
import UpdateForm from './form/UpdateForm.vue'
import InspectionLocations from './InspectionLocations.vue'
const { selectedCase } = storeToRefs(useSelectedCaseStore())
const { updateCase } = useSelectedCaseService()

const deadline = computed(() => dayjs(selectedCase.value?.deadline))
const createdAt = computed(() => dayjs(selectedCase.value?.createdAt))
const userStore = useUserStore()
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


const openDialog = () => {  
  createDialogOpen.value = true
};


const save = async () => {
    console.log(selectedCase.value)
    await updateCase()
}

const handleSave = async (localCase: any) => {
    if (localCase) {
        selectedCase.value = localCase
        await save()
    }
    console.log('handleSave', localCase)
    createDialogOpen.value = false;
}

const onChange = async () => {
    await save()
}
const resetForm = () => {
  createDialogOpen.value = false
}


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
    return statusOptions.find(option => option.value === selectedCase.value?.status)?.label || ''
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
