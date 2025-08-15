<template>
  <div>
    <q-table
      :pagination="{ rowsPerPage: 0 }"
      hide-pagination
      flat
      bordered
      :rows="items"
      :columns="columns"
      row-key="id">
      <template v-slot:header-cell-actions>
        <q-th style="width: 82px;border-left: 0"></q-th>
      </template>
      <template #body-cell-actions="props">
        <q-td style="border-left: 0" class="text-right">
          <q-btn class="action-btn" v-if="props.row.urls.length" size="sm" flat round color="primary" icon="o_image"
            @click.stop="openPhotos(props.row.urls)">
            <q-tooltip anchor="top middle" self="bottom middle">
              Посмотреть фотографии
            </q-tooltip>
          </q-btn>
          <q-btn class="action-btn" size="sm" flat round color="primary" icon="edit"
          @click="onEdit(props.row)">
            <q-tooltip anchor="top middle" self="bottom middle">
              Редактировать
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
    <!-- <movable-edit-dialog :movable="props.row" /> -->
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
import {ref} from 'vue';
import { Movable } from 'src/features/measurement/stores/types'
import { useQuasar } from 'quasar';
import { useMovableSrvice } from '../../composables/movable';
import MovableEditDialog from './MovableEditDialog.vue'
const { deleteMovable } = useMovableSrvice();
const $q = useQuasar();
const { items } = defineProps<{
  items: Movable[] | [],
}>();

const editItem = ref(null);

const showLightbox = ref(false);
const photos = ref<string[]>([]);
const slide = ref(0);

const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить объект?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteMovable(row.id);
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
};

const onEdit = (row: Movable) => {
  $q.dialog({
    component: MovableEditDialog,
    componentProps: {
      movable: row,
    },
  });
}

const openPhotos = (urls: string[]) => {
  if (urls.length > 0) {
    showLightbox.value = true;
    photos.value = urls;
  }
}

const columns = [
  {
    name: 'name',
    label: 'Наименование',
    align: 'left' as const,
    field: 'name',
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
  { name: 'actions',
    label: '',
    align: 'right' as const,
    field: 'actions'
  },
]
</script>

<style scoped>

</style>
