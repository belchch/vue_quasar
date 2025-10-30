<template>
  <movable-info-dialog :photo-doc="photoDoc" v-model="editDialog" />
  <q-separator class="q-mb-xs q-mt-md" />
  <q-card flat>
    <div class="row items-center text-grey-8">
      <q-icon name="chair" class="q-ml-sm text-grey-8" />
      <div class="text-caption text-grey-8">
        &nbsp;&nbsp;&nbsp;{{ photoDoc?.movableInfo?.movable?.name }}
      </div>
      <q-space />
      <q-btn square icon="edit" color="secondary" size="xs" outline @click="editDialog = true" />
    </div>
    <div class="text-caption text-grey-8">
      {{ getMeasurement(photoDoc?.movableInfo?.movable) }}
      <!-- <q-chip square ext-color="white" size="sm" color="blue-1" text-color="blue-7" clickable>
        {{ getMeasurement(photoDoc?.movableInfo?.movable) }}
      </q-chip> -->
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
const getMeasurement = (movable: PhotoDocMovable | undefined) => {
  if (movable) {
    return `${movable.width} x ${movable.height} x ${movable.length}`
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
