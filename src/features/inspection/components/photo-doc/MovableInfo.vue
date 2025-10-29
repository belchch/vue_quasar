<template>
  <movable-info-dialog :photo-doc="photoDoc" v-model="editDialog" />
  <div class="q-gutter-xs q-mb-xs q-mt-md" v-if="photoDoc?.movableInfo?.movable">
    <q-separator />
    <div style="position: relative; cursor: pointer" @click="editDialog = true">
      <q-input
        borderless
        readonly
        dense
        :model-value="photoDoc?.movableInfo?.movable?.name"
        label="Наименование"
      />
      <div class="text-caption">{{ getMeasurement(photoDoc?.movableInfo?.movable) }}</div>
      <q-icon
        style="top: 4px; right: 4px; position: absolute; opacity: var(--e-opacity-edit-icon)"
        name="edit"
        class="edit-icon"
      />
    </div>
    <q-separator />
    <q-select
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
  </div>
  <div v-else>
    <q-btn
      outline
      no-caps
      size="sm"
      label="Задать параметры"
      class="full-width"
      @click="editDialog = true"
      color="secondary"
    />
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFloodDamageStore } from 'src/features/lookup/flood-damage/flood-damage-store'
import { FloodDamage } from 'src/features/lookup/flood-damage/types'
import { useMovableStore } from 'src/features/measurement/stores/movable-store'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'
import { computed, ref } from 'vue'
import { PhotoDocMovable, PhotoDocMovableInfo, PhotoDoc } from '../../store/types'
import MovableInfoDialog from './MovableInfoDialog.vue'

const props = defineProps<{
  photoDoc: PhotoDoc | undefined
}>()
const { updatePhotoDoc } = useSelectedInspection()
const floodDamageStore = useFloodDamageStore()

const editDialog = ref(false)
const movable = ref<PhotoDocMovable | undefined>(props.photoDoc?.movableInfo?.movable)
const floodDamage = ref<FloodDamage | undefined>(props.photoDoc?.movableInfo?.floodPropertyDamage)
const update = async () => {
  await updatePhotoDoc(props.photoDoc!)
}
const getMeasurement = (movable: PhotoDocMovable) => {
  if (movable) {
    return `Ш: ${movable.width} x В: ${movable.height} x Д: ${movable.length}`
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
// const openDialog = () => {
//   emits('openDialogClick')
// }
// const emits = defineEmits<{
//   changeMovableInfo: [movableInfo: PhotoDocMovableInfo]
//   openDialogClick: []
// }>()
</script>
