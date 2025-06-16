<template>
  <div>
    <q-select
      v-bind="$attrs"
      dense
      v-model="model"
      outlined
      multiple
      use-chips
      class="full-width"
    />
  </div>
</template>
<script setup lang="ts">
const model = defineModel()
</script>
