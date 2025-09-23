<template>
  <div>
    <div class="text-blue-grey">Стена</div>
    <div class="text-h6">{{ selectedNode['label'] || '-' }}</div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Высота</div>
          <div class="text-body1">{{ selectedNode.rawData.height || '-' }}</div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Длина</div>
          <div class="text-body1">{{ selectedNode.rawData.length || '-' }}</div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Периметр</div>
          <div class="text-body1">{{ selectedNode.rawData.perimeter || '-' }}</div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Площадь</div>
          <div class="text-body1">{{ selectedNode.rawData.area || '-' }}</div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Произвольная форма</div>
          <div class="text-body1">{{ selectedNode.rawData.hasCustomShape?'Да':'Нет' }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <div class="text-h6">Фотографии</div>
      <div class="text-h6 text-weight-light" v-if="selectedNode.rawData.photos.length == 0">Фотографии
        отсутствуют</div>
      <q-list v-else bordered separator>
        <q-item v-for="photo in selectedNode.rawData.photos" :key="photo.fileName">
          <q-item-section>
            {{ photo.fileName }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
        <!-- "length": 4.0,
        "height": 2.5,
        "perimeter": 4.0,
        "area": 10.0,
        "hasCustomShape": false, -->
<script setup lang="ts">
defineProps<{
  selectedNode: any
}>()
</script>

<style scoped>

</style>
