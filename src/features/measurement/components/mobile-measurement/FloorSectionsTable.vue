<template>
  <div v-if="getFloorCeilSections(roomId, roomNum).length > 0">
    <div class="text-subtitle1 q-ma-sm">Секции пола</div>
    <template v-for="item in getFloorCeilSections(roomId, roomNum)" :key="item?.id">
      <q-expansion-item expand-separator :label="item?.material?.name">
        <q-markup-table flat>
          <tbody>
            <tr>
              <td class="cell-label">Материал</td>
              <td class="cell-value">
                {{ item?.material?.name }}
                <SectionMaterialCellEditor
                  :api-fn="updateFloorSectionMeasurement"
                  field="materialId"
                  :row="item"
                  :value="item?.material?.id"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Ширина</td>
              <td class="cell-value">
                <SectionCellEditor
                  :api-fn="updateFloorSectionMeasurement"
                  :value="item?.width || 0"
                  field="width"
                  :row="item!"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Длина</td>
              <td class="cell-value">
                <SectionCellEditor
                  :api-fn="updateFloorSectionMeasurement"
                  :value="item?.length || 0"
                  field="length"
                  :row="item!"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Площадь</td>
              <td class="cell-value">
                {{ item?.area }}
              </td>
            </tr>
            <tr>
              <td class="cell-label">Периметр</td>
              <td class="cell-value">
                {{ item.perimeter }}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <q-btn
                  class="action-btn"
                  v-if="item?.photoUrls?.length"
                  size="sm"
                  flat
                  round
                  color="primary"
                  icon="o_image"
                  @click.stop="openPhotos(item?.photoUrls)"
                >
                  <q-tooltip anchor="top middle" self="bottom middle">
                    Посмотреть фотографии
                  </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="canEdit"
                  icon="delete"
                  @click="() => deleteRow(item?.id!)"
                  size="sm"
                  flat
                  round
                  color="negative"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-expansion-item>
    </template>

    <light-box-image :images="photos" v-model="showLightbox" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMeasurementStore } from '../../stores/measurement-store'
import { FloorSectionMeasurement } from '../../stores/types'
import { ref, onMounted } from 'vue'
import { useMeasurementService } from '../../composables/measurement'
import LightBoxImage from 'src/components/LightBoxImage.vue'
import { useQuasar } from 'quasar'
import SectionCellEditor from '../SectionCellEditor.vue'
import SectionMaterialCellEditor from '../SectionMaterialCellEditor.vue'

const $q = useQuasar()
const { getFloorCeilSections } = storeToRefs(useMeasurementStore())
const { deleteFloorSectionMeasurement, updateFloorSectionMeasurement } = useMeasurementService()

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
    message: `Вы действительно хотите удалить секцию пола?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteFloorSectionMeasurement(id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}
</script>
<style scoped>
.cell-label {
  /* font-weight: bold; */
  background-color: rgba(0, 0, 0, 0.05);
}
.cell-value {
  /* background-color: #f2dede; */
}
.cell-value:empty::before {
  content: 'Отсутствует';
  color: #999;
  font-style: italic;
  display: contents;
}
</style>
