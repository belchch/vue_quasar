<template>
  <q-card
    flat
    bordered
    square2
    class="row q-gutter-y-md shadow_custom"
    style="position: sticky; top: 48px; margin-left: -1px; overflow: hidden"
  >
    <CaseFilterContent />
  </q-card>
</template>
<script setup lang="ts">
import CaseFilterContent from './CaseFilterContent.vue'
</script>
