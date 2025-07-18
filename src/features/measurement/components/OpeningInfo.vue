<template>
  <div>
    <div class="text-blue-grey">{{ selectedNode.rawData.type == 'DOOR' ? 'Дверь' : 'Окно' }}</div>
    <div class="text-h6">{{ selectedNode['label'] || '-' }}</div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Ширина</div>
          <div class="text-body1">{{ selectedNode.rawData.width || '-' }}</div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Высота</div>
          <div class="text-body1">{{ selectedNode.rawData.height || '-' }}</div>
        </q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Высота над полом</div>
          <div class="text-body1">{{ selectedNode.rawData.heightFromFloor || '-' }}</div>
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
      <q-card flat bordered v-if="selectedNode.rawData.type =='DOOR'">
        <q-card-section>
          <div class="text-h6 text-weight-light">Наличники</div>
          <div v-if="selectedNode.rawData.hasTrims" class="text-body1">{{ selectedNode.rawData.trimsWidth}}</div>
          <div v-else class="text-body1">Отсутствуют</div>
        </q-card-section>
      </q-card>
      <q-card v-else flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Откосы</div>
          <div v-if="selectedNode.rawData.hasSlopes" class="text-body1">{{ selectedNode.rawData.slopesWidth }}</div>
          <div v-else class="text-body1">Отсутствуют</div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-light">Произвольная форма</div>
          <div class="text-body1">{{ selectedNode.rawData.hasCustomShape ? 'Да' : 'Нет' }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<!-- Дверь
          {
            +"type": "DOOR",
            +"hasCustomShape": false,
            +"width": 0.9,
            +"height": 2.1,
            +"heightFromFloor": 0,
            +"area": 1.89,
            +"perimeter": 6.0,
            +"comment": "Проем в кухню",
            +"hasTrims": false,
            +"trimsWidth": 0
          }
    Окно
          {
            +"type": "WINDOW",
            +"hasCustomShape": false,
            +"width": 1.2,
            +"height": 1.2,
            +"heightFromFloor": 0.6,
            +"area": 1.44,
            +"perimeter": 4.8,
            "comment": "Окно во двор",
            "hasSlopes": true,
            "slopesWidth": 1.0
          }
-->
<script setup lang="ts">
defineProps<{
  selectedNode: any
}>()
</script>

<style scoped></style>
