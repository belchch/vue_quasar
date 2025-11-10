<template>
  <q-page-sticky expand position="top">
    <q-toolbar class="bg-white" style="border-bottom: 1px solid #e0e0e0">
      <q-btn v-if="!drawerOpen" flat icon="sym_o_left_panel_open" class="text-grey-8 q-mr-sm" style="width: 36px;"
        @click="emits('update:drawerOpen', true)" />
      <q-chip square color="primary" text-color="white" style="height: 20px;">
        {{ caseTypeDesc() }}
      </q-chip>
      <CaseBreadcrumbs />
      <q-space />
      <div class="text-subtitle2 q-mr-lg">
        <span class="text-accent">№ {{ selectedCase?.number }}</span>
      </div>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store';
import CaseBreadcrumbs from './CaseBreadcrumbs.vue';

defineProps<{
  drawerOpen: boolean
}>()

const { selectedCase } = storeToRefs(useSelectedCaseStore())

const caseTypeDesc = () => {
  switch (selectedCase.value?.expertiseType) {
    case 'SHARED_EQUITY': return 'ДДУ';
    case 'FLOOD_DAMAGE': return 'Залив';
    default: return ''
  }
}

const emits = defineEmits<{
  (e: 'update:drawerOpen', value: boolean): void,
}>()
</script>

<style scoped lang="scss">
.q-page-sticky {
  z-index: 1;
}
</style>
