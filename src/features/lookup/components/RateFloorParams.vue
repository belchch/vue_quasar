<template>
  <div>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.baseboardReplacement" label="Замена напольного плинтуса" />
      <span v-if="params.baseboardReplacement === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-toggle toggle-indeterminate v-model="params.baseboardPreservation" label="Замена плинтуса с сохранением" />
      <span v-if="params.baseboardPreservation === null" class="text-blue-grey text-caption"> Не используется</span>
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
