<template>
  <div>
    <q-btn @click="propagate()" outline label="Заполнить размеры" color="primary" :loading="loading"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { tpcMeasurementApi } from '../../api/tpc-measurement-api';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { storeToRefs } from 'pinia';
import { useMeasurementService } from '../../composables/measurement';
const loading = ref(false)
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const {requestAllMeasurements} = useMeasurementService()

const propagate = async () => {
  loading.value = true

  try {
    await tpcMeasurementApi.propagateTpcMeasurements(selectedInspectionId.value!)
    await requestAllMeasurements()
  } finally {
    loading.value = false
  }
}

</script>

<style scoped></style>
