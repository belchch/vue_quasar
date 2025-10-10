<template>
  <div v-if="getFloorCeilSections(roomId, roomNum).length > 0">
    <div class="text-subtitle1 q-mb-sm">
      Секции пола
    </div>
    <q-table :rows="getFloorCeilSections(roomId, roomNum)" :columns="columns" :row-key="row => row.id" wrap-cells flat
      bordered :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination class="floor-table">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="material" :props="props">
            {{ props.row.material?.name }}
            <SectionMaterialCellEditor :api-fn="updateFloorSectionMeasurement" field="materialId" :row="props.row"
              :value="props.row.material?.id as string" />
          </q-td>
          <q-td key="width">
            <SectionCellEditor :api-fn="updateFloorSectionMeasurement" :value="props.row.width || 0" field="width"
              :row="props.row" />
          </q-td>
          <q-td key="length" :props="props">
            <SectionCellEditor :api-fn="updateFloorSectionMeasurement" :value="props.row.length || 0" field="length"
              :row="props.row" />
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area }}
          </q-td>
          <q-td key="perimeter" :props="props">
            {{ props.row.perimeter }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn class="action-btn" v-if="props.row.photoUrls.length" size="sm" flat round color="primary"
              icon="o_image" @click.stop="openPhotos(props.row.photoUrls)">
              <q-tooltip anchor="top middle" self="bottom middle">
                Посмотреть фотографии
              </q-tooltip>
            </q-btn>
            <q-btn v-if="canEdit" icon="delete" @click="() => deleteRow(props.row.id)" size="sm" flat round
              color="negative" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <light-box-image :images="photos" v-model="showLightbox" />
  </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMeasurementStore } from '../stores/measurement-store';
import { FloorSectionMeasurement } from '../stores/types';
import { ref, onMounted } from 'vue';
import { useMeasurementService } from '../composables/measurement';
import LightBoxImage from 'src/components/LightBoxImage.vue'
import { useQuasar } from 'quasar';
import SectionCellEditor from './SectionCellEditor.vue'
import SectionMaterialCellEditor from './SectionMaterialCellEditor.vue'

const $q = useQuasar();
const { getFloorCeilSections } = storeToRefs(useMeasurementStore())
const { deleteFloorSectionMeasurement, updateFloorSectionMeasurement } = useMeasurementService()

const photos = ref<string[]>([])
const showLightbox = ref(false);
const openPhotos = (urls: string[]) => {
  photos.value = urls;
  showLightbox.value = true;
}

const { roomId, roomNum, canEdit = true } = defineProps<{
  roomId: number,
  roomNum?: number | undefined,
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
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
}

const columns = [
  {
    name: 'material',
    field: (row: FloorSectionMeasurement) => row.material?.name,
    label: 'Материал',
    align: 'left' as const,
  },
  {
    name: 'width',
    field: (row: FloorSectionMeasurement) => row.width,
    label: 'Ширина',
    align: 'left' as const,
  },
  {
    name: 'length',
    field: (row: FloorSectionMeasurement) => row.length,
    label: 'Длина',
    align: 'left' as const,
  },
  {
    name: 'area',
    field: (row: FloorSectionMeasurement) => row.area,
    label: 'Площадь',
    align: 'left' as const,
  },
  {
    name: 'perimeter',
    field: (row: FloorSectionMeasurement) => row.perimeter,
    label: 'Периметр',
    align: 'left' as const,
  },
  {
    name: 'actions',
    field: '',
    label: '',
    align: 'right' as const
  }
]
</script>
