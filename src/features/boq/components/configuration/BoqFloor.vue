<template>
    <div>
        <q-card>
            <q-card-section>
                <div class="text-subtitle1 text-accent">Пол</div>
            </q-card-section>
            <div class="row justify-between">
                <q-card-section>
                    <q-card bordered flat style="width: 400px;">
                        <div class="text-caption q-ma-sm">Напольный плинтус</div>
                        <div class="q-ma-md">
                            <div class="row q-gutter-md">
                                <q-toggle color="secondary" v-model="floorLocal.baseboardReplacement" label="Замена"
                                    size="sm" @update:model-value="updateBaseboardReplacement" />

                                <q-toggle color="secondary" v-model="floorLocal.baseboardPreservation"
                                    label="С сохранением" size="sm" @update:model-value="updateFloor(floorLocal, false)"
                                    :disable="!floorLocal.baseboardReplacement" />
                            </div>
                            <div class="row q-gutter-md">
                                <q-input type="number" v-model.number="floorLocal.baseboardLength"
                                    hint="Длина напольного плинтуса" dense style="width: 160px"
                                    @update:model-value="updateFloor(floorLocal, true)" />
                                <div class="row items-center">
                                    <q-btn outline size="xs" color="secondary" @click="baseboardLengthAsPerimeter">Равно
                                        периметру</q-btn>
                                </div>
                            </div>
                        </div>
                    </q-card>
                </q-card-section>
                <q-card-section>
                    <div class="row q-gutter-md">
                        <div v-for="(url, index) in floorPhotos" class="photo" :key="index">
                            <q-img :src="url" />
                        </div>
                    </div>
                </q-card-section>
            </div>
            <div class="q-mt-md q-ml-md">
                <q-btn color="secondary" size="sm" @click="addSection">
                    Добавить секцию
                </q-btn>
            </div>
            <q-card-section v-for="(section, index) in floorLocal.sections" :key="section.id">
                <q-separator />
                <div class="text-caption q-ma-sm text-accent">Секция {{ index + 1 }}</div>
                <div class="row q-pl-md q-gutter-xl">
                    <div class="q-gutter-md" style="width: 400px;">
                        <q-input type="number" v-model.number="section.area" label="Полщадь секции пола"
                            style="width: 180px;" @update:model-value="updateFloorSection(section)" />
                        <q-toggle color="secondary" v-model="section.screedLeveling" label="Выравнивание стяжки"
                            @update:model-value="updateFloorSection(section)" />
                    </div>
                    <div>
                        <q-card bordered flat style="width: 400px;">
                            <div class="text-caption q-ma-sm">Метериал</div>
                            <div class="q-ma-md">
                                <div class="row q-gutter-md">
                                    <q-toggle color="secondary" v-model="section.materialReplacement" label="Замена"
                                        size="sm" @update:model-value="(val: boolean) => updateFloorSectionMaterialReplacement(section, val)" />
                                    <q-toggle color="secondary" v-model="section.materialPreservation" label="С сохранением"
                                        size="sm" @update:model-value="updateFloorSection(section)" :disable="!section.materialReplacement"/>
                                </div>
                                <q-select v-model="section.material" :options="materials" option-label="name"
                                    option-value="id" dense @update:model-value="updateFloorSection(section)" />
                            </div>
                        </q-card>
                    </div>
                    <div class="absolute-top-right q-mr-md" v-if="index > 0">
                        <q-btn icon="delete" color="secondary" flat size="md" @click="deleteSection(section.id)" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script lang="ts" setup>
import { BoqFloor, BoqFloorSection, toFloorSectionUpdateRequest, toFloorUpdateRequest } from '../../api/types';
import { onMounted, ref, watch } from 'vue';
import { Material } from 'src/features/lookup/material/stores/types';
import { BoqFloorApi } from '../../api/boq-floor-api';
import { useBoqLocationService } from '../../composables/boq-location';
import { useBoqLocationStore } from '../../stores/boq-location-store';
import { storeToRefs } from 'pinia';
import { useBoqWorkService } from '../../composables/boq-work';

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

    await updateFloorSection(section)
}

const baseboardLengthAsPerimeter = async () => {
    floorLocal.value.baseboardLength = location.value?.perimeter || 0
    await updateFloor(floorLocal.value, true)
}

const updateFloorSection = async (floorSection: BoqFloorSection) => {
    await BoqFloorApi.updateFloorSection(floorSection.id, toFloorSectionUpdateRequest(floorSection))
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