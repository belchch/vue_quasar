<template>
  <div>
    <div class="text-blue-grey">Секция</div>
    <div class="text-h6">{{ section['label'] || '-' }}</div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Длина</div>
          <div class="text-body1">{{ section.rawData.length || '-' }}</div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Высота</div>
          <div class="text-body1">{{ section.rawData.height || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Периметр</div>
          <div class="text-body1">{{ section.rawData.perimeter || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Периметр без проемов</div>
          <div class="text-body1">{{ section.rawData.perimeterExcludingOpenings || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Площадь</div>
          <div class="text-body1">{{ section.rawData.area || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Произвольная форма</div>
          <div class="text-body1">{{ section.rawData.hasCustomShape ? 'Да' : 'Нет' }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <div class="text-h6">Фотографии</div>
      <div class="text-h6 text-weight-light" v-if="section.rawData.photos.length == 0">Фотографии
        отсутствуют</div>
      <q-list v-else bordered separator>
        <q-item v-for="photo in section.rawData.photos" :key="photo.fileName">
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
            +"length": 2.0,
            +"height": 2.5,
            +"perimeter": 2.0,
            +"hasCustomShape": false,
            +"area": 5.0,
            "perimeterExcludingOpenings": 3.6,
            +"comment": "Обои",
          }

-->
<script setup lang="ts">
defineProps<{
  section: any
}>()
</script>

<style scoped></style>
