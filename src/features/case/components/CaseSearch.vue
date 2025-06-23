<template>
  <div class="row list-wrapper q-mt-sm no-wrap q-gutter-x-lg q-ml-md">
    <div class="col-7">
      <q-btn
        dense
        icon="add"
        @click="createDialogOpen = true"
        color="primary"
        label="Создать"
        class="full-width"
        style="position: relative; top: -15px; margin-bottom: 10px; text-transform: none"
      />
      <q-inner-loading :showing="isLoading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
      <CaseList :class="{ 'is-loading': isLoading }"/>
    </div>
    <div class="col-5">
      <CaseFilter />
    </div>
  </div>
  <q-dialog v-model="createDialogOpen" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <q-card-section>
        <q-form class="q-gutter-sm" @submit="submitCreateForm">
          <div class="text-h6">Новая экспертиза</div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Дело</div>
            <q-input
              dense
              outlined
              v-model="createForm.number"
              lazy-rules
              label="Номер дела"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
            />
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Адрес</div>
            <q-input
              dense
              outlined
              v-model="createForm.facilityAddress"
              lazy-rules
              label="Адрес"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
            />
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Организанция</div>
            <q-select
              use-input
              dense
              outlined
              v-model="createForm.company"
              lazy-rules
              :options="companyOptions"
              label="Организация"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
            />
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Регион</div>
            <q-select
              use-input
              dense
              outlined
              v-model="createForm.region"
              lazy-rules
              :options="regionOptions"
              label="Регион"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
            />
          </div>
          <div class="row justify-between items-end">
            <div>
              <div class="text-subtitle1 q-mb-sm">Срок сдачи</div>
              <q-input dense outlined v-model="localDate" readonly>
                <q-btn
                  icon="event"
                  flat
                  no-caps
                  round2
                  class="bg-grey-3 text-grey-8"
                  style="margin: 1px -11px"
                  size="md"
                >
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date color="grey" v-model="localDate" minimal>
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Отмена" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat @click="setDate" v-close-popup />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </q-input>
            </div>
            <div>
              <q-btn label="Сохранить" type="submit" color="primary" />
              <q-btn label="Отмена" @click="resetCreateForm" color="primary" flat class="q-ml-sm" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import CaseFilter from 'src/features/case/components/case-filter/CaseFilterPanel.vue'
import CaseList from 'src/features/case/components/CaseList.vue'
import { computed, onMounted, ref } from 'vue'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import dayjs from 'dayjs'

import _ from 'lodash'
import { useCases } from 'src/features/case/composables/case'

const { createCase, isLoading } = useCases()

const courtStore = useCourtStore()
const judgeStore = useJudgeStore()
const regionStore = useRegionStore()
const companyStore = useCompanyStore()

onMounted(async () => {
  await courtStore.requestLookup()
  await judgeStore.requestLookup()
  await regionStore.requestLookup()
  await companyStore.requestLookup()
  localDate.value = dayjs(createForm.value.deadline).format('YYYY/MM/DD')
})

const createDialogOpen = ref(false)

const createForm = ref<CreateFormType>({
  number: '',
  company: null,
  region: null,
  facilityAddress: '',
  deadline: dayjs().add(30, 'day').toDate(),
})

type SelectOption = {
  value: number,
  label: string
}

type CreateFormType = {
  number: string,
  company: SelectOption | null,
  region: SelectOption | null,
  facilityAddress: string,
  deadline: Date
}

const companyOptions = computed(() =>
  companyStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)
const regionOptions = computed(() =>
  regionStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)

const localDate = ref('')

const setDate = () => {
  createForm.value.deadline = new Date(localDate.value)
}

const resetCreateForm = () => {
  createForm.value = {
    number: '',
    company: null,
    region: null,
    facilityAddress: '',
    deadline: dayjs().add(30, 'day').toDate(),
  }
  createDialogOpen.value = false
}

const submitCreateForm = async () => {
  const { number, company, region, facilityAddress, deadline } = createForm.value

  await createCase({
    number: number,
    facilityAddress: facilityAddress,
    companyId: company!!.value,
    regionId: region!!.value,
    deadline: dayjs(deadline).toISOString(),
  })

  createDialogOpen.value = false
}
</script>
<style lang="scss" scoped>
.list-wrapper {
  max-width: 1280px;
  // margin-inline: auto;
}
.is-loading {
  opacity: 0.5;
}
</style>
