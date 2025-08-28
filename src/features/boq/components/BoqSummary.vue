<template>
    <div class="row q-col-gutter-sm">
        <div class="col-7">
            <BoqLocations @navigate-location="(location: BoqLocation) => navigateLocation(location.id)" />
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
import { computed } from 'vue';
import { useBoqLocationService } from '../composables/boq-location';
import { useBoqWorkStore } from '../stores/boq-work-store';
import BoqLocations from './BoqLocations.vue';
import WorkTable from './WorkTable.vue';
import { BoqLocation } from '../api/types';
import CommonWorksEditor from './CommonWorksEditor.vue'
import { storeToRefs } from 'pinia';

const { works } = storeToRefs(useBoqWorkStore())
const { navigateLocation } = useBoqLocationService()

</script>
