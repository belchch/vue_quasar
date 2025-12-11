<template>
  <div>
    <CpiSelectDialog
      v-model="openCpiDialog"
      :item="salvageableMaterialsObject?.consumerPriceIndex || null"
      @select-cpi="handleCpiSelected"
    />
    <div class="q-pa-lg text-center" v-if="loading">
      <q-spinner color="primary" size="3em" />
    </div>
    <div v-else>
      <div v-if="!isInitialized">
        <div class="q-pa-lg text-center">
          <div class="q-mb-md text-subtitle1">Годные остатки еще не сформированы</div>
          <q-btn size="md" color="primary" class="q-ml-md" @click="initSm">Сформировать</q-btn>
        </div>
      </div>
      <div v-else>
        <SalvageableMaterialTable
          title="Годные остатки"
          @init-click="initSm"
          @edit-cpi-click="handleEditCpiClick"
        />
        <SalvageableMaterialResultTable title="Итоговый расчет" />
        <SalvageableMaterialTable title="Не используемые" :show-used="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SalvageableMaterialTable from 'src/features/salvageable/components/SalvageableMaterialTable.vue'
import SalvageableMaterialResultTable from 'src/features/salvageable/components/SalvageableMaterialResultTable.vue'
import { useSalvageableService } from 'src/features/salvageable/service'
import { useSalvageableMaterialStore } from 'src/features/salvageable/store'
import {
  ConsumerPriceIndexItem,
  ConsumerPriceIndexItemRequest,
} from 'src/features/lookup/consumer-price-index/types'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import CpiSelectDialog from 'src/features/salvageable/components/CpiSelectDialog.vue'

const route = useRoute()
const salvageableService = useSalvageableService()
const {
  salvageableMaterials,
  usedSalvageableMaterials,
  unUsedSalvageableMaterials,
  smId,
  isInitialized,
  salvageableMaterialsObject,
} = storeToRefs(useSalvageableMaterialStore())

const isInitAction = ref(false)
const loading = ref(false)

const openCpiDialog = ref(false)
const initSm = () => {
  isInitAction.value = true
  openCpiDialog.value = true
}
const initPage = async () => {
  loading.value = true
  await salvageableService.requestSalvageable()
  if (isInitialized.value) {
    await salvageableService.requestSalvageableMaterials()
  }
  loading.value = false
}

const handleCpiSelected = async (cpi: ConsumerPriceIndexItem) => {
  if (isInitAction.value) {
    loading.value = true
    await salvageableService.initSalvageableMaterials(cpi)
    isInitAction.value = false
    loading.value = false
  } else {
    await salvageableService.setConsumerPriceIndex(cpi)
    await salvageableService.requestSalvageableMaterials()
  }
}

const handleEditCpiClick = () => {
  isInitAction.value = false
  openCpiDialog.value = true
}

watch(
  () => route.params.inspectionId,
  async () => {
    // console.log('watch init')
    await initPage()
  },
)
onMounted(async () => {
  // console.log('mounted init')
  await initPage()
})
</script>

<style scoped></style>
