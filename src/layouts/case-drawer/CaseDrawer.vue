<template>
    <div class="header row justify-between items-center" bordered square flat>
        <div class="row">
            <q-btn flat icon="keyboard_arrow_left" to="/cases" class="text-grey-8 q-ml-sm"
                style="width: 36px;" />
        </div>

        <q-btn flat icon="sym_o_left_panel_close" class="text-grey-8 q-mr-sm" style="width: 36px; "
            @click="emits('close')" />
    </div>

    <q-scroll-area style="height: 81vh;">
        <div class="q-py-md">
            <q-list>
                <q-expansion-item label="Осмотры" icon="policy" :content-inset-level="0"
                    class="text-grey-8 text-subtitle2">
                    <q-list>                        
                        <InspectionMenuItem v-for="item in inspections" :key="item.id!" :inspection="item" />
                        <div class="add-inspection-btn">
                            <q-btn size="xs" color="primary" outline @click="createInspectionOpen = true">добавить
                                осмотр</q-btn>
                        </div>
                    </q-list>
                </q-expansion-item>
                <MenuItem page-name="case-information" />
                <MenuItem page-name="case-questions" />            
            </q-list>

            <q-separator class="q-my-md" />

            <q-list v-if="selectedInspectionId">
                <MenuItem page-name="inspection-photos" />
                <MenuItem page-name="inspection-measurements" />
                <MenuItem page-name="inspection-gv" />
                <MenuItem page-name="inspection-defects" />
                <MenuItem page-name="inspection-boq" />
                <MenuItem page-name="inspection-documents" />
                <MenuItem page-name="inspection-report" />
                <MenuItem page-name="inspection-settings" />
            </q-list>
        </div>
    </q-scroll-area>
    <CreateInspection v-model="createInspectionOpen" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNavigate } from 'src/composables/navigate';
import CreateInspection from 'src/features/case/components/CreateInspection.vue';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { ref } from 'vue';
import InspectionMenuItem from './InspectionMenuItem.vue';
import MenuItem from './MenuItem.vue';

const { selectedInspectionId, inspections } = storeToRefs(useInspectionsStore())
const { caseUrl, inspectionUrl } = useNavigate()

const createInspectionOpen = ref<boolean>(false)

const emits = defineEmits<{
    close: []
}>()

</script>
<style lang="scss" scoped>
.header {
    height: 49px;
}

.add-inspection-btn {
    margin: 8px 0 8px 72px
}
</style>