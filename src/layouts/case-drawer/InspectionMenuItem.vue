<template>
    <div class="text-grey-8">
        <q-item clickable v-ripple @click="navigate()" active-class="text-primary" :active="isActive">
            <q-item-section avatar/>
            <q-item-section class="text-subtitle2">
                Кв. {{ inspection.apartment }}
            </q-item-section>
        </q-item>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNavigate } from 'src/composables/navigate';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { Inspection } from 'src/features/inspection/store/types';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { navigateInspectionPage } = useNavigate()
const router = useRouter()
const route = useRoute()

const props = defineProps<{
    inspection: Inspection
}>()

const isActive = computed(() => props.inspection.id == selectedInspectionId.value)

const navigate = async () => {
    const isInspectionRoute = !!route.params.inspectionId

    if (isInspectionRoute) {
        await router.push({
            name: route.name,
            params: {
                ...route.params,
                inspectionId: props.inspection.id
            }
        })
    } else {
        await navigateInspectionPage('photos', props.inspection.id)
    }
}

</script>