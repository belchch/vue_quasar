<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">Все дефекты</div>
      <div class="text-body2">Дефекты, выявленные в ходе натурного осмотра или зафиксированные в техническом заключении</div>
    </q-card-section>
    <q-card-section>
      <DefectTable :defects="defects"/>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { usePhotoDocsStore } from 'src/features/inspection/store/photo-doc-store'
import DefectTable from "src/features/defect/components/DefectTable.vue";
import { useAllPhotoDocStore } from 'src/features/inspection/store/all-photo-doc-store';

const { allPhotoDocs } = storeToRefs(useAllPhotoDocStore())

const defects = computed(() => {
  return allPhotoDocs.value.filter(item => !!item.defectInfo)
})
</script>
