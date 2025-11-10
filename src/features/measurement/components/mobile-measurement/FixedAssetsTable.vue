<template>
  <div v-if="getFixedAssets(roomId, roomNum, fixedType).length > 0">
    <div class="text-subtitle1 q-ma-sm">{{ title }}</div>
    <template v-for="item in getFixedAssets(roomId, roomNum, fixedType)" :key="item?.id">
      <q-expansion-item expand-separator :label="item?.name">
        <q-markup-table flat>
          <tr>
            <td class="cell-label">Наименование</td>
            <td class="cell-value">
              <SectionCellEditor
                :api-fn="updateFixedAssetMeasurement"
                :value="item.name as string"
                field="name"
                type="string"
                :row="item"
              />
            </td>
          </tr>
          <tr>
            <td class="cell-label">Материал</td>
            <td class="cell-value">
              {{ item.material?.name }}
              <SectionMaterialCellEditor
                :api-fn="updateFixedAssetMeasurement"
                field="materialId"
                :row="item"
                :value="item.material?.id"
              />
            </td>
          </tr>
          <tr>
            <td class="cell-label">Ширина</td>
            <td class="cell-value">
              <SectionCellEditor
                :api-fn="updateFixedAssetMeasurement"
                :value="item.width || 0"
                field="width"
                :row="item"
              />
            </td>
          </tr>
          <tr>
            <td class="cell-label">Длина</td>
            <td class="cell-value">
              <SectionCellEditor
                :api-fn="updateFixedAssetMeasurement"
                :value="item.length || 0"
                field="length"
                :row="item"
              />
            </td>
          </tr>
          <tr>
            <td class="cell-label">Высота</td>
            <td class="cell-value">{{ item.height }}</td>
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
                v-if="item.urls.length"
                size="sm"
                flat
                round
                color="primary"
                icon="o_image"
                @click.stop="openPhotos(item.urls)"
              >
                <q-tooltip anchor="top middle" self="bottom middle">
                  Посмотреть фотографии
                </q-tooltip>
              </q-btn>
              <q-btn
                class="action-btn"
                size="sm"
                flat
                round
                color="negative"
                icon="delete"
                @click.stop="confirmDelete(item)"
              >
                <q-tooltip anchor="top middle" self="bottom middle"> Удалить </q-tooltip>
              </q-btn>
            </td>
          </tr>
        </q-markup-table>
      </q-expansion-item>
    </template>

    <!-- Карусель -->
    <q-dialog
      v-model="showLightbox"
      full-width
      full-height
      maximized
      backdrop-filter="brightness(40%)"
    >
      <q-card class="lightbox-container" style="background: transparent; box-shadow: none">
        <!-- Для нескольких изображений -->
        <div v-if="photos.length > 1" class="carousel-wrapper">
          <q-carousel
            v-model="slide"
            swipeable
            animated
            arrows
            navigation
            infinite2
            transition-prev="slide-right"
            transition-next="slide-left"
            class="full-height-carousel"
            style="background-color: transparent"
          >
            <q-carousel-slide
              v-for="(url, index) in photos"
              :key="index"
              :name="index"
              class="full-height-slide"
            >
              <q-img :src="url" fit="contain" class="full-height-img" />
            </q-carousel-slide>
          </q-carousel>
        </div>
        <!-- Для одного изображения -->
        <q-img v-else :src="photos[0]" fit="contain" class="single-img" />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          class="dialog-img-close-btn bg-primary text-white"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMeasurementStore } from '../../stores/measurement-store'
import { FixedAssetMeasurement, FixedType } from '../../stores/types'
import { ref } from 'vue'
import { useMeasurementService } from '../../composables/measurement'
import { useQuasar } from 'quasar'
import SectionCellEditor from '../SectionCellEditor.vue'
import SectionMaterialCellEditor from '../SectionMaterialCellEditor.vue'
import { name } from '@vue/eslint-config-prettier/skip-formatting'

const { getFixedAssets } = storeToRefs(useMeasurementStore())
const { deletefixedAssetMeasurement, updateFixedAssetMeasurement } = useMeasurementService()

const $q = useQuasar()

const showLightbox = ref(false)
const photos = ref<string[]>([])
const slide = ref(0)

const {
  roomId,
  roomNum,
  canEdit = true,
  fixedType,
  title,
} = defineProps<{
  fixedType: FixedType
  title: string
  roomId: number
  roomNum?: number | undefined
  canEdit?: boolean
}>()

const openPhotos = (urls: string[]) => {
  if (urls.length > 0) {
    showLightbox.value = true
    photos.value = urls
  }
}
const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить объект?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deletefixedAssetMeasurement(row.id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}
</script>
<style scoped>
.lightbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.full-height-carousel {
  height: 100vh;
  width: 100vw;
}

.full-height-slide {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-height-img {
  max-height: 100vh;
  max-width: 100vw;
  width: auto;
  height: auto;
}

.single-img {
  max-height: 90vh;
  max-width: 100vw;
}

.dialog-img-close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}
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
