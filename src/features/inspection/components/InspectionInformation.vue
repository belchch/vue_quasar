<template>

    <div class="row q-col-gutter-lg text">
        <template v-if="caseData">
            <div class="col-9">
                <q-card class="shadow_custom rounded-borders text-grey-8" bordered>
                    <InspectionInformationBlock title="Общая информация" template="8-4">
                        <template #s1>
                            <div style="color:var(--q-accent)" class="text-weight-medium q-mb-sm">Дело № {{
                                props.case?.number }}</div>
                            <div class="grid-2 items-center" style="column-gap: 8px;grid-template-columns: 150px auto;">
                                <div>Дата создания:</div>
                                <span>{{ createdAt.format('DD.MM.YYYY') }}</span>
                                <div>Дата сдачи: </div>
                                <span style="width: fit-content;">{{
                                    deadline.format('DD.MM.YYYY') }}
                                    <q-btn v-if="isEditMode" icon="event" flat2 no-caps round2 color="accent"
                                        class=" q-ml-sm" size="xs" style="margin-top: -3px;">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date color="grey" v-model="caseData.deadline" minimal>
                                                <div class="row items-center justify-end q-gutter-sm">
                                                    <q-btn label="Отмена" color="primary" flat v-close-popup />
                                                    <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-btn>
                                </span>
                                <span>Адрес:</span>
                                <TextToInput :isEditMode="isEditMode" v-model="caseData.facilityAddress" />
                            </div>
                            <div class="grid-2 q-mt-md items-center2"
                                style="column-gap: 8px;grid-template-columns: 150px auto;">
                                <span>Автор:</span>
                                <span>Дементьев Дмитрий Сергеевич</span>
                                <span>Менеджер:</span>
                                <span>-</span>
                                <span>Руководитель:</span>
                                <span>-</span>
                                <span>Эксперт:</span>
                                <span>Захаров Игорь Сергеевич</span>
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
                            <div>{{ caseData.company.inn }}</div>
                        </template>
                        <template #s2>
                            Наименовние
                            <div>
                                <TextToSelect :isEditMode="isEditMode" classnames="title" v-model="caseData.company"
                                    :options="companyOptions" />
                            </div>
                        </template>
                        <template #s3>
                            Регион
                            <div>Москва</div>
                        </template>
                    </InspectionInformationBlock>

                    <InspectionInformationBlock title="Объект исследнования" template="6-6">
                        <template #s1>
                            Тип объекта
                            <div>-</div>
                        </template>
                        <template #s2>
                            Адрес осмотра
                            <div>
                                <TextToInput :isEditMode="isEditMode" v-model="caseData.facilityAddress" />
                            </div>
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
                                <span style="width: fit-content;">{{
                                    deadline.format('DD.MM.YYYY') }}
                                    <q-btn v-if="isEditMode" icon="event" flat2 no-caps round2 color="accent"
                                        class=" q-ml-sm" size="xs" style="margin-top: -3px;">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date color="grey" v-model="caseData.deadline" minimal>
                                                <div class="row items-center justify-end q-gutter-sm">
                                                    <q-btn label="Отмена" color="primary" flat v-close-popup />
                                                    <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-btn>
                                </span>
                                <span>Адрес суда:</span>
                                <TextToInput :isEditMode="isEditMode" v-model="caseData.facilityAddress" />
                            </div>
                        </template>
                        <template #s2>
                            <q-toolbar-title ellipsis class="text-weight-mediu2 q-pb-lg">Судья</q-toolbar-title>
                            <div class="grid-2 items-center gap-sm2">
                                <div>Судья:</div>
                                <TextToSelect :isEditMode="isEditMode" v-model="caseData.judge"
                                    :options="judgeOptions" />
                                <!-- <span class="text-weight-medium relative">{{ judgeLabel }}</span> -->
                                <div>ФИО контактного лица:</div>
                                <span class="text-weight-medium relative">-</span>
                                <div>Телефон контактного лица:</div>
                                <span class="text-weight-medium relative">+7 (948) 874-83-01</span>
                                <div>Email контактного лица:</div>
                                <span class="text-weight-medium relative">email@email.com</span>
                            </div>
                        </template>
                    </InspectionInformationBlock>
                    <q-btn v-if="isEditMode" icon="check" label="Сохранить" class="main-save" color="positive"
                        @click="isEditMode = !isEditMode" />
                </q-card>
            </div>
            <div class="col-3">
                <q-card bordered class="shadow_custom rounded-borders text-grey-8">
                    <q-card-section class="row card-wrapper" style="border-bottom: 1px solid lightgrey;">
                        <q-btn v-if="!isEditMode" icon="edit" label="Редактировать" class="full-width" color="primary"
                            @click="isEditMode = !isEditMode" no-caps />
                        <q-btn v-else icon="check" label="Сохранить" class="full-width" color="positive"
                            @click="isEditMode = !isEditMode" />
                        <div class="col-6 q-mt-none q-pt-lg">
                            <div class="text-grey-8 text-weight-medium title q-pa-sm">Статус</div>
                            <q-option-group square dense2 size="sm" color="secondary" type="radio" class="text-grey-8"
                                v-model="caseData.status" :options="statusOptions" />
                            <q-toggle v-model="localPriority" label="Срочный" color="secondary" true-value="HIGH"
                                false-value="LOW" />
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Case, CaseStatus } from 'src/features/case/stores/types'
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import TextToInput from './form/TextToInput.vue';
import TextToSelect from './form/TextToSelect.vue';
import { useUserStore } from 'src/features/user/stores/user-store'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import InspectionInformationBlock from './InspectionInformationBlock.vue'

const props = defineProps<{
    case: Case | undefined,
}>();

const deadline = computed(() => dayjs(props.case?.deadline))
const createdAt = computed(() => dayjs(props.case?.createdAt))
const isEditMode = ref(false)
const caseData = ref<Case | null>(null)
const userStore = useUserStore()
const companyStore = useCompanyStore()
const judgeStore = useJudgeStore()

const companyOptions = companyStore.items.map(item => ({
    label: item.name,
    value: item.id,
    inn: item.inn
}))
const judgeOptions = judgeStore.items.map(item => ({
    label: item.firstName + ' ' + item.lastName + ' ' + item.middleName,
    value: item.id
}))
// Инициализируем данные
watch(() => props.case, (newVal) => {
    if (newVal) {
        caseData.value = { ...newVal }
    } else {
        caseData.value = null
    }
}, { immediate: true })

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
    return statusOptions.find(option => option.value === caseData.value?.status)?.label || ''
})
const priorityLabel = computed(() => {
    return localPriority.value == 'HIGH' ? 'Срочный' : 'Не срочный'
    // return caseData.value?.priority == 'HIGH' ? 'Срочный' : 'Не срочный'
})
const localPriority = ref(caseData.value?.priority)
const priorityClass = computed(() => {
    switch (caseData.value?.priority) {
        case 'HIGH':
            return 'text-negative text-weight-medium'
        default:
            return ''
    }
})
const computeStatusClass = () => {
    switch (props.case?.status) {
        case 'OPEN':
            return ''
        case 'IN_PROGRESS':
            return ''
        case 'DONE':
            return ''
    }
}

const statusClass = computed(() => computeStatusClass())
const judgeLabel = computed(() => {
    const judge = judgeStore.items.find(option => option.id === caseData.value?.judge?.id) || null
    if (!judge) return ''
    return `${judge.firstName} ${judge.middleName} ${judge.lastName}`
})
</script>

<style scoped lang="scss">
.text {
    // font-size: 1rem;
    // font-weight: 400;
    // line-height: 1.75rem;
    // letter-spacing: 0.00937em;
}

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

.text {
    // font-size: 16px;
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
