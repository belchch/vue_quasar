<template>
  <div>
    <div class="text-blue-grey">Секция</div>
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
          <div class="text-h6 text-weight-light">Длина</div>
          <div class="text-body1">{{ section.rawData.length || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Ширина</div>
          <div class="text-body1">{{ section.rawData.width || '-' }}</div>
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
          <div class="text-h6 text-weight-light">moldingLength</div>
          <div class="text-body1">{{ section.rawData.moldingLength || '-' }}</div>
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
      +"length": 4.0,
      +"width": 3.5,
      +"perimeter": 15.0,
      +"area": 14.0,
      +"hasCustomShape": false,
      +"comment": "Натяжной",
      "moldingLength": 15.0
          }

-->
<script setup lang="ts">
defineProps<{
  section: any
}>()
</script>

<style scoped></style>
