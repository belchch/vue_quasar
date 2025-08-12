<template>
  <q-drawer
      side="left"
      v-model="drawerOpen"
      show-if-above
      bordered    
      :width="250"          
    >
      <CaseDrawer @close="drawerOpen = false"/>
    </q-drawer>    
    <q-page class="case-page column">
        <InspectionTitle v-model:drawer-open="drawerOpen"/>
        <div class="q-pa-sm">
          <router-view/>           
        </div>        
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

const drawerOpen = ref<boolean>(true)
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