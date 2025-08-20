<template>
    <div>
        <BoqConfiguration v-if="location"/>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BoqConfiguration from 'src/features/boq/components/configuration/BoqConfiguration.vue';
import { useBoqLocationService } from 'src/features/boq/composables/boq-location';
import { useBoqLocationStore } from 'src/features/boq/stores/boq-location-store';
import { usePageBreadcrumbsStore } from 'src/features/navigation/stores/page-breadcumbs-store';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const { selectLocation } = useBoqLocationService()
const { location } = storeToRefs(useBoqLocationStore())
const { pageBreadcrumbs } = storeToRefs(usePageBreadcrumbsStore()) 

const init = async () => {
    const location = await selectLocation(parseInt(route.params.locationId!.toString()))

    pageBreadcrumbs.value = [{
        label: location.room.name
    }]
}

watch(() => route.params.locationId, async () => {
    await init()
})

onMounted(async () => {
    await init()
})

onBeforeUnmount(() => {
    pageBreadcrumbs.value = []
    location.value = undefined
})

</script>