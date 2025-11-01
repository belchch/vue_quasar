<template>  
  <q-card flat>  
    <q-select
      class="q-mt-sm"
      borderless
      v-model="floodDamage"
      :options="filteredFloodDamage"
      label="Дефект"
      dense
      @update:model-value="update"
      option-label="name"
      option-value="id"
      menu-self="center right"
      @filter="filterFloodDamage"
      use-input
      input-debounce="0"
      fill-input
      hide-selected
      behavior="dialog"
    />
  </q-card>
</template>
<script lang="ts" setup>
import { useFloodDamageStore } from 'src/features/lookup/flood-damage/flood-damage-store'
import { FloodDamage } from 'src/features/lookup/flood-damage/types'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'
import { computed, ref } from 'vue'
import { PhotoDocFinishingInfo, PhotoDocMovable } from '../../store/types'

const props = defineProps<{
  photoDocId: number
  finishingInfo: PhotoDocFinishingInfo | undefined
}>()
const { updatePhotoDocFinishingInfo } = useSelectedInspection()
const floodDamageStore = useFloodDamageStore()

const floodDamage = ref<FloodDamage | undefined>(props.finishingInfo?.floodFinishingDamage)

const update = async () => {
  const updated = {
    ...props.finishingInfo,
    floodFinishingDamage: floodDamage.value,
  }
  await updatePhotoDocFinishingInfo(props.photoDocId, updated)
  await Promise.resolve()
}

const floodDamageFilter = ref<string>('')

const filteredFloodDamage = computed(() => {
  return floodDamageStore.items.filter((item) => {
    return item.name.toLocaleLowerCase().includes(floodDamageFilter.value.toLocaleLowerCase())
  })
})

const filterFloodDamage = (val: any, update: any) => {
  update(() => {
    floodDamageFilter.value = val
  })
}
</script>
