<template>
  <div>
    <q-slide-transition>
      <q-card v-show="showCard" class="q-mt-md q-mb-md">
        <q-card-section class="row items-center">
          <div class="text-h6">Фильтр</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="showCard = false" />
        </q-card-section>
        <q-separator />
        <case-filter-content />
      </q-card>
    </q-slide-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CaseFilterContent from './CaseFilterContent.vue'
const showCard = defineModel('showCard', { default: false })
</script>

<style scoped></style>
