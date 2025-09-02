<template>
  <div v-show="false">
    <q-dialog v-model="openDialog">
      <q-card style="width: 100%;max-width: 500px;">
        <q-card-section class="row items-center">
          <div class="text-h6">{{room.name}}. {{ labelCaption }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Наименование</div>
          <q-input outlined dense v-model="objectForm.name" label="Наименование" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Материал</div>
          <q-select use-input dense outlined v-model="objectForm.material" lazy-rules :options="materialStore.items"
            label="Материал" option-label="name" option-value="id" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Длина</div>
          <q-input outlined dense v-model="objectForm.length" label="Длина" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Высота</div>
          <q-input outlined dense v-model="objectForm.height" label="Высота" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-sm">Ширина</div>
          <q-input outlined dense v-model="objectForm.width" label="Ширина" />
        </q-card-section>
        <q-card-section class="q-pt-none text-blue">
          <div class="text-subtitle1 q-mb-sm">Площадь</div>
          <q-input outlined dense v-model="objectForm.area" label="Площадь" />
        </q-card-section>
        <q-card-section class="q-pt-none text-blue">
          <div class="text-subtitle1 q-mb-sm">Периметр</div>
          <q-input outlined dense v-model="objectForm.perimeter" label="Периметр" />
        </q-card-section>
        <q-card-section class="q-pt-none text-blue">
          <div class="text-subtitle1 q-mb-sm">Периметр без проемов</div>
          <q-input outlined dense v-model="objectForm.perimeterExcludingOpenings" label="Периметр без проемов" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Отмена" color="primary" flat class="q-ml-sm" />
          <q-btn label="Добавить" color="primary" v-close-popup @click="onConfirmClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn @click="onOpenClick" icon="add" :label="btnText" color="secondary" size="sm" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { Spot } from 'src/features/lookup/spot/stores/types';
import { Material } from 'src/features/lookup/material/stores/types';
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store';

type FormData = {
  name: string,
  material?: Material,
  height: number,
  width: number,
  length: number,
  area: number,
  perimeter: number
  perimeterExcludingOpenings: number

}

const materialStore = useMaterialStore()

const openDialog = ref(false);
const objectForm = ref<FormData>({
  name: '',
  height: 0,
  width: 0,
  length: 0,
  area: 0,
  perimeter: 0,
  perimeterExcludingOpenings: 0
});


const { btnText = 'Добавить', room, sectionType} = defineProps<{
  btnText?: string,
  room: Spot,
  sectionType: 'floor_section' | 'ceil_section' | 'wall_section',
}>()

const labelCaption = computed(() => {
  switch (sectionType) {
    case 'floor_section':
      return 'Новая секция пола';
    case 'ceil_section':
      return 'Новая секция потолка';
    case 'wall_section':
      return 'Новая секция стены';
    default:
      return 'Новая секция';
  }
});

// Методы
const onOpenClick = () => {
  openDialog.value = true;
}
const onConfirmClick = () => {
  console.log('onConfirm');
};

</script>

<style scoped></style>
