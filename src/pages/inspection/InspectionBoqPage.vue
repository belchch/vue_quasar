<template>
    <BoqMain />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import BoqMain from 'src/features/boq/components/BoqMain.vue';
import { useBoqService } from 'src/features/boq/composables/boq';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { watch } from 'vue';

const { requestBoq } = useBoqService()
const { selectedInspectionId } = storeToRefs(useInspectionsStore())

watch(selectedInspectionId, async () => {
    await requestBoq()
})
</script>