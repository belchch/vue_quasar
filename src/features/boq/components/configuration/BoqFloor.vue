<template>
    <div>
        <div class="row justify-between">
            <q-card-section>
                <BaseboardReplacement title="Напольный плинтус" length-hint="Длина напольного плинтуса"
                    v-model:replacement="floorLocal.baseboardReplacement"
                    v-model:preservation="floorLocal.baseboardPreservation" v-model:length="floorLocal.baseboardLength"
                    @update:replacement="updateBaseboardReplacement"
                    @update:preservation="updateFloor(floorLocal, false)" @update:length="updateFloor(floorLocal, true)"
                    @fill-length="baseboardLengthAsPerimeter" />
            </q-card-section>
            <q-card-section>
                <PhotoGallery :urls="floorPhotos" />
            </q-card-section>
        </div>
        <SectionLayout :sections="floorLocal.sections" @add-section="addSection" @remove-section="deleteSection">
            <template v-slot="{ section }">
                <div class="q-gutter-md" style="width: 400px;">
                    <q-input type="number" v-model.number="section.area" label="Полщадь секции пола"
                        style="width: 180px;"
                        @update:model-value="updateFloorSection(section as BoqFloorSection, true)" />
                    <q-toggle color="secondary" v-model="section.screedLeveling" label="Выравнивание стяжки"
                        @update:model-value="updateFloorSection(section as BoqFloorSection, false)" />
                </div>
                <div>
                    <MaterialReplacement v-model:replacement="section.materialReplacement"
                        v-model:preservation="section.materialPreservation" v-model:material="section.material"
                        :materials="materials"
                        @update:replacement="(val: boolean) => updateFloorSectionMaterialReplacement(section as BoqFloorSection, val)"
                        @update:preservation="updateFloorSection(section as BoqFloorSection, false)"
                        @update:material="updateFloorSection(section as BoqFloorSection, false)" />
                </div>
            </template>
        </SectionLayout>
    </div>
</template>
<script lang="ts" setup>
import MaterialReplacement from './common/MaterialReplacement.vue';
import BaseboardReplacement from './common/BaseboardReplacement.vue';
import { storeToRefs } from 'pinia';
import { Material } from 'src/features/lookup/material/stores/types';
import { ref } from 'vue';
import { BoqFloorApi } from '../../api/floor/boq-floor-api';
import { BoqFloor, BoqFloorSection, toFloorSectionUpdateRequest, toFloorUpdateRequest } from '../../api/floor/types';
import { useBoqWorkService } from '../../composables/boq-work';
import { useBoqLocationStore } from '../../stores/boq-location-store';
import PhotoGallery from './common/PhotoGallery.vue';
import SectionLayout from './common/SectionLayout.vue';

const { floorPhotos, location } = storeToRefs(useBoqLocationStore())
const { requestWorks } = useBoqWorkService()

const props = defineProps<{
    floor: BoqFloor
}>()

const floorLocal = ref<BoqFloor>(props.floor)

const addSection = async () => {
    const response = await BoqFloorApi.createFloorSection(props.floor.id!)
    floorLocal.value.sections.push(response.data)
}

const deleteSection = async (id: number) => {
    await BoqFloorApi.deleteFloorSection(id)
    floorLocal.value.sections = floorLocal.value.sections.filter(item => item.id != id)
}

const updateBaseboardReplacement = async () => {
    if (!floorLocal.value.baseboardReplacement) {
        floorLocal.value.baseboardPreservation = false
    }

    await updateFloor(floorLocal.value, false)
}

const updateFloorSectionMaterialReplacement = async (section: BoqFloorSection, value: boolean) => {
    if (!value) {
        section.materialPreservation = false
    }

    await updateFloorSection(section, false)
}

const baseboardLengthAsPerimeter = async () => {
    floorLocal.value.baseboardLength = location.value?.perimeter || 0
    await updateFloor(floorLocal.value, true)
}

const updateFloorSection = async (floorSection: BoqFloorSection, updateVolume: boolean) => {
    await BoqFloorApi.updateFloorSection(floorSection.id, toFloorSectionUpdateRequest(floorSection), updateVolume)
    await requestWorks()
}

const updateFloor = async (floor: BoqFloor, updateVolume: boolean) => {
    await BoqFloorApi.updateFloor(floor.id, toFloorUpdateRequest(floor), updateVolume)
    await requestWorks()
}

const materials = ref<Material[]>(props.floor.structElems.flatMap(item => item.materials))
</script>
<style scoped>
.photo {
    height: 200px;
    width: 160px;
}
</style>