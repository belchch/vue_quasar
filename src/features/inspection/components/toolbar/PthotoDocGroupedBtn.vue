<template>
    <q-btn-dropdown flat
        :label="useToolbar.isGrouped ? useToolbar.isGroupedBy == 'location' ? 'по локации' : 'по типу' : 'группировать'"
        icon="sym_o_view_agenda" size="sm" class="q-px-sm">
        <q-list>
            <q-item clickable v-close-popup @click="groupBy('location')"
                :class="useToolbar.isGroupedBy === 'location' ? 'active' : ''">
                <q-item-section>
                    <q-item-label>по локации</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="groupBy('type')"
                :class="useToolbar.isGroupedBy === 'type' ? 'active' : ''">
                <q-item-section>
                    <q-item-label>по типу</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useInspectionToolbarStore } from 'src/features/inspection/store/inspection-toolbar-store'

const useToolbar = useInspectionToolbarStore()

const groupBy = (field: string) => {
    if (useToolbar.isGroupedBy === field) {
        useToolbar.isGroupedBy = ''
        useToolbar.isGrouped = false
        return
    }
    useToolbar.isGroupedBy = field
    useToolbar.isGrouped = true
}
</script>

<style scoped lang="scss">
.active {
    background-color: var(--q-primary-15);
    color: var(--q-primary);
}
</style>