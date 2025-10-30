<template>
  <div class="q-gutter-xs q-mb-xs q-mt-md">
    <q-separator />
    <q-select borderless v-model="movable" :options="movables" label="Объект" dense @update:model-value="update"
      option-label="name" option-value="id" />

    <q-select borderless v-model="floodDamage" :options="filteredFloodDamage" label="Дефект" dense
      @update:model-value="update" option-label="name" option-value="id" menu-self="center right"
      @filter="filterFloodDamage" use-input input-debounce="0" fill-input hide-selected behavior="dialog" />
  </div>

</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useFloodDamageStore } from 'src/features/lookup/flood-damage/flood-damage-store';
import { FloodDamage } from 'src/features/lookup/flood-damage/types';
import { useMovableStore } from 'src/features/measurement/stores/movable-store';
import { computed, ref } from 'vue';
import { PhotoDocMovable, PhotoDocMovableInfo } from '../../store/types';

const props = defineProps<{
  photoDocId: number,
  movableInfo: PhotoDocMovableInfo | undefined
}>()

const { movables } = storeToRefs(useMovableStore())
const floodDamageStore = useFloodDamageStore()

const movable = ref<PhotoDocMovable | undefined>(props.movableInfo?.movable)
const floodDamage = ref<FloodDamage | undefined>(props.movableInfo?.floodPropertyDamage)

const update = () => {
  emits('changeMovableInfo', {
    movable: movable.value,
    floodPropertyDamage: floodDamage.value
  })
}

const floodDamageFilter = ref<string>('')

const filteredFloodDamage = computed(() => {
  return floodDamageStore.items.filter(item => {
    return item.name.toLocaleLowerCase().includes(floodDamageFilter.value.toLocaleLowerCase())
  })
})

const filterFloodDamage = (val: any, update: any) => {
  update(() => {
    floodDamageFilter.value = val
  })
}

const emits = defineEmits<{
  changeMovableInfo: [movableInfo: PhotoDocMovableInfo]
}>()
</script>