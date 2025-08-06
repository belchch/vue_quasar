<template>
    <BoqHeader :secondary-title="location?.room.name" @go-home="goHome" />
    <BoqConfiguration v-if="location" />
    <BoqSummary v-else @navigate-location="(location: BoqLocation) => navigateLocation(location)" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { BoqLocation } from '../api/types';
import BoqSummary from './BoqSummary.vue';
import BoqConfiguration from './configuration/BoqConfiguration.vue';
import BoqHeader from './BoqHeader.vue';
import { useBoqLocationStore } from '../stores/boq-location-store';
import { storeToRefs } from 'pinia';
import { useBoqLocationService } from '../composables/boq-location';

const { location } = storeToRefs(useBoqLocationStore())
const { selectLocation } = useBoqLocationService()

const goHome = () => {
    location.value = undefined
}

const navigateLocation = async (newLocation: BoqLocation) => {
    await selectLocation(newLocation)
}
</script>