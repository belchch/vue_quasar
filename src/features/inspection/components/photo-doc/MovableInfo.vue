<template>
  <movable-info-dialog
    :movable-info="movableInfo"
    :photo-doc-id="photoDocId"
    v-model="editDialog"
  />
  <q-separator class="q-mb-xs q-mt-md" />
  <q-card flat>
    <div class="row items-center text-grey-8">
      <q-icon name="chair" class="q-ml-sm text-grey-8" />
      <div class="text-caption text-grey-8">&nbsp;&nbsp;&nbsp;{{ movableInfo?.movable?.name }}</div>
      <q-space />
      <q-btn square icon="edit" color="secondary" size="xs" outline @click="editDialog = true" />
    </div>
    <div class="text-caption text-grey-8">
      {{ getMeasurement(movableInfo?.movable) }}
    </div>
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
import { PhotoDocMovable, PhotoDocMovableInfo } from '../../store/types'
import MovableInfoDialog from './MovableInfoDialog.vue'

const props = defineProps<{
  photoDocId: number
  movableInfo: PhotoDocMovableInfo | undefined
}>()
const { updatePhotoDocMovableInfo } = useSelectedInspection()
const floodDamageStore = useFloodDamageStore()

const editDialog = ref(false)
const movable = ref<PhotoDocMovable | undefined>(props.movableInfo?.movable)
const floodDamage = ref<FloodDamage | undefined>(props.movableInfo?.floodPropertyDamage)
const update = async () => {
  const updatedMovableInfo = {
    ...props.movableInfo,
    floodPropertyDamage: floodDamage.value,
    movable: props.movableInfo?.movable,
  }
  await updatePhotoDocMovableInfo(props.photoDocId, updatedMovableInfo)
  await Promise.resolve()
}
const getMeasurement = (movable: PhotoDocMovable | undefined) => {
  if (movable) {
    return `${movable.width} x ${movable.length} x ${movable.height}`
  } else {
    return '-'
  }
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
