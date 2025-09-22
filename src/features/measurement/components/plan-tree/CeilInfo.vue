<template>
  <div>
    <div class="text-blue-grey">Потолок</div>
    <div class="text-h6">{{ section['comment'] || '-' }}</div>
    <div class="q-pa-md row items-start q-gutter-md">
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Площадь</div>
          <div class="text-body1">{{ section.area || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Длина</div>
          <div class="text-body1">{{ section.length || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Ширина</div>
          <div class="text-body1">{{ section.width || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Периметр</div>
          <div class="text-body1">{{ section.perimeter || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Длина молдинга</div>
          <div class="text-body1">{{ section.moldingLength || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Произвольная форма</div>
          <div class="text-body1">{{ section.hasCustomShape ? 'Да' : 'Нет' }}</div>
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
