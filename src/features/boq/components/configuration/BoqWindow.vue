<template>
    <div style="position: relative;">
        <div class="text-caption q-ma-sm text-accent">Окно {{ index + 1 }}</div>
        <q-card-section>            
            <div class="row q-gutter-x-lg q-mt-md">
                <div>
                    <q-card bordered flat style="width: 400px;">
                        <div class="text-caption q-ma-sm">Размеры</div>
                        <q-card-section class="q-pt-none">
                            <div class="row q-gutter-xl">
                                <div>
                                    <LabeledValue label="Ширина" :value="windowLocal.width" />
                                    <LabeledValue label="Площадь" :value="windowLocal.area" :accent="true"/>
                                </div>
                                <div>
                                    <LabeledValue label="Высота" :value="windowLocal.height" />
                                    <LabeledValue label="Периметер" :value="windowLocal.perimeter" :accent="true"/>
                                </div>
                            </div>       
                        </q-card-section>
                    </q-card>
                </div>

                <div>
                    <div>
                        <ReplacementToggles v-model:replacement="windowLocal.replacement"
                            v-model:preservation="windowLocal.preservation" replacement-label="Замена окна"
                            @update:replacement="updateReplacement()"
                            @update:preservation="updateWindow(false)" />
                    </div>

                    <div class="q-mt-md">
                        <q-toggle color="secondary" v-model="windowLocal.hasSlopes" label="Откосы пластик"
                            size="sm" @update:model-value="updateWindow(false)" />
                    </div>
                </div>
            </div>
        </q-card-section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { BoqWindowApi } from '../../api/window/boq-window-api';
import { BoqWindowModel, toWindowUpdateRequest } from '../../api/window/types';
import { useBoqWorkService } from '../../composables/boq-work';
import LabeledValue from './common/LabeledValue.vue';
import ReplacementToggles from './common/ReplacementToggles.vue';

const { requestWorks } = useBoqWorkService()

const props = defineProps<{
    index: number,
    window: BoqWindowModel
}>()

const emits = defineEmits<{
    remove: []
}>()

const doorTypeOptions = ref([
    {
        label: 'Межкомнатная',
        value: 'INTERIOR'
    },
    {
        label: 'Входная',
        value: 'ENTRANCE'
    },
])

// const selectedDoorType = computed(() => {
//     return doorTypeOptions.value.find(item => item.value == windowLocal.value.type)
// })

const windowLocal = ref<BoqWindowModel>(props.window)

const updateReplacement = async () => {
    if (!windowLocal.value.replacement) {
        windowLocal.value.preservation = false
    }

    await updateWindow(false)
}

const updateWindow = async (updateVolume: boolean) => {
    const response = await BoqWindowApi.updateWindow(
        windowLocal.value.id,
        toWindowUpdateRequest(windowLocal.value),
        updateVolume
    )

    windowLocal.value = response.data
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