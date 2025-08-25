<template>
    <div style="position: relative;">
        <div class="text-caption q-ma-sm text-accent">Дверь {{ index + 1 }}</div>
        <div class="absolute-top-right">
            <q-btn icon="delete" color="secondary" flat size="md" @click="emits('remove')" />
        </div>
        <q-card-section>
            <div class="row q-gutter-x-lg">
                <div>
                    <q-card bordered flat style="width: 400px;">
                        <div class="text-caption q-ma-sm">Размеры</div>
                        <q-card-section class="q-pt-none">
                            <div class="row q-gutter-x-xl">
                                <q-input type="number" v-model.number="interiorDoorLocal.width" label="Ширина"
                                    style="width: 120px;" @update:model-value="updateInteriorDoor(true)" />

                                <q-input type="number" v-model.number="interiorDoorLocal.height" label="Высота"
                                    style="width: 120px;" @update:model-value="updateInteriorDoor(true)" />
                            </div>
                            <div class="row q-gutter-md q-mt-none">
                                <div class="row">
                                    <div class="text-caption">Полщадь:</div>
                                    <div class="q-ml-sm text-accent computed-value">
                                        {{ interiorDoorLocal.area }}
                                        <q-tooltip>{{ interiorDoorLocal.area }}</q-tooltip>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="text-caption">Периметер:</div>
                                    <div class="q-ml-sm text-accent computed-value">
                                        {{ interiorDoorLocal.perimeter }}
                                        <q-tooltip>{{ interiorDoorLocal.perimeter }}</q-tooltip>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>

                <div>
                    <div>
                        <ReplacementToggles v-model:replacement="interiorDoorLocal.replacement"
                            v-model:preservation="interiorDoorLocal.preservation" replacement-label="Замена двери"
                            @update:replacement="updateReplacement()"
                            @update:preservation="updateInteriorDoor(false)" />
                    </div>

                    <div class="q-mt-md">
                        <q-toggle color="secondary" v-model="interiorDoorLocal.trimsReplacement"
                            label="Замена наличников" size="sm" @update:model-value="updateInteriorDoor(false)" />
                    </div>

                    <div class="q-mt-md">
                        <q-toggle color="secondary" v-model="interiorDoorLocal.hasSlopes" label="Наличие откосов"
                            size="sm" @update:model-value="updateInteriorDoor(false)" />
                    </div>
                </div>
            </div>
        </q-card-section>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { BoqInteriorDoorApi } from '../../api/interior-door/boq-interior-door-api';
import { BoqInteriorDoorModel, toInteriorDoorUpdateRequest } from '../../api/interior-door/types';
import { useBoqWorkService } from '../../composables/boq-work';
import ReplacementToggles from './common/ReplacementToggles.vue';

const { requestWorks } = useBoqWorkService()

const props = defineProps<{
    index: number,
    interiorDoor: BoqInteriorDoorModel
}>()

const emits = defineEmits<{
    remove: []
}>()

const interiorDoorLocal = ref<BoqInteriorDoorModel>(props.interiorDoor)

const updateReplacement = async () => {
    if (!interiorDoorLocal.value.replacement) {
        interiorDoorLocal.value.preservation = false
    }

    await updateInteriorDoor(false)
}

const updateInteriorDoor = async (updateVolume: boolean) => {
    const response = await BoqInteriorDoorApi.updateInteriorDoor(
        interiorDoorLocal.value.id,
        toInteriorDoorUpdateRequest(interiorDoorLocal.value),
        updateVolume
    )

    interiorDoorLocal.value = response.data
    await requestWorks()
}

</script>
<style scoped>
.computed-value {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 60px;
}
</style>