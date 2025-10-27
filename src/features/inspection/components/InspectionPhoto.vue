<template>
  <q-card class="shadow_custom rounded-borders" bordered style="flex: 1">
    <InspectionToolbar />
    <PhotoDocsSkeleton v-if="!caseLoaded || photoDocsLoading"/>
    <PhotoDocsContainer v-else :items="photoDocs" />
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
import PhotoDocsSkeleton from './photo-doc/PhotoDocsSkeleton.vue';
import { onMounted } from 'vue';
import { useMovableSrvice } from 'src/features/measurement/composables/movable';

const { caseLoaded } = storeToRefs(useSelectedCaseStore())
const { photoDocsLoading, photoDocs } = storeToRefs(usePhotoDocsStore())
const { requestMovables } = useMovableSrvice()

onMounted(async () => {
    const inspectionId = 1
    
})
</script>
