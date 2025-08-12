<template>
    <div class="row q-col-gutter-sm">
        <div class="col-8">
            <BoqFloor :floor="location!.floor" />
        </div>
        <div class="col-4">
            <WorkTable :works="locationWorks" :editable="true"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useBoqLocationStore } from '../../stores/boq-location-store';
import { useBoqWorkStore } from '../../stores/boq-work-store';
import WorkTable from '../WorkTable.vue';
import BoqFloor from './BoqFloor.vue';

const { location } = storeToRefs(useBoqLocationStore())
const { works } = storeToRefs(useBoqWorkStore())

const locationWorks = computed(() => {
    return works.value.filter(item => item.locationId == location.value!.id)
})
</script>