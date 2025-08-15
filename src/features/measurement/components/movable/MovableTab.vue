<template>
  <div>
    <movable-dialog v-model="movableDialog" />
    <div class="text-center" v-if="loading">
      <q-spinner color="primary" size="3em" :thickness="2" />
      <div class="q-mt-md">Загрузка...</div>
    </div>
    <q-btn v-if="!loading" outline color="primary" @click="openDialog">Добавить</q-btn>
    <div v-if="!loading && movables.length==0" class="text-center text-weight-light text-h5">
      Объекты отсутствуют
    </div>
    <movable-rooms v-if="movables.length" class="q-mt-md" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMovableSrvice } from '../../composables/movable';
import { useMovableStore } from '../../stores/movable-store';
import { ref, computed, onMounted } from 'vue'
import MovableDialog from './MovableDialog.vue'
import MovableRooms from './MovableRooms.vue'

const { requestMovables } = useMovableSrvice();
const { movables, groupedByRoom } = storeToRefs(useMovableStore());

const loading = ref(true);
const movableDialog = ref(false)


onMounted(async () => {
  loading.value = true;
  await requestMovables();
  loading.value = false;
})

const openDialog = () => {
  movableDialog.value = true;
  // movableDialog.value = {
  //   open: true,
  //   title: 'Добавить объект',
  //   submit: () => {
  //     movableDialog.value.open = false;
  //   }
  // };
}

</script>

<style scoped>

</style>
