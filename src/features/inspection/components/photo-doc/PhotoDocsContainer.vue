<template>
    <div v-if="!useToolbar.isGrouped" class="row  q-pa-lg" :style="useToolbar.gridStyle">
        <PhotoDocCard v-for="item in items" :key="item.id!!" :photo-doc="item"
            :collapsed="useToolbar.photoDocCollapsed" />
    </div>

    <q-list v-else-if="useToolbar.isGroupedBy === 'location'" bordered class="rounded-borders">
        <q-expansion-item v-for="(group, groupName) in groupedItems" :key="'location-' + groupName"
            :label="groupName as string" default-opened header-class="text-primary bg-grey-2" class="grouped-body">
            <div class="row q-gutter-lg   q-pa-lg expansion-grid" :style="useToolbar.gridStyle">
                <PhotoDocCard v-for="item in group" :key="item.id" :photo-doc="item"
                    :collapsed="useToolbar.photoDocCollapsed" />
            </div>
        </q-expansion-item>
    </q-list>

    <q-list v-else-if="useToolbar.isGroupedBy === 'type'" bordered class="rounded-borders">
        <q-expansion-item v-for="(group, groupName) in groupedItems" :key="groupName" :label="groupName as string"
            default-opened header-class="text-primary bg-grey-2" class="grouped-body">
            <div class="row q-gutter-lg   q-pa-lg expansion-grid" :style="useToolbar.gridStyle">
                <PhotoDocCard v-for="item in group" :key="item.id" :photo-doc="item"
                    :collapsed="useToolbar.photoDocCollapsed" />
            </div>
        </q-expansion-item>
    </q-list>

</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import { PhotoDoc, photoDocTypeDesc } from '../../store/types'
import PhotoDocCard from './PhotoDocCard.vue'
import { useInspectionToolbarStore } from 'src/features/inspection/store/inspection-toolbar-store'

const useToolbar = useInspectionToolbarStore()

const props = defineProps({
    items: {
        type: Array as PropType<PhotoDoc[]>,
        required: true
    }
})

const groupedItems = computed(() => {
    if (!useToolbar.isGroupedBy) return {}

    const groups: Record<string, any[]> = {}

    props.items.forEach(item => {
        let groupName = ''

        if (useToolbar.isGroupedBy === 'location') {
            groupName = item.spot?.name || 'Без локации'
        }
        else if (useToolbar.isGroupedBy === 'type') {
            groupName = photoDocTypeDesc(item.type) || 'Неизвестный тип'
        }

        groups[groupName] = groups[groupName] || []
        groups[groupName]?.push(item)
    })

    return groups
})

</script>
<style lang="scss" scoped>
.expansion-grid {
    padding-top: 0;
    margin-top: 0;
}
</style>
<style>
.q-panel {
    overflow-y: hidden;
}
</style>