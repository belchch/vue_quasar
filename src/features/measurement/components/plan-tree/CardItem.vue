<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6 text-weight-light"> {{title}} </div>
      <div class="text-body1">{{ itemValue || '-' }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  itemValue: any
}>()
</script>

<style scoped>

</style>
