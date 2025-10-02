<template>
  <div v-if="getRoomCeilSections(roomId, roomNum).length > 0">
    <div class="text-subtitle1 q-mb-sm">
      Секции потолка
    </div>
    <q-table :rows="getRoomCeilSections(roomId, roomNum)" :columns="columns" :row-key="row => row.id" wrap-cells flat
      bordered :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="material" :props="props">
            {{ props.row.material?.name }}
            <cell-editor-section-material :value="props.row.material.id" block="ceil_section" :row="props.row" />
          </q-td>
          <q-td key="width">
            <cell-editor-section field="width" block="ceil_section" :value="props.row.width" :row="props.row" />
          </q-td>
          <q-td key="length" :props="props">
            <cell-editor-section field="length" block="ceil_section" :value="props.row.length" :row="props.row" />
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
import { CeilSectionMeasurement } from '../stores/types';
import { ref, onMounted } from 'vue';
import { useMeasurementService } from '../composables/measurement';
import LightBoxImage from 'src/components/LightBoxImage.vue'
import { useQuasar } from 'quasar';
import CellEditorSection from './CellEditorSection.vue'
import CellEditorSectionMaterial from './CellEditorSectionMaterial.vue'

const $q = useQuasar();
const { getRoomCeilSections } = storeToRefs(useMeasurementStore())
const { deleteCeilSectionMeasurement } = useMeasurementService()

const { roomId, roomNum, canEdit=true} = defineProps<{
    roomId: number,
    roomNum?: number | undefined,
    canEdit?: boolean,
}>()

const deleteRow = (id: number) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить секцию потолка?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteCeilSectionMeasurement(id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
}

const photos = ref<string[]>([])
const showLightbox = ref(false);
const openPhotos = (urls: string[]) => {
  photos.value = urls;
  showLightbox.value = true;
}

const columns = [
    {
        name: 'material',
        field: (row: CeilSectionMeasurement) => row.material?.name,
        label: 'Материал',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: CeilSectionMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'length',
        field: (row: CeilSectionMeasurement) => row.length,
        label: 'Длина',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: CeilSectionMeasurement) => row.area,
        label: 'Площадь',
        align: 'left' as const,
    },
    {
      name: 'perimeter',
      field: (row: CeilSectionMeasurement) => row.perimeter,
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
