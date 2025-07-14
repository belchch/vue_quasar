<template>
    <q-card-section v-if="localCase">
        <q-form class="q-gutter-sm" @submit="handleSave">
            <div class="row q-col-gutter-lg">
                <div class="col-6">
                    <FormInput v-model="localCase.number" label="Номер дела" title="Дело" :required="true" />
                    <FormInput v-show="false" v-model="localCase.facilityAddress" label="Адрес" :required="true" />
                    <FormList v-show="false" label="Регион" v-model="localCase.region" :options="regionStore.items" />
                    <FormList v-show="false" label="Организация" v-model="localCase.company" :options="companyStore.items" />
                </div>
                <div class="col-6">
                    <FormList v-show="false" label="Суд" v-model="localCase.court" :options="courtStore.items" />
                    <FormList label="Вид экспертизы" v-model="expertiseType" :options="expertiseTypOptions"/>
                    <FormList v-show="false" label="Судья" v-model="localCase.judge" :options="judgeOptions" option-label="label"
                        option-value="value" emit-value map-options />
                </div>
            </div>
            <div class="row q-col-gutter-lg q-mt-md">
                <div class="col-6">
                    <FormList :disable-permission="!hasPermission(['case.update.manager'])" label="Менеджер"
                        v-model="localCase.manager" :options="managerOptions" option-label="label" option-value="value"
                        emit-value map-options />
                    <FormList :disable-permission="!hasPermission(['case.update.expert'])" label="Эксперт"
                        v-model="localCase.expert" :options="expertOptions" option-label="label" option-value="value"
                        emit-value map-options />
                </div>
                <div class="col-6">
                    <FormList :disable-permission="!hasPermission(['case.update.head'])" label="Руководитель"
                        v-model="localCase.head" :options="headOptions" option-label="label" option-value="value"
                        emit-value map-options />
                </div>
            </div>
            <div class="row justify-between items-end q-ml-none q-mt-lg">
                <div class="row q-gutter-md">
                    <div>
                        <FormDate v-model="localCase.deadline" title="Срок сдачи"
                            :disabled-permission="!hasPermission(['case.update.deadline'])" />
                    </div>
                    <div>
                        <FormDate v-model="localCase.inspectionStartAt" title="Дата начала осмотра"/>
                    </div>
                    <div>
                        <FormDate v-model="localCase.inspectionEndAt" title="Дата окончания осмотра"/>
                    </div>
                </div>
                <div>
                    <q-btn label="Сохранить" type="submit" color="primary" />
                    <q-btn label="Отмена" @click="resetForm" color="primary" flat class="q-ml-sm" />
                </div>
            </div>
        </q-form>
    </q-card-section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import { judgeName } from 'src/features/lookup/judge/stores/types'
import { useUserStore } from 'src/features/user/stores/user-store';
import FormInput from './FormInput.vue'
import FormList from './FormList.vue'
import { Case } from 'src/features/case/stores/types'
import FormDate from './FormDate.vue'
import { UserService } from 'src/features/user/api'
import { userName } from 'src/features/user/api/types'
import { User } from 'src/features/user/stores/types'

const companyStore = useCompanyStore()
const judgeStore = useJudgeStore()
const courtStore = useCourtStore()
const regionStore = useRegionStore()
const { hasPermission } = useUserStore()

const localCase = ref<Case>()
const selectedJudge = ref(null)
const model = defineModel<Case>()

defineProps({
    statusOptions: Array
})
const expertiseTypOptions = [
    {
        id: 'SHARED_EQUITY',
        name: 'ДДУ'
    },
    {
        id: 'FLOOD_DAMAGE',
        name: 'Залив'
    },
    {
        id: 'LAND_MANAGEMENT',
        name: 'Землеустроительная'
    },
]



const expertiseType = ref<{id: string, name: string}>(
    expertiseTypOptions.find(item => item.id == model.value?.expertiseType)!
)

const emit = defineEmits(['update:modelValue', 'save', 'reset'])

const handleSave = () => {
    emit('save', {
        ...localCase.value,
        expertiseType: expertiseType.value.id
    })
}
const resetForm = () => {
    initLocalForm()
    emit('reset')
}

const judgeOptions = judgeStore.items.map(j => ({
    label: judgeName(j),
    value: j
}))

const managerOptions = ref<any[]>()
const headOptions = ref<any[]>()
const expertOptions = ref<any[]>()

const initLocalForm = () => {
    if (!model.value) return
    localCase.value = { ...model.value }
}
onMounted(async () => {
    initLocalForm()
    const users = (await UserService.getAllUsers()).data

    const toOptions = (u: User) => ({
        label: userName(u),
        value: u
    })

    managerOptions.value = users.filter(item => item.role == 'MANAGER').map(toOptions)
    headOptions.value = users.filter(item => item.role == 'HEAD').map(toOptions)
    expertOptions.value = users.filter(item => item.role == 'EXPERT').map(toOptions)
})

</script>
