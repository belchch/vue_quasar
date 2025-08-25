<template>
  <div>
    <div class="text-blue-grey">Движимое имущество</div>
    <div class="text-h6">{{ selectedNode['label'] || '-' }}</div>
    <div class="q-pa-md row items-start q-gutter-md">
      <card-item title="Длина" :item-value="selectedNode.rawData.length" />
      <card-item title="Ширина" :item-value="selectedNode.rawData.width" />
      <card-item title="Высота" :item-value="selectedNode.rawData.height" />
      <card-item title="Периметр" :item-value="selectedNode.rawData.perimeter" />
      <card-item title="Площадь" :item-value="selectedNode.rawData.area" />
    </div>
    <div class="text-h6">Фотографии</div>
    <div class="q-pa-md">
      <div v-if="selectedNode.rawData.photos.length == 0">
        Фотографии отсутствуют
      </div>
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
      <!--
      {
      "type": "string",
      "length": 0.1,
      "width": 0.1,
      "heightFromFloor": 0.1,
      "height": 0.1,
      "perimeter": 0.1,
      "area": 0.1,
      "hasCustomShape": true,
      "comment": "string",
      "photos": [
        {
        "fileName": "string"
        }
      ]
      } -->
<script setup lang="ts">
import CardItem from './CardItem.vue'

defineProps<{
  selectedNode: any
}>()
</script>

<style scoped>

</style>
