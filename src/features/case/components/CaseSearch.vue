<template>
  <div class="row q-col-gutter-md cases-layout">
    <div class="col-12 col-md-7">
      <div class="row items-center q-mb-md">
        <q-btn
          v-if="hasPermission(['case.create'])"
          unelevated
          no-caps
          color="primary"
          icon="add"
          label="Создать"
          @click="createDialogOpen = true"
        />
        <q-space />
        <q-btn
          class="lt-md"
          flat
          no-caps
          color="primary"
          icon="tune"
          label="Фильтр"
          @click="openFilter = !openFilter"
        />
      </div>

      <CaseFilterPanelMobile v-model:show-card="openFilter" class="lt-md" />

      <!-- Состояния списка -->
      <!-- cases === undefined — ещё не загружалось ни разу: показываем скелетон,
           чтобы не мигало "пусто" на первом рендере до onMounted -->
      <CaseListSkeleton v-if="isLoading || cases === undefined" />
      <ListState
        v-else-if="loadError"
        icon="cloud_off"
        color="negative"
        title="Не удалось загрузить"
        :description="loadError"
        retry
        @retry="refreshCases"
      />
      <ListState
        v-else-if="!cases?.length"
        icon="search_off"
        title="Экспертизы не найдены"
        description="Попробуйте изменить параметры фильтра или создайте новую экспертизу."
      />
      <CaseList v-else />
    </div>

    <div class="col-5 gt-sm">
      <CaseFilter />
    </div>
  </div>

  <q-dialog v-model="createDialogOpen">
    <q-card class="create-dialog__card">
      <q-card-section>
        <q-form class="q-gutter-sm" @submit="submitCreateForm">
          <div class="text-h6 q-mb-sm">Новая экспертиза</div>
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
            <div class="row q-mb-sm q-col-gutter-sm">
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
              <div class="col-3">
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
            <div class="text-subtitle1 q-mb-sm">Организация</div>
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
          <div class="row justify-between items-end q-mt-sm">
            <FormDate title="Срок сдачи" v-model="createForm.deadline" />
            <div>
              <q-btn
                label="Сохранить"
                type="submit"
                color="primary"
                unelevated
                no-caps
                :loading="submitting"
              />
              <q-btn
                label="Отмена"
                @click="resetCreateForm"
                color="primary"
                flat
                no-caps
                class="q-ml-sm"
              />
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
import ListState from 'src/components/ListState.vue'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import { useUserStore } from 'src/features/user/stores/user-store'
import { useCasesStore } from 'src/features/case/stores/case-store'
import dayjs from 'dayjs'

import _ from 'lodash'
import { useCases } from 'src/features/case/composables/case'
import CaseListSkeleton from './CaseListSkeleton.vue'
import CaseFilterPanelMobile from './case-filter/CaseFilterPanelMobile.vue'
import FormDate from 'src/features/inspection/components/form/FormDate.vue'

const { createCase, refreshCases, isLoading, loadError } = useCases()
const casesStore = useCasesStore()
const { cases } = storeToRefs(casesStore)

const courtStore = useCourtStore()
const judgeStore = useJudgeStore()
const regionStore = useRegionStore()
const companyStore = useCompanyStore()
const { hasPermission } = useUserStore()

onMounted(async () => {
  await Promise.all([
    courtStore.requestLookup(),
    judgeStore.requestLookup(),
    regionStore.requestLookup(),
    companyStore.requestLookup(),
  ])
})

const openFilter = ref(false)
const createDialogOpen = ref(false)
const submitting = ref(false)

const createForm = ref<CreateFormType>({
  number: '',
  company: null,
  region: null,
  facilityAddress: '',
  apartment: '',
  expertiseType: null,
  deadline: dayjs().add(30, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
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
  deadline: string
}

const companyOptions = computed(() =>
  companyStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)
const regionOptions = computed(() =>
  regionStore.items.map((item) => ({ label: item.name, value: item.id!! })),
)

const expertiseTypeOptions = [
  { label: 'ДДУ', value: 'SHARED_EQUITY' },
  { label: 'Залив', value: 'FLOOD_DAMAGE' },
  { label: 'Строительно-техническая', value: 'CONSTRUCTION' },
]

const resetCreateForm = () => {
  createForm.value = {
    number: '',
    company: null,
    region: null,
    expertiseType: null,
    facilityAddress: '',
    apartment: '',
    deadline: dayjs().add(30, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
  }
  createDialogOpen.value = false
}

const submitCreateForm = async () => {
  if (submitting.value) return
  submitting.value = true
  try {
    const { number, company, region, facilityAddress, apartment, deadline, expertiseType } =
      createForm.value

    await createCase({
      number: number,
      facilityAddress: facilityAddress,
      apartment: apartment,
      companyId: company!!.value,
      expertiseType: expertiseType!!.value,
      regionId: region!!.value,
      deadline: deadline,
    })

    Notify.create({ type: 'positive', message: 'Экспертиза создана' })
    resetCreateForm()
  } catch {
    // Ошибка уже показана глобальным перехватчиком axios
  } finally {
    submitting.value = false
  }
}
</script>
<style lang="scss" scoped>
.cases-layout {
  max-width: 1280px;
}

.create-dialog__card {
  width: 900px;
  max-width: 90vw;
  padding: 24px;
}
</style>
