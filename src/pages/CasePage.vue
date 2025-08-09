<template>
  <q-drawer
      side="left"
      v-model="drawerOpen"
      show-if-above
      bordered
      
      :width="250"      
    >
      <CaseDrawer @close="drawerOpen = false" v-model:active-tab="activeTab"/>
    </q-drawer>    
    <q-page class="case-page column">
        <InspectionTitle :case="selectedCase" :model-value="activeTab" @update:model-value="updateTab" v-model:drawer-open="drawerOpen"/>
        <div class="q-pa-sm">
          <router-view/>           
        </div>
        <!-- <q-card flat style="background: transparent; flex: 1" class="column">
          <q-card-section style="flex: 1">            
            <q-tab-panels v-model="activeTab" style="flex: 1" class="column">
              <q-tab-panel name="inspection" style="flex: 1">
                <InspectionContent />
              </q-tab-panel>
              <q-tab-panel name="inspections">
                <InspectionsPage/>
              </q-tab-panel>
              <q-tab-panel name="general-view">
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
                  <MeasurementComponent />
                </div>
              </q-tab-panel>
              <q-tab-panel name="common-report">
                <div>
                  <CommonReport />
                </div>
              </q-tab-panel>
              <q-tab-panel name="boq">
                <div>
                  <BoqMain />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card> -->
      </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import DefectPage from 'pages/DefectPage.vue'
import InspectionContent from 'src/features/inspection/components/InspectionContent.vue'
import InspectionTitle from 'src/features/inspection/components/toolbar/InspectionTitle.vue'
//import InspectionInformation from 'src/features/inspection/components/InspectionInformation.vue'
import { useSelectedCaseService } from 'src/features/case/composables/selected-case'
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store'
import { useUserStore } from "src/features/user/stores/user-store";
import { storeToRefs } from "pinia";
import GeneralViewComponent from "src/features/general-view/components/GeneralViewComponent.vue";
import CaseQuestions from 'src/features/case/components/questions/CaseQuestions.vue'
import MeasurementComponent from 'src/features/measurement/components/MeasurementComponent.vue'
import CaseDocuments from 'src/features/case/components/documents/CaseDocuments.vue'
import CommonReport from 'src/features/report/components/CommonReport.vue'
import BoqMain from 'src/features/boq/components/BoqMain.vue'
import CaseDrawer from 'src/layouts/case-drawer/CaseDrawer.vue'
import InspectionsPage from 'src/features/case/components/InspectionsPage.vue'

const props = defineProps<{
  caseId: number
}>()

const { selectCase, cleanCase } = useSelectedCaseService()
const { selectedCase } = storeToRefs(useSelectedCaseStore())
const { hasPermission } = useUserStore()

const drawerOpen = ref<boolean>(true)

const activeTab = ref<string>('information')

const updateTab = (newTab: string) => {
  activeTab.value = newTab
}

onBeforeMount(() => {

});
onMounted(async () => {
  await selectCase(props.caseId)
  if (!hasPermission(['inspection.read'])) {
    activeTab.value = 'information';
  }
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
  padding-top: 49px;
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
