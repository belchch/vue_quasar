<template>
    <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-8">
            <BoqFloor :floor="location!.floor" />
        </div>
        <div class="col-4">
            <WorkTable :works="locationWorks" :editable="true"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { BoqLocation } from '../../api/types';
import BoqFloor from './BoqFloor.vue';
import { useBoqLocationStore } from '../../stores/boq-location-store';
import { storeToRefs } from 'pinia';
import WorkTable from '../WorkTable.vue';
import { useBoqWorkStore } from '../../stores/boq-work-store';

const { location } = storeToRefs(useBoqLocationStore())
const { works } = storeToRefs(useBoqWorkStore())

const locationWorks = computed(() => {
    return works.value.filter(item => item.locationId == location.value!.id)
})
</script>