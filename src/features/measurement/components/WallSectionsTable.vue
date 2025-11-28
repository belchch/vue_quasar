<template>
  <div v-if="getWallCeilSections(roomId, roomNum).length > 0">
    <div class="text-subtitle1 q-mb-sm">Секции стены</div>
    <q-table
      :rows="getWallCeilSections(roomId, roomNum)"
      :columns="columns"
      :row-key="(row) => row.id"
      wrap-cells
      flat
      bordered
      :pagination="{ rowsPerPage: 0 }"
      separator="cell"
      hide-pagination
      class="wall-table"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="material" :props="props">
            <SectionMaterialCellEditor
              :api-fn="updateWallSectionMeasurement"
              :value="props.row.material?.id"
              :row="props.row"
              :materialName="props.row.material?.name"
            />
          </q-td>
          <q-td key="width">
            <SectionCellEditor
              :api-fn="updateWallSectionMeasurement"
              field="width"
              :row="props.row"
              :value="props.row.width"
            />
          </q-td>
          <q-td key="height" :props="props">
            <SectionCellEditor
              :api-fn="updateWallSectionMeasurement"
              field="height"
              :row="props.row"
              :value="props.row.height"
            />
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area }}
          </q-td>
          <q-td key="perimeter" :props="props">
            {{ props.row.perimeter }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              class="action-btn"
              v-if="props.row.photoUrls.length"
              size="sm"
              flat
              round
              color="primary"
              icon="o_image"
              @click.stop="openPhotos(props.row.photoUrls)"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                Посмотреть фотографии
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="canEdit"
              icon="delete"
              @click="() => deleteRow(props.row.id)"
              size="sm"
              flat
              round
              color="negative"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <light-box-image :images="photos" v-model="showLightbox" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMeasurementStore } from '../stores/measurement-store'
import { WallSectionMeasurement } from '../stores/types'
import { ref, onMounted } from 'vue'
import { useMeasurementService } from '../composables/measurement'
import LightBoxImage from 'src/components/LightBoxImage.vue'
import { useQuasar } from 'quasar'
import SectionCellEditor from './SectionCellEditor.vue'
import SectionMaterialCellEditor from './SectionMaterialCellEditor.vue'

const $q = useQuasar()
const { getWallCeilSections } = storeToRefs(useMeasurementStore())
const { deleteWallSectionMeasurement, updateWallSectionMeasurement } = useMeasurementService()

const photos = ref<string[]>([])
const showLightbox = ref(false)
const openPhotos = (urls: string[]) => {
  photos.value = urls
  showLightbox.value = true
}

const {
  roomId,
  roomNum,
  canEdit = true,
} = defineProps<{
  roomId: number
  roomNum?: number | undefined
  canEdit?: boolean
}>()

const deleteRow = (id: number) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить секцию стены?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteWallSectionMeasurement(id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}

const columns = [
  {
    name: 'material',
    field: (row: WallSectionMeasurement) => row.material?.name,
    label: 'Материал',
    align: 'left' as const,
  },
  {
    name: 'width',
    field: (row: WallSectionMeasurement) => row.width,
    label: 'Ширина',
    align: 'left' as const,
  },
  {
    name: 'height',
    field: (row: WallSectionMeasurement) => row.height,
    label: 'Высота',
    align: 'left' as const,
  },
  {
    name: 'area',
    field: (row: WallSectionMeasurement) => row.area,
    label: 'Площадь',
    align: 'left' as const,
  },
  {
    name: 'perimeter',
    field: (row: WallSectionMeasurement) => row.perimeter,
    label: 'Периметр',
    align: 'left' as const,
  },
  {
    name: 'actions',
    field: '',
    label: '',
    align: 'right' as const,
  },
]
</script>
