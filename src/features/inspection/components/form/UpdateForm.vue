<template>
    <q-card-section v-if="localCase">
        <q-form class="q-gutter-sm" @submit="handleSave">
            <div class="row q-col-gutter-lg">
                <div class="col-6">
                    <FormInput v-model="localCase.number" label="Номер дела" title="Дело" :required="true"/>
                    <FormInput v-model="localCase.facilityAddress" label="Адрес" :required="true"/>
                    <FormList 
                        label="Регион" 
                        v-model="localCase.region"
                        :options="regionStore.items"
                        :required="true"/>
                </div>
                <div class="col-6">
                    <FormList 
                        label="Суд" 
                        v-model="localCase.court"
                        :options="courtStore.items"
                        />
                    <FormList
                        label="Судья"
                        v-model="localCase.judge"
                        :options="judgeOptions"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                    />
                    <FormList 
                        label="Организация" 
                        v-model="localCase.company"
                        :options="companyStore.items"
                        />
                </div>
            </div>
            <div class="row q-col-gutter-lg q-mt-md">
                <div class="col-6">
                    <FormList 
                        label="Автор" 
                        v-model="localCase.createdBy"
                        :options="userOptions"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                        />
                     <FormList 
                        label="Руководитель" 
                        v-model="localCase.head"
                        :options="userOptions"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                        />
                </div>
                <div class="col-6">
                    <FormList 
                        label="Менеджер" 
                        v-model="localCase.manager"
                        :options="userOptions"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                        />
                    <FormList 
                        label="Эксперт" 
                        v-model="localCase.expert"
                        :options="userOptions"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                        />
                </div>            
            </div>
        <div class="row justify-between items-end q-ml-none q-mt-lg">
            <div>
                <FormDate 
                    v-model="localCase.deadline"
                    title="Срок сдачи"
                />
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
import FormInput from './FormInput.vue'
import FormList from './FormList.vue'
import { Case } from 'src/features/case/stores/types'
import FormDate from './FormDate.vue'
import { UserService } from 'src/features/user/api'

const companyStore = useCompanyStore()
const judgeStore = useJudgeStore()
const courtStore = useCourtStore()
const regionStore = useRegionStore()

const localCase = ref<Case>()
const selectedJudge = ref(null)
const model = defineModel<Case>()

defineProps({
    statusOptions: Array
})

const emit = defineEmits(['update:modelValue', 'save', 'reset'])

const handleSave = () => {
    emit('save', localCase.value)
}
const resetForm = () => {
    initLocalForm()
    emit('reset')
}

const judgeOptions = judgeStore.items.map(j => ({
  label: judgeName(j),
  value: j 
}))
const userOptions = ref<any[]>()

const initLocalForm = () => {
    if (!model.value) return
    localCase.value = { ...model.value }
}
onMounted(async() => {
    initLocalForm()
    const gettedUsers = await UserService.getAllUsers()
    userOptions.value = gettedUsers.data.map(u => ({
        label: u.lastName + ' ' + u.firstName + ' ' + u.middleName,
        value: u
    }))
})

</script>