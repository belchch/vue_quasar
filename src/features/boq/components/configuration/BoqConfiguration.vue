<template>
    <div class="row q-col-gutter-sm">
        <div class="col-8">
            <q-card flat bordered>
                <q-tabs v-model="currentTab" no-caps align="left" active-color="primary">
                    <q-tab name="floor" label="Пол" />
                    <q-tab name="ceil" label="Потолок" />
                    <q-tab name="interior-door" label="Двери"/>
                    <q-tab name="window" label="Окна"/>
                    <q-tab name="wall" label="Стены" />
                    <q-tab name="supporting" label="Дополнительные работы" />
                </q-tabs>
            </q-card>
            <q-card class="q-mt-xs">                
                <q-tab-panels v-model="currentTab">
                    <q-tab-panel name="floor">
                        <BoqFloor :floor="location!.floor" />
                    </q-tab-panel>
                    <q-tab-panel name="ceil">
                        <BoqCeil :ceil="location!.ceil" />
                    </q-tab-panel>
                    <q-tab-panel name="interior-door">
                        <BoqInteriorDoors :interior-doors="location!.interiorDoors"/>
                    </q-tab-panel>
                    <q-tab-panel name="window">
                        <BoqWindows :windows="location!.windows"/>
                    </q-tab-panel>
                    <q-tab-panel name="wall">
                        <BoqWallSections :wall-sections="location!.wallSections"/>
                    </q-tab-panel>
                    <q-tab-panel name="supporting">
                        <BoqSupportingWorks :location-id="location!.id"/>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
        <div class="col-4">
            <WorkTable :works="locationWorks" :editable="true" :show-location="false" :flat="false"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useBoqLocationStore } from '../../stores/boq-location-store';
import { useBoqWorkStore } from '../../stores/boq-work-store';
import WorkTable from '../WorkTable.vue';
import BoqFloor from './BoqFloor.vue';
import BoqCeil from './BoqCeil.vue';
import BoqInteriorDoors from './BoqInteriorDoors.vue';
import BoqWindows from './BoqWindows.vue';
import BoqWallSections from './BoqWallSections.vue';
import BoqSupportingWorks from './BoqSupportingWorks.vue';

const { location } = storeToRefs(useBoqLocationStore())
const { works } = storeToRefs(useBoqWorkStore())

const currentTab = ref<string>('floor')

const locationWorks = computed(() => {
    return works.value.filter(item => item.locationId == location.value!.id)
})
</script>