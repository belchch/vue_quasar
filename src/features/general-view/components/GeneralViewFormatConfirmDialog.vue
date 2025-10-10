<template>
  <q-dialog v-model="openModel">
    <q-card style="width: 600px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Формат отчета</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div>
          <div class="row justify-between">
            <div>
              <q-radio v-model="formatModel" val="SINGLE_SPOT_ROW" label="Одна локация на строку" />
              <div class="text-blue-grey text-caption">Для каждой локации возможно добавить до 2-х фотографий</div>
            </div>
            <ReportFormatVisualization format="SINGLE_SPOT_ROW" />
          </div>
          <div class="row justify-between q-mt-lg">
            <div>
              <q-radio v-model="formatModel" val="DOUBLE_SPOT_ROW" label="Две локации на строку" />
              <div class="text-blue-grey text-caption">Для каждой локации возможно добавить 1 фотографию</div>
            </div>
            <ReportFormatVisualization format="DOUBLE_SPOT_ROW" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-pa-lg">
        <q-btn label="Подтвердить" color="primary" @click="confirmModeSpotRow" />
        <q-btn label="Отмена" @click="openModel = false" color="primary" flat class="q-ml-sm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ReportFormat } from '../api/types';
import ReportFormatVisualization from './ReportFormatVisualization.vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const emits = defineEmits<{
    confirm: []
}>()

const formatModel = defineModel<ReportFormat>('format', { default: 'SINGLE_SPOT_ROW' })
const openModel = defineModel<boolean>('open', { default: false })

const confirmModeSpotRow = () => {
  if(formatModel.value === 'DOUBLE_SPOT_ROW') {
    $q.dialog({
      title: 'Предупреждение',
      message: `В отчете отразиться только одна фотография в каждой локации`,
      cancel: true,
    }).onOk(() => {
      emits('confirm')
    });
  } else {
    emits('confirm')
  }

};

</script>
