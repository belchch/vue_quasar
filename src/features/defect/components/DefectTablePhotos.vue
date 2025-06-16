<template>
  <div class="row q-gutter-md">
    <div v-for="url in urls"  :key="url" class="img-container">
      <q-img :src="url"/>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  urls: string[]
}>()
</script>
<style scoped>
.img-container {
  width: 200px;
  heigth: 300px;
}
</style>
