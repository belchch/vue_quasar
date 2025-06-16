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

const { photoDocs } = storeToRefs(usePhotoDocsStore())

const defects = computed(() => {
  return photoDocs.value.filter(item => !!item.defectInfo)
})
</script>
