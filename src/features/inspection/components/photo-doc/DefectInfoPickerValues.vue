<template>
  <q-card flat>
    <div class="column q-gutter-md">
      <q-card-section class="q-gutter-md column">
        <div class="text-grey-8">{{ defect?.template }}</div>
      </q-card-section>
      <q-card-section class="q-gutter-md column q-mt-none" style="max-width: 400px">
        <q-input v-if="defect?.hasValue" outlined v-model="defectValue" dense label="Значение"/>
        <q-input v-if="defect?.hasCause" outlined v-model="defectCause" dense label="Причина"/>
      </q-card-section>
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { useDefectSearch } from 'src/features/inspection/store/defect-search-store.js'
import { computed } from 'vue'
import _ from 'lodash'

const defectSearchService = useDefectSearch()

const defect = computed(() => {
  return _.first(defectSearchService.response.defects)
})

const defectValue = defineModel<string | undefined>('defect-value')
const defectCause = defineModel<string | undefined>('defect-cause')

</script>
