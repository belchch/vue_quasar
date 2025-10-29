<template>
  <q-card flat>
    <q-card-section>
      <DefectMovableTable :defects="defects" />
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { usePhotoDocsStore } from 'src/features/inspection/store/photo-doc-store'
import DefectMovableTable from 'src/features/defect/components/DefectMovableTable.vue'
import { useAllPhotoDocStore } from 'src/features/inspection/store/all-photo-doc-store'

const { allPhotoDocs } = storeToRefs(useAllPhotoDocStore())

const defects = computed(() => {
  return allPhotoDocs.value.filter((item) => !!item.defectInfo)
})
</script>
