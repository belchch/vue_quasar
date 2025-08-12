<template>
    <q-card>
        <div class="row justify-between">
            <q-card-section>

                <div class="q-pa-sm row text-subtitle2 text-accent">
                    <div v-if="selectedInspection" class="cursor-pointer">
                        <div class="row items-center q-gutter-sm">
                            <q-icon name="edit" />
                            <div>Квартира № {{ selectedInspection?.apartment }}</div>
                        </div>
                        <q-popup-edit v-model="selectedInspection.apartment" auto-save v-slot="scope" buttons @save="saveApartment">
                            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                        </q-popup-edit>
                    </div>
                </div>
            </q-card-section>
            <q-card-section>
                <div class="q-gutter-md">
                    <q-btn v-if="canDelete" color="negative" size="sm" icon="delete" @click="deleteInspection"
                        :loading="deleteInProgress">Удалть осмотр</q-btn>
                </div>
            </q-card-section>
        </div>
    </q-card>
    <q-card class="q-mt-sm text-grey-8">
        <q-card-section class="q-pb-none">
            <q-toolbar-title ellipsis class="q-ml-md">Локации</q-toolbar-title>
            <div class="text-body2 q-pl-md q-mt-xs">
                Список и количество локаций на объекте исследнования
            </div>
        </q-card-section>
        <q-card-section class="q-ml-sm q-pt-sm">
            <div v-for="item in sortedConfigs" :key="item.spot.id!!" class="row q-gutter-lg items-center">
                <div style="width: 200px" class="q-pa-sm">
                    <q-checkbox :label="item.spot.name" v-model="item.inUse" color="secondary"
                        :disable="!hasPermission(['inspection.update'])" @update:model-value="onChange(item)" />
                </div>
                <q-input :disable="!item.inUse || !hasPermission(['inspection.update'])" v-model="item.count"
                    type="number" outlined style="width: 80px;" dense @update:model-value="onChange(item)" />
            </div>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import { useSpotStore } from 'src/features/lookup/spot/stores/spot-store';
import { Spot } from 'src/features/lookup/spot/stores/types';
import { computed, ref } from 'vue';
import { useInspectionSpotService } from '../composables/inspection-spot';
import { useInspectionSpotStore } from '../store/inspection-spot-store';
import { storeToRefs } from 'pinia';
import { InspectionSpot } from '../api/types';
import _ from 'lodash';
import { useUserStore } from "src/features/user/stores/user-store";
import { useInspectionsStore } from '../store/inspection-store';
import { useInspections } from '../composables/inspection';

const spotStore = useSpotStore()
const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
const { updateInspectionSpot } = useInspectionSpotService()
const { hasPermission } = useUserStore()
const { selectedInspection, inspections } = storeToRefs(useInspectionsStore())
const inspectionService = useInspections()

const newSpots = (): InspectionSpot[] => {
    return spotStore.items?.filter(item => !inspectionSpots.value?.some((is: InspectionSpot) => is.spot.id == item.id))
        .map(item => ({
            spot: item,
            count: 1,
            inUse: false
        }))
}

const saveApartment = async (value: string) => {
    await inspectionService.updateInspection({
        ...selectedInspection.value!,
        apartment: value
    })
}

const deleteInProgress = ref(false)
const canDelete = computed(() => {
    return inspections.value.length > 1
})

const deleteInspection = async () => {
    try {
        deleteInProgress.value = true
        await inspectionService.deleteInspection(selectedInspection.value!.id!)
    } finally {
        deleteInProgress.value = false
    }
}


const spotConfigs = computed(() => {
    return inspectionSpots.value!.concat(newSpots())
})

const sortedConfigs = computed(() => {
    console.log(spotConfigs.value.length, 'location');
    return _.sortBy(spotConfigs.value, 'spot.name')
})

const onChange = async (item: InspectionSpot) => {
    await updateInspectionSpot(item)
}
</script>
