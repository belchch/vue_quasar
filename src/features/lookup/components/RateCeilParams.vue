<template>
  <div>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.moldingReplacement" label="Замена потолочного плинтуса" />
      <span v-if="params.moldingReplacement === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-toggle toggle-indeterminate v-model="params.moldingPreservation" label="Замена потолочного с сохранением" />
      <span v-if="params.moldingPreservation === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { BoqCeil } from 'src/features/lookup/rate/types';
const params = defineModel<BoqCeil>({ default: null });

</script>

<style scoped>

</style>
