<template>
  <q-layout view="hhh LpR fFf" :class="currentTheme">
    <MainLayoutHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainLayoutHeader from 'src/components/MainLayoutHeader.vue'
const currentTheme = ref(localStorage.getItem('theme') || '')
</script>


<style lang="scss">
.q-layout {
  background-color: var(--q-background);
}

.shadow_custom {
  box-shadow: 0 2px 6px #4359711f !important;
}
</style>
