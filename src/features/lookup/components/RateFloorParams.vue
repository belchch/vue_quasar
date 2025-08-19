<template>
  <div>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle v-model="params.baseboardReplacement" label="Замена напольного плинтуса" />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-toggle v-model="params.baseboardPreservation" label="Замена плинтуса с сохранением" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BoqFloor } from 'src/features/lookup/rate/types';
const params = defineModel<BoqFloor>({ default: null });

</script>

<style scoped>

</style>
