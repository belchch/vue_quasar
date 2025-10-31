<template>
  <div
    class="row list-wrapper no-wrap q-gutter-md-lg q-gutter-lg-lg q-gutter-xl-lg q-pr-xs-md q-pl-xs-md q-pr-sm-md q-pl-sm-md q-pl-lg-lg q-pt-md-md q-pt-lg-md q-pt-xl-md q-gutter-sm-x-none"
  >
    <div class="col-sm-12 col-md-7 col-xs">
      <div class="row" style="margin-bottom: 10px; margin-top: -15px">
        <div class="col">
          <q-btn
            v-if="hasPermission(['case.create'])"
            dense
            icon="add"
            @click="createDialogOpen = true"
            color="primary"
            label="Создать"
            class="full-width"
            style="position: relative; text-transform: none"
          />
        </div>
        <div class="col-auto lt-md">
          <q-btn
            color="primary"
            class="text-capitalize q-ml-md q-px-md"
            flat
            icon="tune"
            @click="openFilter = !openFilter"
            label="Фильтр"
            dense
          />
        </div>
      </div>
      <CaseFilterPanelMobile v-model:show-card="openFilter" class="lt-md" />
      <CaseListSkeleton v-if="isLoading" />
      <CaseList v-else />
    </div>
    <div class="col-5 gt-sm">
      <CaseFilter />
    </div>
  </div>
  <q-dialog v-model="createDialogOpen" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <q-card-section>
        <q-form class="q-gutter-sm" @submit="submitCreateForm">
          <div class="text-h6">Новая экспертиза</div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Дело (договор)</div>
            <q-input
              dense
              outlined
              v-model="createForm.number"
              lazy-rules
              label="Номер"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
            />
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Адрес</div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input
                  dense
                  outlined
                  v-model="createForm.facilityAddress"
                  lazy-rules
                  label="Адрес"
                  :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
                />
              </div>
              <div class="col-3 q-ml-sm">
                <q-input
                  dense
                  outlined
                  v-model="createForm.apartment"
                  lazy-rules
                  label="Номер квартиры"
                  :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Вид экспертизы</div>
            <q-select
              use-input
              dense
              outlined
              v-model="createForm.expertiseType"
              lazy-rules
              :options="expertiseTypeOptions"
              label="Вид экспертизы"
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
import { useUserStore } from 'src/features/user/stores/user-store'
import dayjs from 'dayjs'

import _ from 'lodash'
import { useCases } from 'src/features/case/composables/case'
import CaseListSkeleton from './CaseListSkeleton.vue'
import CaseFilterPanelMobile from './case-filter/CaseFilterPanelMobile.vue'

const { createCase, isLoading } = useCases()

const courtStore = useCourtStore()
const judgeStore = useJudgeStore()
const regionStore = useRegionStore()
const companyStore = useCompanyStore()
const { hasPermission } = useUserStore()

onMounted(async () => {
  await courtStore.requestLookup()
  await judgeStore.requestLookup()
  await regionStore.requestLookup()
  await companyStore.requestLookup()
  localDate.value = dayjs(createForm.value.deadline).format('YYYY/MM/DD')
})
const openFilter = ref(false)
const createDialogOpen = ref(false)

const createForm = ref<CreateFormType>({
  number: '',
  company: null,
  region: null,
  facilityAddress: '',
  apartment: '',
  expertiseType: null,
  deadline: dayjs().add(30, 'day').toDate(),
})

type SelectOption = {
  value: number
  label: string
}

type CreateFormType = {
  number: string
  company: SelectOption | null
  region: SelectOption | null
  expertiseType: { label: string; value: string } | null
  facilityAddress: string
  apartment: string
  deadline: Date
}

const companyOptions = computed(() =>
  companyStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)
const regionOptions = computed(() =>
  regionStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)

const expertiseTypeOptions = ref<{ label: string; value: string }[]>([
  {
    label: 'ДДУ',
    value: 'SHARED_EQUITY',
  },
  {
    label: 'Залив',
    value: 'FLOOD_DAMAGE',
  },
  {
    label: 'Землеустроительная',
    value: 'LAND_MANAGEMENT',
  },
])

const localDate = ref('')

const setDate = () => {
  createForm.value.deadline = new Date(localDate.value)
}

const resetCreateForm = () => {
  createForm.value = {
    number: '',
    company: null,
    region: null,
    expertiseType: null,
    facilityAddress: '',
    apartment: '',
    deadline: dayjs().add(30, 'day').toDate(),
  }
  createDialogOpen.value = false
}

const submitCreateForm = async () => {
  const { number, company, region, facilityAddress, apartment, deadline, expertiseType } =
    createForm.value

  await createCase({
    number: number,
    facilityAddress: facilityAddress,
    apartment: apartment,
    companyId: company!!.value,
    expertiseType: expertiseType!!.value,
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
</style>
