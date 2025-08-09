<template>
    <div class="header row justify-between items-center" bordered square flat>
        <q-btn flat icon="keyboard_arrow_left" @click="$router.back()" class="text-grey-8 q-ml-sm"
            style="width: 36px" />

        <q-btn flat icon="sym_o_left_panel_close" class="text-grey-8 q-mr-sm" style="width: 36px;"
            @click="emits('close')" />
    </div>
    
    <div class="q-py-md">
        <q-list v-if="!selectedInspectionId || selectedCase?.expertiseType == 'SHARED_EQUITY'">
            <MenuItem name="information" label="Информация" icon="note_alt" />
            <MenuItem name="questions" label="Вопросы" icon="text_snippet"/>
            <MenuItem name="documents" label="Документы" icon="folder_open"/>
            <MenuItem name="inspections" label="Осмотры" icon="policy"/>
        </q-list>
        <template v-if="selectedCase?.expertiseType != 'SHARED_EQUITY'">
            <q-list v-if="selectedInspectionId">
                <MenuItem name="inspection" label="Фото" />
                <MenuItem name="measurements" label="Размеры" />
                <MenuItem name="general-views" label="Общие виды" />
                <q-expansion-item label="Дефекты" :content-inset-level="0.3">
                    <q-list>
                        <MenuItem name="defectTable" label="Таблица" />
                        <MenuItem name="technical-report" label="Техническое заключение" />
                        <MenuItem name="defect-report" label="Отчет" />
                    </q-list>
                </q-expansion-item>
                <MenuItem name="boq" label="ВОР" />
                <MenuItem name="common-report" label="Общий отчет" />
            </q-list>
        </template>
        <template v-else>
            <q-expansion-item label="Осмотр" :content-inset-level="0.3">
                <q-list v-if="selectedInspectionId">
                    <MenuItem name="inspection" label="Фото" />
                    <MenuItem name="measurements" label="Размеры" />
                    <MenuItem name="general-views" label="Общие виды" />
                    <q-expansion-item label="Дефекты" :content-inset-level="0.3">
                        <q-list>
                            <MenuItem name="defectTable" label="Таблица" />
                            <MenuItem name="technical-report" label="Техническое заключение" />
                            <MenuItem name="defect-report" label="Отчет" />
                        </q-list>
                    </q-expansion-item>
                    <MenuItem name="boq" label="ВОР" />
                    <MenuItem name="common-report" label="Общий отчет" />
                </q-list>
            </q-expansion-item>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { computed, InjectionKey, provide, ref } from 'vue';
import MenuItem from './MenuItem.vue';
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store';

const { selectedCase } = storeToRefs(useSelectedCaseStore())
const { selectedInspectionId } = storeToRefs(useInspectionsStore())

const props = defineProps<{
    activeTab: string
}>()

const emits = defineEmits<{
    close: [],
    'update:activeTab': [string]
}>()

</script>
<style lang="scss" scoped>
.header {
    height: 49px;
}
</style>