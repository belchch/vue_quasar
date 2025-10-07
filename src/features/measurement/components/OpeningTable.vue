<template>
  <div v-if="rows.length > 0">
    <div class="text-subtitle1 q-mb-sm">Проемы</div>
    <q-table :rows="rows" :columns="columns" :row-key="row => row.id" wrap-cells flat bordered
      :pagination="{ rowsPerPage: 0 }" separator="cell" hide-pagination class="opening-table">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="opening" :props="props">
            {{ props.row.opening.name }}
            <cell-editor-section-opening :value="props.row.opening.id" :row="props.row" />
            <q-icon name="edit" class="edit-icon" />
          </q-td>
          <q-td key="material" :props="props">
            {{ props.row.material?.name }}
            <cell-editor-section-material :value="props.row.material.id" block="opening" :row="props.row" />
            <q-icon name="edit" class="edit-icon" />
          </q-td>
          <q-td key="width">
            <cell-editor-section field="width" :row="props.row" block="opening" :value="props.row.width" />
            <q-icon name="edit" class="edit-icon" />
          </q-td>
          <q-td key="height" :props="props">
            <cell-editor-section field="height" :row="props.row" block="opening" :value="props.row.height" />
            <q-icon name="edit" class="edit-icon" />
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area }}
          </q-td>
          <q-td key="hasTrims" :props="props">
            {{ props.row.hasTrims ? 'Да' : 'Нет' }}
            <cell-editor-section-bool field="hasTrims" :row="props.row" :value="props.row.hasTrims" />
            <q-icon name="edit" class="edit-icon" />
          </q-td>
          <q-td key="trimWidth" :props="props">
            <cell-editor-section field="trimWidth" :row="props.row" block="opening" :value="props.row.trimWidth" />
            <q-icon name="edit" class="edit-icon" />
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
import { OpeningMeasurement } from '../stores/types';
import { computed, ref } from 'vue';
import { useMeasurementService } from '../composables/measurement';
import LightBoxImage from 'src/components/LightBoxImage.vue'
import { useQuasar } from 'quasar';
import CellEditorSectionMaterial from './CellEditorSectionMaterial.vue'
import CellEditorSection from './CellEditorSection.vue'
import CellEditorSectionOpening from './CellEditorSectionOpening.vue'
import CellEditorSectionBool from './CellEditorSectionBool.vue'

const $q = useQuasar();
const { openingMeasurements } = storeToRefs(useMeasurementStore())
const { deleteOpeningMeasurement } = useMeasurementService()

const photos = ref<string[]>([])
const showLightbox = ref(false);
const openPhotos = (urls: string[]) => {
  photos.value = urls;
  showLightbox.value = true;
}

const { roomId, roomNum, canEdit=true} = defineProps<{
    roomId: number,
    roomNum?: number | undefined | null,
    canEdit?: boolean
}>()

const rows = computed(() => {
    return openingMeasurements.value?.filter(item => {
      if(item.room.id == roomId){
        if(roomNum) return _isRightLocation(item);
        else return ( item.roomNum == null || item.roomNum == 1);
      }
    }) || []
})
const _isRightLocation = (oItem:OpeningMeasurement)=>{
  if(oItem.roomNum == roomNum) return true;
  if(roomNum == 1) return oItem.roomNum == null;
}
const deleteRow = (id: number) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить проем?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteOpeningMeasurement(id)
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
}

const columns = [
    {
        name: 'opening',
        field: (row: OpeningMeasurement) => row.opening.name,
        label: 'Проем',
        align: 'left' as const,
    },
    {
        name: 'material',
        field: (row: OpeningMeasurement) => row.material?.name,
        label: 'Материал',
        align: 'left' as const,
    },
    {
        name: 'width',
        field: (row: OpeningMeasurement) => row.width,
        label: 'Ширина',
        align: 'left' as const,
    },
    {
        name: 'height',
        field: (row: OpeningMeasurement) => row.height,
        label: 'Высота',
        align: 'left' as const,
    },
    {
        name: 'area',
        field: (row: OpeningMeasurement) => row.area,
        label: 'Площадь',
        align: 'left' as const,
    },
    {
      name: 'hasTrims',
      field: (row: OpeningMeasurement) => row.hasTrims,
      label: 'Отделка',
      align: 'left' as const,
    },
    {
      name: 'trimWidth',
      field: (row: OpeningMeasurement) => row.trimWidth,
      label: 'Ширина отделки',
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
<style scoped>
.opening-table td .edit-icon {
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  top: 2px;
  right: 2px;
}

.opening-table td:hover .edit-icon {
  opacity: .5;
}
</style>
