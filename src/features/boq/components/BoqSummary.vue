<template>
    <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-9">
            <BoqLocations @navigate-location="(location: BoqLocation) => emits('navigateLocation', location)" />>
        </div>
        <div class="col-3 q-gutter-md">
            <WorkTable :works="enabledWorks" :editable="false"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { BoqLocation } from '../api/types';
import { useBoqWorkStore } from '../stores/boq-work-store';
import BoqLocations from './BoqLocations.vue';
import WorkTable from './WorkTable.vue';

const { works } = useBoqWorkStore()

const enabledWorks = computed(() => {
    return works.filter(item => !item.disabled)
})

const emits = defineEmits<{
    navigateLocation: [location: BoqLocation]
}>()
</script>