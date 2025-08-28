<template>
    <div class="row q-col-gutter-sm">
        <div class="col-8">
            <BoqLocations @navigate-location="(location: BoqLocation) => navigateLocation(location.id)" />
        </div>
        <div class="col-4">
            <WorkTable :works="enabledWorks" :editable="false" :show-location="true">
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

const { works } = useBoqWorkStore()
const { navigateLocation } = useBoqLocationService()

const enabledWorks = computed(() => {
    return works.filter(item => !item.disabled)
})
</script>
