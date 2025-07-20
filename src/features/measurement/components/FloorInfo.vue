<template>
  <div>
    <div class="text-blue-grey">Пол</div>
    <div class="text-h6">{{ section['label'] || '-' }}</div>
    <div class="q-pa-md row items-start q-gutter-md">
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
          <div class="text-h6 text-weight-light">baseboardLength</div>
          <div class="text-body1">{{ section.rawData.baseboardLength || '-' }}</div>
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
  </div>
</template>
<!--
          {
      +"perimeter": 15.0,
      +"perimeterExcludingOpenings": 8.6,
      +"area": 14.0,
      +"comment": "Ламинат",
      +"hasCustomShape": true,
      baseboardLength": 15.0
          }

-->
<script setup lang="ts">
defineProps<{
  section: any
}>()
</script>

<style scoped></style>
