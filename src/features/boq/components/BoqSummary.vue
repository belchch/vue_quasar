<template>
    <div class="row q-col-gutter-sm">
        <div class="col-7">
            <BoqLocations @navigate-location="(location: BoqLocation) => navigateLocation(location.id)" />
            <EstimateTabs />
        </div>
        <div class="col-5">
            <WorkTable :works="works" :editable="true" :show-location="true">
                <template v-slot:additional-top>
                  <CommonWorksEditor />
                </template>
            </WorkTable>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { BoqLocation } from '../api/types';
import { useBoqLocationService } from '../composables/boq-location';
import { useBoqWorkStore } from '../stores/boq-work-store';
import BoqLocations from './BoqLocations.vue';
import CommonWorksEditor from './CommonWorksEditor.vue';
import WorkTable from './WorkTable.vue';
import EstimateTabs from 'src/features/estimate/components/EstimateTabs.vue'


const { works } = storeToRefs(useBoqWorkStore())
const { navigateLocation } = useBoqLocationService()

</script>
