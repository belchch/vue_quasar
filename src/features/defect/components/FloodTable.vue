<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="rowKey"
    selection="single"
    wrap-cells
    flat bordered
    :pagination="{rowsPerPage: 20}"
  >
    <template v-slot:top-left>
      <q-toggle v-model="showMovable" label="Движимое имущество" color="secondary"/>
      <q-toggle v-model="showFinishing" label="Отделка" color="secondary"/>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="xs"
            flat
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'"
            sor
          />
        </q-td>        
        <q-td key="type" :props="props">
          {{ defectTypeDescription(props.row.type) }}
        </q-td>
        <q-td key="location" :props="props">
          {{ props.row.spot?.name }}
        </q-td>        
        <q-td key="structElem">
          {{ props.row.structElem }}
        </q-td>
        <q-td key="defect" :props="props">
          {{ props.row.defect }}
        </q-td>        
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">
            <DefectTablePhotos :urls="props.row.photos" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script setup lang="ts">
import DefectTablePhotos from 'src/features/defect/components/DefectTablePhotos.vue'
import { PhotoDoc, PhotoDocType } from 'src/features/inspection/store/types'
import { Spot } from 'src/features/lookup/spot/stores/types'
import { StructElem } from 'src/features/lookup/struct-elem/stores/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  defects: PhotoDoc[]
}>()

const showMovable = ref(true)
const showFinishing = ref(true)

const defectType = (photoDocType: PhotoDocType): DefectType => {
  switch(photoDocType) {
    case 'MOVABLE': return 'MOVABLE'
    case 'FINISHING': return 'FINISHING'
    default: throw Error("Invalid PhotoDocType")
  }
}

const defectTypeDescription = (defectType: DefectType): string => {
  switch(defectType) {
    case 'MOVABLE': return 'Движимое имущество'
    case 'FINISHING': return 'Отделка'
    default: throw Error("Invalid PhotoDocType")
  }
}

const defectDescription = (photoDoc: PhotoDoc) => {
  switch(photoDoc.type) {
    case 'MOVABLE': return photoDoc.movableInfo?.floodPropertyDamage?.name
    case 'FINISHING': return photoDoc.finishingInfo?.floodFinishingDamage?.name
    default: throw Error("Invalid PhotoDocType")
  }
}

const structElemDescription = (photoDoc: PhotoDoc): string | undefined => {
  switch(photoDoc.type) {
    case 'MOVABLE': {
      const movable = photoDoc.movableInfo?.movable
      return movable ? `${movable?.name}  (${movable?.width} x ${movable?.length} x ${movable?.height})` : ''
    }
    case 'FINISHING': return photoDoc.finishingInfo?.structElem?.name
    default: throw Error("Invalid PhotoDocType")
  }
}

const rows = computed<TableRow[]>(() => {
  return props.defects.map((defect) => ({
    rowKey: defect.id!!,
    spot: defect.spot,
    structElem: structElemDescription(defect),
    type: defectType(defect.type!!),
    defect: defectDescription(defect),    
    photos: defect.urls,
  }))
      .filter(item => showMovable.value || item.type != 'MOVABLE')
      .filter(item => showFinishing.value || item.type != 'FINISHING')
})

type DefectType = 'MOVABLE' | 'FINISHING'

const columns = [
  {
    name: 'type',
    field: (row: TableRow) => row.type,
    label: 'Тип',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'location',
    field: (row: TableRow) => row.spot?.name,
    label: 'Локация',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'structElem',
    field: (row: TableRow) => row.structElem,
    label: 'Поверхность',
    sortable: true,
    align: 'left' as const,
  },
  { name: 'defect', field: (row: TableRow) => row.defect, label: 'Недостаток', sortable: true, align: 'left' as const },
]

type TableRow = {
  rowKey: number
  spot: Spot | undefined
  defect: string | undefined,
  type: DefectType
  structElem: string | undefined,
  photos: string[] | undefined
}
</script>
