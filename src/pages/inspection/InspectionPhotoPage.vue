<template>
    <InspectionPhoto />
</template>
<script lang="ts" setup>
import InspectionPhoto from 'src/features/inspection/components/InspectionPhoto.vue';
import { useFloodDamageStore } from 'src/features/lookup/flood-damage/flood-damage-store';
import { useMovableSrvice } from 'src/features/measurement/composables/movable';
import { onMounted } from 'vue';

const { requestMovables } = useMovableSrvice()
const floodDamageStore = useFloodDamageStore()

onMounted(async () => {
    console.log("onMounted")
    await requestMovables()
    await floodDamageStore.requestLookup()
})
</script>