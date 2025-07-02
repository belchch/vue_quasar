<template>
  <q-page-sticky expand position="top">
    <q-toolbar class="bg-white" style="border-bottom: 1px solid #e0e0e0">
      <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" class="q-mr-xs q-my-sm text-grey-8"
        style="width: 36px; margin-right: 16px" />

      <q-card-section class="q-pa-none justify-center column q-mr-md">
        <q-card bordered flat class="q-pa-none q-ma-none">
          <q-avatar :class="statusStyle.class" class="rounded-borders" size="24px" :icon="statusStyle.icon"
            style="color: #757575" />
        </q-card>
      </q-card-section>
      <div>
        <div class="text-subtitle2">
          <span class="text-accent">№ {{ props.case?.number }}</span>
        </div>
        <!-- <div class="q-pb-xs">
          <span class="text-grey-8 text-subtitle2 q-pr-xs">Адрес:</span>
          <span class="text-grey-6">{{ props.case?.facilityAddress }}</span>

        </div> -->
      </div>

      <q-chip v-if="props.case?.priority == 'HIGH'" outline color="negative" square class="badge q-ml-md" size="xs">
        cрочный
      </q-chip>

      <q-space />
      <q-tabs :model-value="modelValue" @update:model-value="onUpdateTab" dense align="left" class="text-grey-10" shrink
        stretch no-caps active-color="primary">
        <q-tab name="inspection" label="Осмотр" class="q-px-xl" v-if="hasPermission(['inspection.read'])" />
        <q-tab name="generalView" label="Общие виды" class="q-px-xl" v-if="hasPermission(['generalViewReport.read'])" />
        <q-tab name="defect" label="Дефекты" class="q-px-xl" v-if="!!hasPermission(['defectReport.read'])" />
        <q-tab name="information" label="Информация" class="q-px-xl" />
        <q-tab name="questions" label="Вопросы" class="q-px-xl" v-if="hasPermission(['question.read'])" />
        <q-tab name="measurements" label="Размеры" class="q-px-xl" v-if="hasPermission(['measurement.read '])" />
        <q-tab name="documents" label="Документы" class="q-px-xl" />
      </q-tabs>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { Case } from 'src/features/case/stores/types'
import { computed, ref } from 'vue'
import {usePhotoDocsStore} from "src/features/inspection/store/photo-doc-store";
import {usePhotoDocs} from "src/features/inspection/composables/photo-doc";
import {useInspections} from "src/features/inspection/composables/inspection";
import {useSelectedInspection} from "src/features/inspection/composables/selected-inspection";
import {useTechnicalReportService} from "src/features/defect/composables/technical-report";
import { useUserStore } from "src/features/user/stores/user-store";

const props = defineProps<{
  case: Case | undefined
  modelValue: string
}>()

const {requestPhotoDocs} = useSelectedInspection()
const {requestTechnicalReport} = useTechnicalReportService()
const { hasPermission } = useUserStore()

const onUpdateTab = (tab: string) => {
  emits('update:modelValue', tab)
}

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const computeStatusStyle = () => {
  switch (props.case?.status) {
    case 'OPEN':
      return {
        icon: 'more_horiz',
        class: 'text-blue',
      }
    case 'IN_PROGRESS':
      return {
        icon: 'hourglass_empty',
        class: '',
      }
    case 'DONE':
      return {
        icon: 'check',
        class: 'text-green',
      }
    default:
      return {
        icon: 'no',
        class: 'bg-grey-2',
      }
  }
}

const statusStyle = computed(() => computeStatusStyle())
</script>

<style scoped lang="scss">
.q-page-sticky {
  z-index: 1;
}
</style>
