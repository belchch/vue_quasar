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

const init = async () => {
  await requestBoq()
  await getEstimate()
}

watch(selectedInspectionId, async () => {
  if (route.name != 'boq-summary') {
    await navigateInspectionPage('boq')
  } else {
    await init()
  }
})

onMounted(async () => {
  await init()
})
</script>
