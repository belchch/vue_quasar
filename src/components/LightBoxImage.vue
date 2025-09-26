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
.lightbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.full-height-carousel {
  height: 100vh;
  width: 100vw;
}

.full-height-slide {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-height-img {
  max-height: 100vh;
  max-width: 100vw;
  width: auto;
  height: auto;
}

/* Для одиночного изображения */
.single-img {
  max-height: 90vh;
  max-width: 100vw;
}

/* Кнопка закрытия */
.dialog-img-close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}
</style>
