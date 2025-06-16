<template>
  <div class="main_bg">
    <div class="row flex-center justify-center items-cente" style="height: 100vh;">
      <router-view />
    </div>
  </div>
  <!-- <q-layout view="HHh Lpr lFf">
    <q-header elevated>asdf
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout> -->
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.main_bg {
  background-color: #f3f3f7;
}
</style>
