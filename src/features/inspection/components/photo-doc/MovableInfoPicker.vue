<template>
    <div>
        <q-btn square icon="edit" color="secondary" size="xs" outline @click="openDialog" />

        <q-dialog v-model="open">
            <q-card class="column q-pa-lg">
                
            </q-card>
        </q-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { PhotoDocMovableInfo } from '../../store/types';

const props = defineProps<{
    photoDocId: number
    movableInfo: PhotoDocMovableInfo | undefined
}>()

const emits = defineEmits<{
    changeMovableInfo: PhotoDocMovableInfo
}>()

const open = ref<boolean>(false)

const openDialog = () => {
    open.value = true
    //   await defectSearchService.search({
    //     structElemId: props.defectInfo?.structElem?.id,
    //     materialId: props.defectInfo?.material?.id,
    //     flawId: props.defectInfo?.flaw?.id,
    //     defectId: props.defectInfo?.defect?.id,
    //   })
}
</script>