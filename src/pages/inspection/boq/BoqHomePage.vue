<template>
  <div>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNavigate } from 'src/composables/navigate'
import { useBoqService } from 'src/features/boq/composables/boq'
import { useBoqStore } from 'src/features/boq/stores/boq-store'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { usePageBreadcrumbsStore } from 'src/features/navigation/stores/page-breadcumbs-store'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEstimateService } from 'src/features/estimate/composables/estimate-service'

const { getEstimate } = useEstimateService()

const { requestBoq } = useBoqService()
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { initialized } = storeToRefs(useBoqStore())
const { navigateInspectionPage } = useNavigate()

const route = useRoute()

const init = () => {
  requestBoq().catch((error) => {
    console.error(error)
  })
  getEstimate().catch((error) => {
    console.error(error)
  })
}

watch(selectedInspectionId, async () => {
  if (route.name != 'boq-summary') {
    await navigateInspectionPage('boq')
  } else {
    init()
  }
})

onMounted(() => {
  init()
})
</script>
