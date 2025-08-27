<template>
    <div style="position: relative;">
        <div class="text-caption q-ma-sm text-accent">Секция {{ index + 1 }}</div>
        <div class="absolute-top-right">
            <q-btn icon="delete" color="secondary" flat size="md" @click="emits('remove')" />
        </div>
        
        <q-card-section>
            <q-input type="number" v-model.number="wallSectionLocal.area" label="Полщадь секции" style="width: 180px;"
                    @update:model-value="updateWallSection(true)" />

                <div class="q-mt-md">
                    <q-toggle color="secondary" v-model="wallSectionLocal.plaster" label="Штукатурка" size="sm"
                        @update:model-value="updateWallSection(false)" />
                </div>
            <div class="row q-gutter-x-lg q-mt-md">                
                <MaterialReplacement v-model:material="wallSectionLocal.material" v-model:replacement="wallSectionLocal.replacement"
                    v-model:preservation="wallSectionLocal.painting" :materials="materials" @update:material="updateWallSection(false)"
                    @update:preservation="updateWallSection(false)" @update:replacement="updateReplacement()" preservation-label="С окраской"/>
            </div>
        </q-card-section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { BoqWallSectionApi } from '../../api/wall/boq-wall-section-api';
import { BoqWallSectionModel, toWallSectionUpdateRequest } from '../../api/wall/types';
import { useBoqWorkService } from '../../composables/boq-work';
import MaterialReplacement from './common/MaterialReplacement.vue';

const { requestWorks } = useBoqWorkService()

const props = defineProps<{
    index: number,
    wallSection: BoqWallSectionModel
}>()

const materials = computed(() => {
    return wallSectionLocal.value.structElems.flatMap(item => item.materials)
})

const emits = defineEmits<{
    remove: []
}>()

const wallSectionLocal = ref<BoqWallSectionModel>(props.wallSection)

const updateReplacement = async () => {
    if (!wallSectionLocal.value.replacement) {
        wallSectionLocal.value.painting = false
    }

   await updateWallSection(false)
}

const updateWallSection = async (updateVolume: boolean) => {
    const response = await BoqWallSectionApi.updateWallSection(
        wallSectionLocal.value.id,
        toWallSectionUpdateRequest(wallSectionLocal.value),
        updateVolume
    )

    wallSectionLocal.value = response.data
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