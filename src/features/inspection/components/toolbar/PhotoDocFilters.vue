<template>
  <PhotoDocAttributeFilter
    :options="typeOptions"
    option-value="key"
    option-label="name"
    label="Тип"
    v-model="selectedTypes"
    @update:model-value="filtersChange"
  />

  <PhotoDocAttributeFilter
    :options="spotOptions"
    option-valu="id"
    option-label="name"
    label="Локация"
    v-model="selectedSpots"
    @update:model-value="filtersChange"
  />

  <PhotoDocAttributeFilter
    :options="structElemOptions"
    option-valu="id"
    option-label="name"
    label="Поверхность"
    v-model="selectedStructElems"
    @update:model-value="filtersChange"
  />

  <PhotoDocAttributeFilter
    :options="materialOptions"
    option-valu="id"
    option-label="name"
    label="Материал"
    v-model="selectedMaterials"
    @update:model-value="filtersChange"
  />
</template>
<script setup lang="ts">
import PhotoDocAttributeFilter from 'src/features/inspection/components/toolbar/PhotoDocAttributeFilter.vue'
import { PhotoDocType } from 'src/features/inspection/store/types'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useSpotStore } from 'src/features/lookup/spot/stores/spot-store'
import { computed, onMounted, ref } from 'vue'
import _ from 'lodash'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'

const spotStore = useSpotStore()
const structElemStore = useStructElemStore()
const materialStore = useMaterialStore()
const selectedInspectionService = useSelectedInspection()

type LookupOption = {
  id?: number | null
  name: string
}

const noValueText = 'Нет значения'

const plusNull = (items: LookupOption[]) => {
  return [{ id: null, name: noValueText }, ...items]
}

const spotOptions = computed(() => plusNull(spotStore.items))
const structElemOptions = computed(() => plusNull(structElemStore.items))
const materialOptions = computed(() => plusNull(materialStore.items))

type PhotoDocTypeOption = PhotoDocType | null

const typeOptions: { key: PhotoDocTypeOption; name: string }[] = [
  {
    key: null,
    name: noValueText,
  },
  {
    key: 'DEFECT',
    name: 'Дефект',
  },
  {
    key: 'GENERAL_VIEW',
    name: 'Общий вид',
  },
]

const selectedTypes = ref<PhotoDocTypeOption[]>([])
const selectedStructElems = ref<LookupOption[]>([])
const selectedSpots = ref<LookupOption[]>([])
const selectedMaterials = ref<LookupOption[]>([])

const notNull = (items: any, keyField: string) =>
  _.chain(items.value).map(keyField).filter().value()

const notNullLookup = (items: any) => notNull(items, 'id')

const hasNull = (items: any, keyField: string) =>
  _.chain(items.value).map(keyField).some(_.isNull).value()

const hasNullLookup = (items: any) => hasNull(items, 'id')

const filtersChange = async () => {
  const search = {
    type: notNull(selectedTypes, 'key') as string[],
    spotId: notNullLookup(selectedSpots) as number[],
    structElemId: notNullLookup(selectedStructElems) as number[],
    materialId: notNullLookup(selectedMaterials) as number[],
    typeIsNull: hasNull(selectedTypes, 'key'),
    spotIdIsNull: hasNullLookup(selectedSpots),
    structElemIdIsNull: hasNullLookup(selectedStructElems),
    materialIdIsNull: hasNullLookup(selectedMaterials),
  }

  await selectedInspectionService.requestPhotoDocs(search)
}

onMounted(async () => {
  await spotStore.requestLookup()
})
</script>
