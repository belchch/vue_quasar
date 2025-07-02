<template>
    <div>
        <div v-if="generalViewReport">
            <div v-for="(row, index) in generalViewReport.rows" :key="index" class="row q-gutter-md no-wrap q-mb-md ">
                <div v-for="(item, index) in row.items" :key="index" class="q-gutter-xs">
                    <div class="row no-wrap">
                        <q-card bordered flat class="row q-pa-sm no-wrap" :class="{ 'none-event': !hasPermission(['generalViewReport.update']) }">
                            <draggable v-model="item.photos" item-key="id" tag="div" handle=".drag-handle"
                                group="photos" @start="drag = true" @end="drag = false" @change="onDragChange"
                                class="q-gutter-md row full-width report-item no-wrap">
                                <template #item="{ element }">
                                    <div class="report-photo drag-handle">
                                        <q-img :src="element.url" />
                                    </div>
                                </template>
                            </draggable>
                            <div class="q-ml-md" v-if="hasPermission(['generalViewReport.update'])">
                                <q-btn icon="delete" @click="removeItem(row.id!!, item.id!!)" size="sm"
                                    color="secondary" flat dense />
                            </div>
                        </q-card>
                    </div>
                    <q-card bordered flat>
                        <div class="cursor-pointer text-center text-caption">
                            {{ item.text }}
                            <q-popup-edit v-if="hasPermission(['generalViewReport.update'])" v-model="item.text" auto-save v-slot="scope" @update:model-value="refresh">
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </div>
                    </q-card>

                </div>
                <div class="column" v-if="hasPermission(['generalViewReport.update'])">
                    <q-btn icon="add" @click="addItem(row.id!!)" color="secondary" size="xs" />
                    <q-btn icon="remove" @click="removeRow(row.id!!)" color="secondary" size="xs" class="q-mt-sm" />
                </div>
            </div>
            <q-btn v-if="hasPermission(['generalViewReport.update'])" icon="add" @click="addRow()" label="добавить строку" color="secondary" size="sm"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { GeneralViewReport, GeneralViewReportRow } from "src/features/general-view/store/types";
import { onMounted, ref } from 'vue';
import draggable from 'vuedraggable';
import { useGeneralViewReportService } from '../composables/general-view';
import { useGeneralViewReportStore } from '../store/general-view-store';
import { useGeneralViewGalleryService } from '../composables/gallery';
import { useUserStore } from "src/features/user/stores/user-store";

const drag = ref()

const { generalViewReport } = storeToRefs(useGeneralViewReportStore())
const { updateGeneralViewReport, requestGeneralViewReport } = useGeneralViewReportService()
const { requestGallery } = useGeneralViewGalleryService()
const { hasPermission } = useUserStore()

const refresh = async () => {
    await updateGeneralViewReport()
    await requestGallery()
}

const onDragChange = async () => {
    await refresh()
}

const updateReport = async (updateFn: (update: GeneralViewReport) => void) => {
    console.log('before update', generalViewReport.value)
    const update = _.cloneDeep(generalViewReport.value)
    updateFn(update!!)
    generalViewReport.value = update
    console.log('update value', update)
    await refresh()
}

const updateRow = async (rowId: number, updateFn: (update: GeneralViewReportRow) => void) => {
    await updateReport(update => {
        const row = update.rows.find(row => row.id == rowId)
        updateFn(row!!)
    })
}

const addItem = async (rowId: number) => {
    await updateRow(rowId, update => {
        update.items.push({
            text: 'Фото',
            photos: []
        })
    })
}

const removeItem = async (rowId: number, itemId: number) => {
    await updateRow(rowId, row => {
        _.remove(row.items, { id: itemId })
    })
}

const removeRow = async (rowId: number) => {
    await updateReport(report => {
        _.remove(report.rows, { id: rowId })
    })
}

const addRow = async () => {
    await updateReport(update => {
        update?.rows.push({
            items: []
        })
    })
}

onMounted(async () => {
    await requestGeneralViewReport()
})
</script>
<style scoped>
.report-photo {
    height: 300px;
    width: 240px;
}

.report-item {
    height: 330px;
    min-width: 256px;
}
.none-event {
  pointer-events: none;
}
</style>
