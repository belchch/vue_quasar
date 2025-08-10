<template>
    <BoqHeader :secondary-title="location?.room.name" @go-home="goHome" />
    <BoqConfiguration v-if="location" />
    <BoqSummary v-else @navigate-location="(location: BoqLocation) => navigateLocation(location)" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { BoqLocation } from '../api/types';
import { useBoqLocationService } from '../composables/boq-location';
import { useBoqLocationStore } from '../stores/boq-location-store';
import BoqHeader from './BoqHeader.vue';
import BoqSummary from './BoqSummary.vue';
import BoqConfiguration from './configuration/BoqConfiguration.vue';

const { location } = storeToRefs(useBoqLocationStore())
const { selectLocation } = useBoqLocationService()

const goHome = () => {
    location.value = undefined
}

const navigateLocation = async (newLocation: BoqLocation) => {
    await selectLocation(newLocation)
}
</script>