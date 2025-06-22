<template>
  <PhotoDocAttributeFilter :options="typeOptions" option-value="key" option-label="name" label="Тип"
    v-model="selectedTypes" @update:model-value="filtersChange" />

  <PhotoDocAttributeFilter :options="spotOptions" option-valu="id" option-label="name" label="Локация"
    v-model="selectedSpots" @update:model-value="filtersChange" />

  <PhotoDocAttributeFilter :options="structElemOptions" option-valu="id" option-label="name" label="Поверхность"
    v-model="selectedStructElems" @update:model-value="filtersChange" />

  <PhotoDocAttributeFilter :options="materialOptions" option-valu="id" option-label="name" label="Материал"
    v-model="selectedMaterials" @update:model-value="filtersChange" />
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
import { storeToRefs } from 'pinia'
import { useInspectionSpotStore } from '../../store/inspection-spot-store'
import { buildInspectionSpotOptions } from '../../composables/inspection-spot'

const structElemStore = useStructElemStore()
const materialStore = useMaterialStore()
const selectedInspectionService = useSelectedInspection()
const { inspectionSpots } = storeToRefs(useInspectionSpotStore())

type LookupOption = {
  id?: number | string | null
  name: string
}

const noValueText = 'Нет значения'

const plusNull = (items: LookupOption[]) => {
  return [{ id: null, name: noValueText }, ...items]
}

const spotOptions = computed(() => plusNull(buildInspectionSpotOptions(inspectionSpots.value!)))
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
  console.log('selectedSpots', selectedSpots.value)

  const search = {
    type: notNull(selectedTypes, 'key') as string[],
    spot: selectedSpots.value.filter(item => item.id).map((item: any) => ({
      spotId: item.spot.id as number,
      spotNum: item.spotNum as number | undefined
    })),
    structElemId: notNullLookup(selectedStructElems) as number[],
    materialId: notNullLookup(selectedMaterials) as number[],
    typeIsNull: hasNull(selectedTypes, 'key'),
    spotIdIsNull: hasNullLookup(selectedSpots),
    structElemIdIsNull: hasNullLookup(selectedStructElems),
    materialIdIsNull: hasNullLookup(selectedMaterials),
  }

  console.log('search', search)

  await selectedInspectionService.requestPhotoDocs(search)
}

</script>
