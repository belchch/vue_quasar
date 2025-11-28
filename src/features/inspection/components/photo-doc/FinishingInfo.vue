<template>
  <q-card flat>
    <q-separator class="q-mb-xs q-mt-md" />
    <div class="row justify-between">
      <div class="col-5">
        <q-select
          class="q-mt-sm"
          borderless
          v-model="structElem"
          :options="structElems.items"
          label="Поверхность"
          dense
          @update:model-value="updateStructElem"
          option-label="name"
          option-value="id"
          :disable="!hasPermission(['photoDoc.update'])"
        />
      </div>
      <div class="col-5">
        <q-select
          class="q-mt-sm"
          borderless
          v-model="material"
          :options="materials.items"
          label="Материал"
          dense
          @update:model-value="updateMaterial"
          option-label="name"
          option-value="id"
          :disable="!hasPermission(['photoDoc.update'])"
        />
      </div>
    </div>
    <q-select
      class="q-mt-sm"
      borderless
      v-model="floodDamage"
      :options="filteredFloodDamage"
      label="Дефект"
      dense
      @update:model-value="updateFloodFinishingDamage"
      option-label="name"
      option-value="id"
      menu-self="center right"
      @filter="filterFloodDamage"
      use-input
      input-debounce="0"
      fill-input
      hide-selected
      behavior="dialog"
      :disable="!hasPermission(['photoDoc.update'])"
    />
  </q-card>
</template>
<script lang="ts" setup>
import { useFloodDamageStore } from 'src/features/lookup/flood-damage/flood-damage-store'
import { FloodDamage } from 'src/features/lookup/flood-damage/types'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'
import { computed, ref } from 'vue'
import { PhotoDocFinishingInfo, PhotoDocMovable } from '../../store/types'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { StructElem } from 'src/features/lookup/struct-elem/stores/types'
import { Material } from 'src/features/lookup/material/stores/types'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useUserStore } from 'src/features/user/stores/user-store'

const { hasPermission } = useUserStore()

const props = defineProps<{
  photoDocId: number
  finishingInfo: PhotoDocFinishingInfo | undefined
}>()
const { updatePhotoDocFinishingInfo } = useSelectedInspection()
const floodDamageStore = useFloodDamageStore()
const structElems = useStructElemStore()
const materials = useMaterialStore()

const floodDamage = ref<FloodDamage | undefined>(props.finishingInfo?.floodFinishingDamage)
const structElem = ref<StructElem | undefined>(props.finishingInfo?.structElem)
const material = ref<Material | undefined>(props.finishingInfo?.material)

const updateFloodFinishingDamage = async () => {
  const updated = {
    ...props.finishingInfo,
    floodFinishingDamage: floodDamage.value,
  }
  await updatePhotoDocFinishingInfo(props.photoDocId, updated)
  await Promise.resolve()
}

const updateStructElem = async () => {
  const updated = {
    ...props.finishingInfo,
    structElem: structElem.value,
  }
  await updatePhotoDocFinishingInfo(props.photoDocId, updated)
  await Promise.resolve()
}

const updateMaterial = async () => {
  const updated = {
    ...props.finishingInfo,
    material: material.value,
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
