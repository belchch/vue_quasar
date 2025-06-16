<template>
  <q-card class="shadow_custom rounded-borders q-ma-md" bordered style="flex: 1">
    <InspectionToolbar />
    <PhotoDocsContainer v-if="caseLoaded" :items="photoDocsStore.photoDocs" />
    <InspectionUnionButton />
  </q-card>
</template>

<script setup lang="ts">
import InspectionToolbar from 'src/features/inspection/components/toolbar/InspectionToolbar.vue'
import { storeToRefs } from 'pinia'
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store'
import {usePhotoDocsStore} from "src/features/inspection/store/photo-doc-store";
import PhotoDocsContainer from "src/features/inspection/components/photo-doc/PhotoDocsContainer.vue";
import InspectionUnionButton from "src/features/inspection/components/toolbar/InspectionUnionButton.vue";

const { caseLoaded } = storeToRefs(useSelectedCaseStore())
const photoDocsStore = usePhotoDocsStore()
</script>
