<template>
  <q-dialog v-model="model" full-width full-height maximized backdrop-filter="brightness(40%)">
    <q-card class="lightbox-container" style="background: transparent; box-shadow: none">
      <!-- Для одного изображения -->
      <template v-if="typeof images === 'string'">
        <q-img :src="images" fit="contain" class="single-img" />
      </template>
      <template v-else>
        <!-- Для нескольких изображений -->
        <div v-if="images.length > 1" class="carousel-wrapper">
          <q-carousel v-model="slide" swipeable animated arrows navigation infinite2 transition-prev="slide-right"
            transition-next="slide-left" class="full-height-carousel" style="background-color: transparent;">
            <q-carousel-slide v-for="(url, index) in images" :key="index" :name="index" class="full-height-slide">
              <q-img :src="url" fit="contain" class="full-height-img" />
            </q-carousel-slide>
          </q-carousel>
        </div>
        <q-img v-else :src="images[0]" fit="contain" class="single-img" />
      </template>
      <q-btn icon="close" flat round dense v-close-popup class="dialog-img-close-btn bg-primary text-white" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const slide = ref(0)

const model = defineModel({
  type: Boolean,
  default: false,
});

const {images} = defineProps<{
  images: string | string[],
}>();

</script>

<style scoped>

</style>
