<template>
    <div class="row q-col-gutter-sm">
        <div class="col-9">
            <BoqLocations @navigate-location="(location: BoqLocation) => navigateLocation(location.id)" />
        </div>
        <div class="col-3">
            <WorkTable :works="enabledWorks" :editable="false" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useBoqLocationService } from '../composables/boq-location';
import { useBoqWorkStore } from '../stores/boq-work-store';
import BoqLocations from './BoqLocations.vue';
import WorkTable from './WorkTable.vue';
import { BoqLocation } from '../api/types';

const { works } = useBoqWorkStore()
const { navigateLocation } = useBoqLocationService()

const enabledWorks = computed(() => {
    return works.filter(item => !item.disabled)
})
</script>