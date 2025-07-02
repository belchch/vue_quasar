<template>
  <div class="row q-gutter-md2 items-center bg-white q-pa-lg gap-md justify-between">
    <div class="row q-mb-lg2 q-gutter-md2 gap-md">
      <UploadImage v-if="hasPermission(['inspection.update'])" />
      <PhotoDocFilters />
    </div>

    <div class="row q-mb-lg2 q-gutter-md2 gap-sm">
      <PthotoDocGroupedBtn />
      <q-btn
        flat
        :icon="useToolbar.photoDocCollapsed ? 'unfold_more' : 'unfold_less'"
        :label="useToolbar.photoDocCollapsed ? 'развернуть' : 'свернуть'"
        size="sm"
        class="q-px-sm q-mr-sm"
        @click="() => (useToolbar.photoDocCollapsed = !useToolbar.photoDocCollapsed)"
        style="width: 110px"
      />
      <div style="width: 100px">
        <q-slider
          v-model="useToolbar.imageSize"
          :min="200"
          :max="500"
          @update:model-value="() => useToolbar.processGrid()"
          @change="() => useToolbar.updateGrid()"
          color="accent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadImage from './UploadImage.vue'
import PhotoDocFilters from 'src/features/inspection/components/toolbar/PhotoDocFilters.vue'
import PthotoDocGroupedBtn from 'src/features/inspection/components/toolbar/PthotoDocGroupedBtn.vue'
import { useInspectionToolbarStore } from 'src/features/inspection/store/inspection-toolbar-store'
import { useUserStore } from "src/features/user/stores/user-store";

const useToolbar = useInspectionToolbarStore()
const { hasPermission } = useUserStore()
</script>

<style scoped lang="scss"></style>
