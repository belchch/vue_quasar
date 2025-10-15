<template>
    <div style="position: relative;">
        <div class="text-caption q-ma-sm text-accent">Конструкция {{ index + 1 }}</div>
        <div class="absolute-top-right">
            <q-btn icon="delete" color="secondary" flat size="md" @click="emits('remove')" />
        </div>

        <q-card-section>
            <!-- <q-input type="number" v-model.number="fixedAssetLocal.area" label="Полщадь секции" style="width: 180px;"
                @update:model-value="updateFixedAsset(true)" /> -->

            <q-card bordered flat style="width: 400px;">
                <div class="text-caption q-ma-sm">Размеры</div>
                <q-card-section class="q-pt-none">
                    <div class="row q-gutter-x-xl">
                        <q-input type="number" v-model.number="fixedAssetLocal.height" label="Высота" style="width: 120px;"
                            @update:model-value="updateFixedAsset(true)" />

                        <q-input type="number" v-model.number="fixedAssetLocal.perimeter" label="Периметр" style="width: 120px;"
                            @update:model-value="updateFixedAsset(true)" />
                    </div>
                    <div class="row q-gutter-md q-mt-none">
                        <div class="row">
                            <div class="text-caption">Полщадь поверхности:</div>
                            <div class="q-ml-sm text-accent computed-value">
                                {{ fixedAssetLocal.surfaceArea }}
                                <q-tooltip>{{ fixedAssetLocal.surfaceArea }}</q-tooltip>
                            </div>
                        </div>                        
                    </div>
                </q-card-section>
            </q-card>

            <div class="q-mt-md">
                <q-toggle color="secondary" v-model="fixedAssetLocal.plaster" label="Штукатурка" size="sm"
                    @update:model-value="updateFixedAsset(false)" />
            </div>
            <div class="row q-gutter-x-lg q-mt-md">
                <MaterialReplacement v-model:material="fixedAssetLocal.material"
                    v-model:replacement="fixedAssetLocal.replacement" v-model:preservation="fixedAssetLocal.painting"
                    :materials="materials" @update:material="updateFixedAsset(false)"
                    @update:preservation="updateFixedAsset(false)" @update:replacement="updateReplacement()"
                    preservation-label="С окраской" />
            </div>
        </q-card-section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBoqWorkService } from '../../composables/boq-work';
import MaterialReplacement from './common/MaterialReplacement.vue';
import { BoqFixedAssetModel, toFixedAssetUpdateRequest } from '../../api/fixed-asset/types';
import { BoqFixedAssetApi } from '../../api/fixed-asset/boq-fixed-asset-api';

const { requestWorks } = useBoqWorkService()

const props = defineProps<{
    index: number,
    fixedAsset: BoqFixedAssetModel
}>()

const materials = computed(() => {
    return fixedAssetLocal.value.structElems.flatMap(item => item.materials)
})

const emits = defineEmits<{
    remove: []
}>()

const fixedAssetLocal = ref<BoqFixedAssetModel>(props.fixedAsset)

const updateReplacement = async () => {
    if (!fixedAssetLocal.value.replacement) {
        fixedAssetLocal.value.painting = false
    }

   await updateFixedAsset(false)
}

const updateFixedAsset = async (updateVolume: boolean) => {
    const response = await BoqFixedAssetApi.updateFixedAsset(
        fixedAssetLocal.value.id,
        toFixedAssetUpdateRequest(fixedAssetLocal.value),
        updateVolume
    )

    fixedAssetLocal.value = response.data
    await requestWorks()
}

</script>