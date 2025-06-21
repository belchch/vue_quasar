<template>
    <div class="row q-col-gutter-lg">
        <template v-if="caseData">
            <div class="col-9">
                <q-card class="shadow_custom rounded-borders text-grey-8" bordered>
                    <q-card-section class="row card-wrapper" style="border-bottom: 1px solid lightgrey;">
                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <q-toolbar-title ellipsis class="text-weight-mediu2 q-pb-lg">Общая
                                информация</q-toolbar-title>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <q-btn v-if="!isEditMode" dense icon="edit" label="Редактировать"
                                class="float-right bg-primary-15" color="primary" @click="isEditMode = !isEditMode" />
                            <q-btn v-else dense icon="check" label="Сохранить" class="float-right bg-green-1"
                                color="positive" @click="isEditMode = !isEditMode" />
                        </div>

                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <div class="text-subtitle1 text-grey-7">
                                <div class="text-weight-medium text-h6 q-mb-sm">Дело № {{ props.case?.number }}</div>
                                <div class="grid-2 items-center gap-sm2">
                                    <div>Дата создания:</div>
                                    <span class="text-weight-medium">{{ createdAt.format('DD.MM.YYYY') }}</span>
                                    <div>Дата сдачи: </div>
                                    <span class="text-weight-medium relative">{{ deadline.format('DD.MM.YYYY') }}
                                        <q-btn v-if="isEditMode" icon="event" flat no-caps round
                                            class="bg-primary-15 text-primary q-ml-sm q-mr-lg absolute" size="sm">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date dark color="grey" v-model="caseData.deadline" minimal>
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
                                <div class="grid-2 q-mt-lg items-center">
                                    <span>Автор:</span>
                                    <!-- <TextToSelect :isEditMode="isEditMode" v-model="caseData.createdBy.username" /> -->
                                    <span class="text-weight-medium ">Дементьев Дмитрий Сергеевич</span>
                                    <span>Менеджер:</span>
                                    <span class="text-weight-medium ">Дементьев Дмитрий Сергеевич</span>
                                    <span>Руководитель:</span>
                                    <span class="text-weight-medium ">Дементьев Дмитрий Сергеевич</span>
                                    <span>Эксперт:</span>
                                    <span class="text-weight-medium ">Дементьев Дмитрий Сергеевич</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 q-mt-lg q-pt-xs">
                            <div class="text-subtitle1 text-grey-7">
                                <div class="q-mb-md">
                                    <span class="text-weight-medium text-h7 q-mr-md">Статус</span>
                                    <span class=" text-weight-medium2 bg-grey-4 can-edit"
                                        style="width: fit-content; border-radius: 4px;padding: 4px 10px;margin-top: 4px;">{{
                                            statusLabel }}
                                        <q-icon name="edit" class="edit-icon">
                                            <q-popup-edit v-model="caseData.status" v-slot="scope" buttons>
                                                <q-select outlined dense v-model="scope.value"
                                                    :options="statusOptions" />
                                            </q-popup-edit>
                                        </q-icon>
                                    </span>
                                </div>
                                <div>
                                    <span class="text-weight-medium text-h7 q-mr-md ">Приоритет</span>
                                    <span class="text-weight-medium2 bg-grey-4 can-edit"
                                        style="width: fit-content; border-radius: 4px;padding: 4px 10px;margin-top: 4px;">{{
                                            props.case?.priority }}
                                        <q-icon name="edit" class="edit-icon">
                                            <q-popup-edit v-model="caseData.status" v-slot="scope" buttons>
                                                <q-select outlined dense v-model="scope.value"
                                                    :options="statusOptions" />
                                            </q-popup-edit>
                                        </q-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="row card-wrapper" style="border-bottom: 1px solid lightgrey;">
                        <div class="col-12">
                            <q-toolbar-title ellipsis class="text-weight-medium q-pb-lg">Организация</q-toolbar-title>
                        </div>
                        <div class="col-4">
                            Инн
                            <div class="text-weight-medium title">{{ caseData.company.inn }}</div>
                        </div>
                        <div class="col-4">
                            Наименовние
                            <div class="text-weight-medium title">
                                <TextToSelect :isEditMode="isEditMode" classnames="title" v-model="caseData.company"
                                    :options="companyOptions" />
                            </div>
                        </div>
                        <div class="col-4">
                            Регион
                            <div class="text-weight-medium title">Москва</div>
                        </div>
                    </q-card-section>
                    <q-card-section class="row card-wrapper" style="border-bottom: 1px solid lightgrey;">
                        <div class="col-12">
                            <q-toolbar-title ellipsis class="text-weight-medium q-pb-lg">Объект
                                исследнования</q-toolbar-title>
                        </div>
                        <div class="col-6">
                            Тип объекта
                            <div class="text-weight-medium title">-</div>
                        </div>
                        <div class="col-6">
                            Адрес осмотра
                            <div class="text-weight-medium title">
                                <TextToInput :isEditMode="isEditMode" v-model="caseData.facilityAddress" />
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="row card-wrapper" style="border-bottom: 1px solid lightgrey;">
                        <div class="col-6">
                            <q-toolbar-title ellipsis class="text-weight-medium q-pb-lg">Суд</q-toolbar-title>
                        </div>
                        <div class="col-6">
                            <q-toolbar-title ellipsis class="text-weight-medium q-pb-lg">Судья</q-toolbar-title>
                        </div>
                        <div class="col-6">
                            <div class="grid-2 items-center gap-sm2">
                                <div>Дело:</div>
                                <span class="text-weight-medium">1</span>
                                <div>Количетво томов:</div>
                                <span class="text-weight-medium">1</span>
                                <div>Дата определения: </div>
                                <span class="text-weight-medium relative">{{ deadline.format('DD.MM.YYYY') }}
                                    <q-btn v-if="isEditMode" icon="event" flat no-caps round
                                        class="bg-primary-15 text-primary q-ml-sm q-mr-lg absolute" size="sm">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date dark color="grey" v-model="caseData.deadline" minimal>
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
                        </div>
                        <div class="col-6">
                            <div class="grid-2 items-center gap-sm2">
                                <div>Судья:</div>
                                <span class="text-weight-medium relative">Дементьев Дмитрий Сергеевич</span>
                                <div>ФИО контактного лица:</div>
                                <span class="text-weight-medium relative">Дементьев Дмитрий Сергеевич</span>
                                <div>Телефон контактного лица:</div>
                                <span class="text-weight-medium relative">+7 (948) 874-83-01</span>
                                <div>Email контактного лица:</div>
                                <span class="text-weight-medium relative">email@email.com</span>
                            </div>
                        </div>
                    </q-card-section>
                    <q-btn flat icon="check" v-if="isEditMode" label="Сохранить" class="main-save bg-green-1"
                        color="positive" @click="isEditMode = !isEditMode" />
                    <!--Вариант с карандашами<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <q-toolbar-title ellipsis class="text-weight-medium q-pb-md">Общая информация</q-toolbar-title>
                <div class="text-subtitle1 text-grey-7">
                    <div class="text-weight-medium text-h6">Дело № {{ props.case?.number }}</div>
                    <div class="grid-2">
                        <div>Дата создания:</div> <span class="text-weight-medium">{{ createdAt.format('DD.MM.YYYY')
                            }}</span>

                        <div>Дата сдачи: </div><span class="text-weight-medium can-edit">{{
                            deadline.format('DD.MM.YYYY')
                        }}
                            <q-icon name="edit" class="edit-icon">
                                <q-popup-edit v-model="caseData.deadline" v-slot="scope" buttons>
        <q-date flat v-model="scope.value" minimal />
        </q-popup-edit>
        </q-icon>
        </span>
        <span>Адрес:</span> <span class="text-weight-medium can-edit">{{ caseData.facilityAddress
        }}</span>
        </div>
        <div class="grid-2 q-mt-lg">
            <span>Руководитель:</span>
            <span class="text-weight-medium can-edit">{{ caseData.createdBy.username }}
                <q-icon name="edit" class="edit-icon">
                    <q-popup-edit v-model="caseData.deadline" v-slot="scope" buttons>

        <q-date flat v-model="scope.value" minimal />
        </q-popup-edit>
        </q-icon>
        </span>
        <span>Эксперт:</span>
        <span class="text-weight-medium can-edit">{{ caseData.createdBy.username }}
            <q-icon name="edit" class="edit-icon">
                <q-popup-edit v-model="caseData.deadline" v-slot="scope" buttons>

        <q-date flat v-model="scope.value" minimal />
        </q-popup-edit>
        </q-icon>
        </span>
        </div>
        </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 q-mt-lg q-pt-xs">
            <div class="text-subtitle1 text-grey-7">
                <div class="q-mb-md">
                    <span class="text-weight-medium text-h7 q-mr-md">Статус</span>
                    <span class=" text-weight-medium2 bg-grey-4 can-edit"
                        style="width: fit-content; border-radius: 4px;padding: 4px 10px;margin-top: 4px;">{{
                            statusLabel }}
                        <q-icon name="edit" class="edit-icon">
                            <q-popup-edit v-model="caseData.status" v-slot="scope" buttons>
                                <q-select outlined dense v-model="scope.value" :options="statusOptions" />
                            </q-popup-edit>
                        </q-icon>
                    </span>
                </div>
                <div>
                    <span class="text-weight-medium text-h7 q-mr-md ">Приоритет</span>
                    <span class="text-weight-medium2 bg-grey-4 can-edit"
                        style="width: fit-content; border-radius: 4px;padding: 4px 10px;margin-top: 4px;">{{
                            props.case?.priority }}
                        <q-icon name="edit" class="edit-icon">
                            <q-popup-edit v-model="caseData.status" v-slot="scope" buttons>
                                <q-select outlined dense v-model="scope.value" :options="statusOptions" />
                            </q-popup-edit>
                        </q-icon>
                    </span>
                </div>
            </div>
        </div>-->
                </q-card>
            </div>
            <div class="col-3">
                <q-card bordered class="shadow_custom rounded-borders text-grey-8">
                    asd
                </q-card>
            </div>
        </template>
    </div>

    <div class="q-card q-card--bordered card_style no-shadow shadow_custom q-mt-xl">
        <div class="q-card__section q-card__section--vert row q-pb-lg" style="border-bottom: 1px solid lightgrey;">
            <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div class="q-toolbar row no-wrap items-center" role="toolbar" style="margin-top: 15px;">
                    <div class="q-avatar rounded-borders">
                        <div class="q-avatar__content row flex-center overflow-hidden">
                            <div class="text-primary" style="line-height: 0;">
                                <div class="q-avatar" style="font-size: 32px;">
                                    <div class="q-avatar__content row flex-center overflow-hidden"><img
                                            src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" alt=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="q-toolbar__title ellipsis text-weight-medium text-grey-7"
                        style="color: rgb(86, 106, 127); font-size: 1.4rem; letter-spacing: -0.5px;"> Quasar </div>
                </div>
                <div class="q-px-md text-subtitle1 text-grey-7">
                    <div>123 Main Street, Suite 456</div>
                    <div>San Francisco, CA 94105, USA</div>
                    <div>+1 (555) 123 4567, +44 (987) 654 3210</div>
                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 q-mt-lg q-pt-xs">
                <div class="text-subtitle1 text-grey-7">
                    <div class="text-weight-medium text-h6">INVOICE #ABC123</div> Date Issued: <span
                        class="text-weight-medium">November 10, 2023</span><br> Due Date: <span
                        class="text-weight-medium">December 10, 2023</span>
                </div>
            </div>
        </div>
        <div class="q-card__section q-card__section--vert row q-pb-lg q-pt-lg"
            style="border-bottom: 1px solid lightgrey;">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="text-subtitle1 q-px-md text-grey-7">
                    <div class="q-pb-sm text-weight-medium">Invoice To:</div> Thomas Shelby<br> Shelby Company
                    Limited<br> Small Heath, B10 0HF, UK<br> 718-986-6062<br> peakyFBlinders@gmail.com<br>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="text-subtitle1 q-px-md text-grey-7">
                    <div class="q-pb-sm text-weight-medium">Bill To:</div>
                    <div class="row">
                        <div class="col-4"> Total Due:<br> Bank name:<br> Country:<br> IBAN:<br> SWIFT code<br></div>
                        <div class="col-4"> $12,110.55<br> American Bank<br> United States<br> ETD95476213874685<br>
                            BR91905<br></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="q-card__section q-card__section--vert row q-pa-none" style="border-bottom: 1px solid lightgrey;">
            <div
                class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--flat q-table--no-wrap full-width">
                <div class="q-table__middle scroll">
                    <table class="q-table">
                        <thead>
                            <tr class="q-tr" style="height: 60px;">
                                <th class="text-left text-weight-bold text-grey-7" style="font-size: 13px;">ITEM</th>
                                <th class="text-left text-weight-bold text-grey-7" style="font-size: 13px;">DESCRIPTION
                                </th>
                                <th class="text-left text-weight-bold text-grey-7" style="font-size: 13px;">COST</th>
                                <th class="text-left text-weight-bold text-grey-7" style="font-size: 13px;">QUANTITY
                                </th>
                                <th class="text-left text-weight-bold text-grey-7" style="font-size: 13px;">PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="">
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">Quasar
                                        Framework</span></td>
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">HTML Admin
                                        Template</span></td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$32</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">1</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$32.00</div>
                                </td>
                            </tr>
                            <tr class="">
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">Quasar
                                        Framework</span></td>
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">Angular Admin
                                        Template</span></td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$22</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">1</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$22.00</div>
                                </td>
                            </tr>
                            <tr class="">
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">Quasar
                                        Framework</span></td>
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">HTML Admin
                                        Template</span></td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$17</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">2</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$34.00</div>
                                </td>
                            </tr>
                            <tr class="">
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">Quasar
                                        Framework</span></td>
                                <td class="q-td text-left text-grey-8"><span style="font-size: 16px;">React Admin
                                        Template</span></td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$66</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">1</div>
                                </td>
                                <td class="q-td text-left text-grey-8">
                                    <div style="font-size: 16px;">$66.00</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!---->
            </div>
        </div>
        <div class="q-card__section q-card__section--vert row q-pb-lg q-pt-lg"
            style="border-bottom: 1px solid lightgrey;">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div class="text-subtitle1 q-px-md text-grey-7">
                    <div class="q-pb-sm text-weight-medium">Salesperson:<span class="text-weight-regular">Alfie
                            Solomons</span></div> Thanks for your business
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="text-subtitle1 q-px-md text-grey-7">
                    <div class="row">
                        <div class="col-4 text-right q-pr-md"> Subtotal:<br> Discount:<br> Tax:<br> Total:<br></div>
                        <div class="col-4"> $154.25<br> $00.00<br> $50.00<br> $204.25<br></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="q-card__section q-card__section--vert row q-pb-lg q-pt-lg"
            style="border-bottom: 1px solid lightgrey;">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="text-subtitle1 q-px-md text-grey-7"><span class="q-pb-sm text-weight-medium">Note:</span> It
                    was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
                    projects. Thank You! </div>
            </div>
        </div>
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

const props = defineProps<{
    case: Case | undefined,
}>();

const deadline = computed(() => dayjs(props.case?.deadline))
const createdAt = computed(() => dayjs(props.case?.createdAt))
const isEditMode = ref(false)
const caseData = ref<Case | null>(null)
const userStore = useUserStore()
const companyStore = useCompanyStore()

const companyOptions = companyStore.items.map(item => ({
    label: item.name,
    value: item.id,
    inn: item.inn
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
    padding: 16px;
    margin-inline: auto;
    display: flex;
    margin-block: 10px;
}
</style>
<style lang="scss">
.input-slim {
    width: fit-content;

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
