<template>
  <div v-if="getRoomCeilSections(roomId, roomNum).length > 0">
    <div class="text-subtitle1 q-ma-sm">Секции потолка</div>
    <template v-for="item in getRoomCeilSections(roomId, roomNum)" :key="item?.id">
      <q-expansion-item expand-separator :label="item?.material?.name">
        <q-markup-table flat>
          <tr>
            <td class="cell-label">Материал</td>
            <td class="cell-value">
              {{ item.material?.name }}
              <SectionMaterialCellEditor
                :api-fn="updateCeilSectionMeasurement"
                :value="item.material?.id"
                block="ceil_section"
                :row="item"
              />
            </td>
          </tr>
          <tr>
            <td class="cell-label">Ширина</td>
            <td class="cell-value">
              <SectionCellEditor
                :api-fn="updateCeilSectionMeasurement"
                field="width"
                block="ceil_section"
                :value="item.width"
                :row="item"
              />
            </td>
          </tr>
          <tr>
            <td class="cell-label">Длина</td>
            <td class="cell-value">
              <SectionCellEditor
                :api-fn="updateCeilSectionMeasurement"
                field="length"
                block="ceil_section"
                :value="item.length"
                :row="item"
              />
            </td>
          </tr>
          <tr>
            <td class="cell-label">Площадь</td>
            <td class="cell-value">{{ item.area }}</td>
          </tr>
          <tr>
            <td class="cell-label">Периметр</td>
            <td class="cell-value">{{ item.perimeter }}</td>
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
        </q-markup-table>
      </q-expansion-item>
    </template>

    <light-box-image :images="photos" v-model="showLightbox" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMeasurementStore } from '../../stores/measurement-store'
import { CeilSectionMeasurement } from '../../stores/types'
import { ref, onMounted } from 'vue'
import { useMeasurementService } from '../../composables/measurement'
import LightBoxImage from 'src/components/LightBoxImage.vue'
import { useQuasar } from 'quasar'
import SectionCellEditor from '../SectionCellEditor.vue'
import SectionMaterialCellEditor from '../SectionMaterialCellEditor.vue'

const $q = useQuasar()
const { getRoomCeilSections } = storeToRefs(useMeasurementStore())
const { deleteCeilSectionMeasurement, updateCeilSectionMeasurement } = useMeasurementService()

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
    message: `Вы действительно хотите удалить секцию потолка?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteCeilSectionMeasurement(id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}

const photos = ref<string[]>([])
const showLightbox = ref(false)
const openPhotos = (urls: string[]) => {
  photos.value = urls
  showLightbox.value = true
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
