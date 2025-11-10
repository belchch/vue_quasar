<template>
  <div v-if="rows.length > 0">
    <div class="text-subtitle1 q-ma-sm">Проемы</div>
    <template v-for="item in rows" :key="item.id">
      <q-expansion-item expand-separator :label="item.opening.name">
        <q-markup-table flat>
          <tbody>
            <tr>
              <td class="cell-label">Проем</td>
              <td class="cell-value">
                {{ item.opening.name }}
                <SectionOpeningCellEditor
                  :api-fn="updateOpeningMeasurement"
                  :value="item.opening?.id"
                  :row="item"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Материал</td>
              <td class="cell-value">
                {{ item.material?.name }}
                <SectionMaterialCellEditor
                  :api-fn="updateOpeningMeasurement"
                  :value="item.material?.id"
                  :row="item"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Ширина</td>
              <td class="cell-value">
                <SectionCellEditor
                  :api-fn="updateOpeningMeasurement"
                  field="width"
                  :row="item"
                  :value="item.width"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Высота</td>
              <td class="cell-value">
                <SectionCellEditor
                  :api-fn="updateOpeningMeasurement"
                  field="height"
                  :row="item"
                  :value="item.height"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Площадь</td>
              <td class="cell-value">{{ item.area }}</td>
            </tr>
            <tr>
              <td class="cell-label">Отделка</td>
              <td class="cell-value">
                {{ item.hasTrims ? 'Да' : 'Нет' }}
                <SectionBoolCellEditor
                  :api-fn="updateOpeningMeasurement"
                  field="hasTrims"
                  :row="item"
                  :value="item.hasTrims"
                />
              </td>
            </tr>
            <tr>
              <td class="cell-label">Ширина отделки</td>
              <td class="cell-value">
                <SectionCellEditor
                  :api-fn="updateOpeningMeasurement"
                  field="trimWidth"
                  :row="item"
                  :value="item.trimWidth"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <q-btn
                  class="action-btn"
                  v-if="item.photoUrls.length"
                  size="sm"
                  flat
                  round
                  color="primary"
                  icon="o_image"
                  @click.stop="openPhotos(item.photoUrls)"
                >
                  <q-tooltip anchor="top middle" self="bottom middle">
                    Посмотреть фотографии
                  </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="canEdit"
                  icon="delete"
                  @click="() => deleteRow(item.id)"
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
import { OpeningMeasurement } from '../../stores/types'
import { computed, ref } from 'vue'
import { useMeasurementService } from '../../composables/measurement'
import LightBoxImage from 'src/components/LightBoxImage.vue'
import { useQuasar } from 'quasar'
import SectionMaterialCellEditor from '../SectionMaterialCellEditor.vue'
import SectionCellEditor from '../SectionCellEditor.vue'
import SectionOpeningCellEditor from '../SectionOpeningCellEditor.vue'
import SectionBoolCellEditor from '../SectionBoolCellEditor.vue'

const $q = useQuasar()
const { openingMeasurements } = storeToRefs(useMeasurementStore())
const { deleteOpeningMeasurement, updateOpeningMeasurement } = useMeasurementService()

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
  roomNum?: number | undefined | null
  canEdit?: boolean
}>()

const rows = computed(() => {
  return (
    openingMeasurements.value?.filter((item) => {
      if (item.room.id == roomId) {
        if (roomNum) return _isRightLocation(item)
        else return item.roomNum == null || item.roomNum == 1
      }
    }) || []
  )
})
const _isRightLocation = (oItem: OpeningMeasurement) => {
  if (oItem.roomNum == roomNum) return true
  if (roomNum == 1) return oItem.roomNum == null
}
const deleteRow = (id: number) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить проем?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteOpeningMeasurement(id)
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
