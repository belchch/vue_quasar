<template>
  <div>
    <q-btn
      @click="modal = true"
      :size="'sm'"
      outline
      label="Сводная таблица"
      color="primary"
    />
    <q-dialog v-model="modal" full-width>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Сводная таблица</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-table
            :pagination="{ rowsPerPage: 0 }"
            hide-pagination
            flat
            bordered
            :rows="rooms"
            :columns="columns"
            separator="cell"
            row-key="name"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const modal = ref(false);
const rooms = ref<any>([]);
const columns = [
  { name: 'comment', label: 'Помещение', field: 'comment', sortable: true },
  { name: 'width', label: 'Ширина', field: 'width', sortable: true },
  { name: 'length', label: 'Длина', field: 'length', sortable: true },
  { name: 'height', label: 'Высота потолков', field: 'height', sortable: true },
  { name: 'area', label: 'Площадь без учета проемов', field: 'area', sortable: true },
  { name: 'perimeter', label: 'Периметр без учета проемов', field: 'perimeter', sortable: true },
  { name: 'area_door', label: 'Площадь дверных проемов', field: 'area_door', sortable: true },
  { name: 'area_window', label: 'Площадь оконных проемов', field: 'area_window', sortable: true }
]

</script>

<style scoped>

</style>
