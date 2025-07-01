<template>
  <q-page class="case-page column">
    <q-card flat style="background: transparent; flex: 1" class="column">
      <q-card-section class="q-pa-none column" style="flex: 1">
        <q-tab-panels v-model="activeTab" style="flex: 1" class="column">
          <q-tab-panel name="inspection" style="flex: 1">
            <InspectionContent />
          </q-tab-panel>
          <q-tab-panel name="generalView">
            <GeneralViewComponent />
          </q-tab-panel>
          <q-tab-panel name="defect">
            <div class="q-pa-md">
              <DefectPage />
            </div>
          </q-tab-panel>
          <q-tab-panel name="information">
            <div class="q-pa-md">
              <InspectionInformation />
            </div>
          </q-tab-panel>
          <q-tab-panel name="questions">
            <div class="q-pa-md">
              <CaseQuestions />
            </div>
          </q-tab-panel>
          <q-tab-panel name="documents">
            <div class="q-pa-md">
              <CaseDocuments />
            </div>
          </q-tab-panel>
          <q-tab-panel name="measurements">
            <div class="q-pa-md">
              <MeasurementComponent/>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <InspectionTitle
      :case="selectedCase"
      :model-value="activeTab"
      @update:model-value="updateTab"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import InspectionCommon from '../features/inspection/pages/InspectionCommon.vue'
import DefectPage from 'pages/DefectPage.vue'
import InspectionContent from 'src/features/inspection/components/InspectionContent.vue'
import InspectionTitle from 'src/features/inspection/components/toolbar/InspectionTitle.vue'
import InspectionInformation from 'src/features/inspection/components/InspectionInformation.vue'
import { useSelectedCaseService } from 'src/features/case/composables/selected-case'
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store'
import {storeToRefs} from "pinia";
import GeneralViewComponent from "src/features/general-view/components/GeneralViewComponent.vue";
import CaseQuestions from 'src/features/case/components/questions/CaseQuestions.vue'
import MeasurementComponent from 'src/features/measurement/components/MeasurementComponent.vue'
import CaseDocuments from 'src/features/case/components/documents/CaseDocuments.vue'

const props = defineProps<{
  caseId: number
}>()

const { selectCase, cleanCase } = useSelectedCaseService()
const { selectedCase } = storeToRefs(useSelectedCaseStore())

const activeTab = ref<string>('inspection')

const updateTab = (newTab: string) => {
  activeTab.value = newTab
}

onMounted(async () => {
  await selectCase(props.caseId)
})

onBeforeUnmount(() => {
  cleanCase()
})
</script>

<style lang="scss" scoped>
.q-tab-panels {
  background-color: transparent;
}

.case-page {
  padding-top: 32px;
}

.q-tab-panel {
  padding-inline: 0;
  flex: 1;
}
</style>
<style lang="scss">
.q-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
