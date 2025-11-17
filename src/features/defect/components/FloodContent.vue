<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">Все дефекты</div>
      <div class="text-body2">Таблица заливов движимого имущества и отделки</div>
    </q-card-section>
    <q-card-section>
      <FloodTable :defects="defects"/>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAllPhotoDocStore } from 'src/features/inspection/store/all-photo-doc-store';
import { computed } from 'vue';
import FloodTable from './FloodTable.vue';

const { allPhotoDocs } = storeToRefs(useAllPhotoDocStore())

const defects = computed(() => {
  return allPhotoDocs.value.filter(item => !!item.finishingInfo || !!item.movableInfo)
})
</script>
