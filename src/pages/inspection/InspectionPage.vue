<template>
    <div v-if="selectedInspectionId">
        <router-view />
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useInspectionPageService } from 'src/features/inspection/composables/inspection-page';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const { initPageStore, cleanPageStore } = useInspectionPageService()
const { selectedInspectionId } = storeToRefs(useInspectionsStore())

const onChange = async (value: any) => {
    await initPageStore(parseInt(value))
}

watch(() => route.params.inspectionId, async (newValue: any) => {
    await onChange(newValue)
})

onMounted(async () => {
    await onChange(route.params.inspectionId)
})
</script>