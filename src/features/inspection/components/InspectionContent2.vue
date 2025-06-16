<template>
    <InspectionToolbar />
    <q-card class="shadow_custom rounded-borders q-ma-md" style="margin-top: 12px;" bordered>
        <PhotoDocsContainer :items="photoDocsStore.photoDocs" />
    </q-card>
    <InspectionUnionButton />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import InspectionToolbar from 'src/features/inspection/components/toolbar/InspectionToolbar.vue'
import { usePhotoDocsStore } from 'src/features/inspection/store/photo-doc-store'
import { usePhotoDocs } from 'src/features/inspection/composables/photo-doc'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { useSpotStore } from "src/features/lookup/spot/stores/spot-store"
import { useStructElemStore } from "src/features/lookup/struct-elem/stores/struct-elem-store"
import { useMaterialStore } from "src/features/lookup/material/stores/material-store"
import { useFlawStore } from "src/features/defect/flaw/stores/flaw-store"
import PhotoDocsContainer from '../components/photo-doc/PhotoDocsContainer.vue'
import InspectionUnionButton from '../components/toolbar/InspectionUnionButton.vue'

const inspectionsStore = useInspectionsStore()
const photoDocsStore = usePhotoDocsStore()
const photoDocService = usePhotoDocs()
const spotStore = useSpotStore()
const structElemStore = useStructElemStore()
const materialStore = useMaterialStore()
const flawStore = useFlawStore()

onMounted(async () => {
    const inspectionId = 1
    inspectionsStore.setSelectedInspectionId(inspectionId)
    await photoDocService.requestPhotoDocs(inspectionId, undefined, true)
    await spotStore.requestLookup()
    await structElemStore.requestLookup()
    await materialStore.requestLookup()
    await flawStore.requestLookup()
})
</script>