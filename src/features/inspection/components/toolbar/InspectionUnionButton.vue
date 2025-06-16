<template>
    <q-page-sticky v-if="unionStore.selectedIds.length > 0 && unionStore.isUnionMode" position="bottom-right"
        :offset="[18, 18]">
        <q-card bordered2 class="bg-primary q-pa-none text-white union-button">
            <div class="text-subtitle1 q-pa-md">
                Объединить {{ unionStore.selectedIds.length + 1 }} фото
            </div>
            <q-btn-group class="btn-group">
                <q-btn round2 label="Объединить" icon="check" class="text-grey-4 text-weight-regular" @click="union"/>
                <q-btn round2 label="Отменить" icon="close" class="text-red-4" @click="unionStore.resetUnion" />
            </q-btn-group>

        </q-card>

    </q-page-sticky>
</template>

<script setup lang="ts">
import { usePhotoDocsUnionStore } from '../../store/photo-doc-union-store'
import {useSelectedInspection} from "src/features/inspection/composables/selected-inspection";
const unionStore = usePhotoDocsUnionStore()
const selectedInspectService = useSelectedInspection()

const union = async () => {
  await selectedInspectService.groupPhotoDocs(unionStore.mainPhotoDoc!!.id!!, unionStore.selectedIds)
  unionStore.resetUnion()
}

</script>

<style scoped lang="scss">
.btn-group {
    border-top: 1px solid #ffffff50;

    .q-btn:first-child {
        border-right: 1px solid #ffffff50;
    }
}
</style>
