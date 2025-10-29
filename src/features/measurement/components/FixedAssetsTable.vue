<template>
  <div v-if="getFixedAssets(roomId, roomNum).length > 0">
    <div class="text-subtitle1 q-mb-sm">
      Конструктив
    </div>
    <q-table :rows="getFixedAssets(roomId, roomNum)" :columns="columns" :row-key="row => row.id" class="fixed-table"
      wrap-cells flat bordered :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination>
      <template #body-cell-name="props">
        <q-td>
          <SectionCellEditor :api-fn="updateFixedAssetMeasurement" :value="props.row.name as string" field="name"
            type="string" :row="props.row" />
        </q-td>
      </template>
      <template #body-cell-material="props">
          <q-td :props="props">
            {{ props.row.material?.name }}
            <SectionMaterialCellEditor :api-fn="updateFixedAssetMeasurement" field="materialId" :row="props.row"
              :value="props.row.material?.id as string" />
          </q-td>
      </template>
      <template #body-cell-width="props">
        <q-td>
          <SectionCellEditor :api-fn="updateFixedAssetMeasurement" :value="props.row.width || 0" field="width"
            :row="props.row" />
        </q-td>
      </template>
      <template #body-cell-length="props">
        <q-td>
          <SectionCellEditor :api-fn="updateFixedAssetMeasurement" :value="props.row.length || 0" field="length"
            :row="props.row" />
        </q-td>
      </template>
      <template #body-cell-height="props">
        <q-td>
          <SectionCellEditor :api-fn="updateFixedAssetMeasurement" :value="props.row.height || 0" field="height"
            :row="props.row" />
        </q-td>
      </template>
      <template v-slot:header-cell-actions>
        <q-th style="width: 100px;border-left: 0"></q-th>
      </template>
      <template #body-cell-actions="props">
        <q-td style="border-left: 0" class="text-right">
          <q-btn class="action-btn" v-if="props.row.urls.length" size="sm" flat round color="primary" icon="o_image"
            @click.stop="openPhotos(props.row.urls)">
            <q-tooltip anchor="top middle" self="bottom middle">
              Посмотреть фотографии
            </q-tooltip>
          </q-btn>
          <q-btn class="action-btn" size="sm" flat round color="negative" icon="delete"
            @click.stop="confirmDelete(props.row)">
            <q-tooltip anchor="top middle" self="bottom middle">
              Удалить
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <!-- Карусель -->
    <q-dialog v-model="showLightbox" full-width full-height maximized backdrop-filter="brightness(40%)">
      <q-card class="lightbox-container" style="background: transparent; box-shadow: none">
        <!-- Для нескольких изображений -->
        <div v-if="photos.length > 1" class="carousel-wrapper">
          <q-carousel v-model="slide" swipeable animated arrows navigation infinite2 transition-prev="slide-right"
            transition-next="slide-left" class="full-height-carousel" style="background-color: transparent;">
            <q-carousel-slide v-for="(url, index) in photos" :key="index" :name="index" class="full-height-slide">
              <q-img :src="url" fit="contain" class="full-height-img" />
            </q-carousel-slide>
          </q-carousel>
        </div>
        <!-- Для одного изображения -->
        <q-img v-else :src="photos[0]" fit="contain" class="single-img" />
        <q-btn icon="close" flat round dense v-close-popup class="dialog-img-close-btn bg-primary text-white" />
      </q-card>
    </q-dialog>
  </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMeasurementStore } from '../stores/measurement-store';
import { FixedAssetMeasurement } from '../stores/types';
import { ref } from 'vue';
import { useMeasurementService } from '../composables/measurement';
import { useQuasar } from 'quasar';
import SectionCellEditor from './SectionCellEditor.vue'
import SectionMaterialCellEditor from './SectionMaterialCellEditor.vue'

const { getFixedAssets } = storeToRefs(useMeasurementStore())
const { deletefixedAssetMeasurement, updateFixedAssetMeasurement } = useMeasurementService()

const $q = useQuasar();

const showLightbox = ref(false);
const photos = ref<string[]>([]);
const slide = ref(0);

const { roomId, roomNum, canEdit = true } = defineProps<{
  roomId: number,
  roomNum?: number | undefined,
  canEdit?: boolean
}>()

const openPhotos = (urls: string[]) => {
  if (urls.length > 0) {
    showLightbox.value = true;
    photos.value = urls;
  }
}
const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить объект?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deletefixedAssetMeasurement(row.id);
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
};

const columns = [
  {
    name: 'name',
    label: 'Наименование',
    align: 'left' as const,
    field: 'name',
    sortable: true
  },
  {
    name: 'material',
    label: 'Материал',
    align: 'left' as const,
    field: 'materialId',
    sortable: true
  },
  {
    name: 'width',
    label: 'Ширина',
    align: 'left' as const,
    field: 'width',
    sortable: true
  },
  {
    name: 'length',
    label: 'Длина',
    align: 'left' as const,
    field: 'length',
    sortable: true
  },
  {
    name: 'height',
    label: 'Высота',
    align: 'left' as const,
    field: 'height',
    sortable: true
  },
  {
    name: 'area',
    label: 'Площадь',
    align: 'left' as const,
    field: 'area',
    sortable: true
  },
  {
    name: 'perimeter',
    label: 'Периметр',
    align: 'left' as const,
    field: 'perimeter',
    sortable: true
  },
  {
    name: 'actions',
    label: '',
    align: 'right' as const,
    field: 'actions'
  },
]
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
</style>
