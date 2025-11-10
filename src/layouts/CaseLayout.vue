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
import InspectionTitle from 'src/features/inspection/components/toolbar/InspectionTitle.vue'
import { ref } from 'vue'
//import InspectionInformation from 'src/features/inspection/components/InspectionInformation.vue'
import CaseDrawer from 'src/layouts/case-drawer/CaseDrawer.vue'

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