<template>
  <q-btn flat round icon="more_vert" style="color: #616161">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable :to="{ name: 'cases' }" tag="router-link">
          <q-item-section>Экспертизы</q-item-section>
        </q-item>
        <q-item :to="{ name: menuLinks[0]?.route }" tag="router-link">
          <q-item-section>Справочники</q-item-section>
        </q-item>
        <q-item :to="{ name: 'admin' }" tag="router-link">
          <q-item-section>Администрирование</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { menuLinks } from 'src/config/lookup-links'
</script>

<style scoped></style>
