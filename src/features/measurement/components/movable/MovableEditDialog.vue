<template>
  <q-dialog v-model="openModal" @show="onShow">
    <q-card style="width: 100%;max-width: 500px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Редактирование</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-pt-none">
          <div>Наименование</div>
          <q-input outlined dense label="Наименование" v-model.number="formObject.name" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Высота</div>
          <q-input outlined dense label="Высота" v-model.number="formObject.height" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Ширина</div>
          <q-input label="Ширина" lazy-rules outlined dense
            v-model.number="formObject.width" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Длина</div>
          <q-input outlined dense label="Длина" v-model.number="formObject.length" />
        </q-card-section>
      </q-form>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" :loading="saving" color="primary" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMovableSrvice } from '../../composables/movable';
import { MovableUpdateRequest } from "../../api/types";
import { Movable } from "../../stores/types";

const openModal = defineModel<boolean>({ default: false });
const { movable } = defineProps<{
  movable: Movable,
}>();
const saving = ref(false);
const formObject = ref<{ name:string, height: number | undefined, length: number | undefined, width: number | undefined}>({
  name: "",
  height: undefined,
  length: 0,
  width: undefined
})

const { updateMovable } = useMovableSrvice()

const onSubmit = async () => {
  const request: MovableUpdateRequest = {
    height: formObject.value.height!,
    length: formObject.value.length!,
    width: formObject.value.width!,
    name: formObject.value.name,
  }
  try{
    saving.value = true;
    await updateMovable(movable.id, request);
  }catch(e){
    console.log(e);
  }finally{
    saving.value = false;
    openModal.value = false;
  }

}
const onShow = () => {
  formObject.value.height = movable.height;
  formObject.value.length = movable.length;
  formObject.value.width = movable.width;
  formObject.value.name = movable.name;
}
</script>

<style scoped>

</style>
