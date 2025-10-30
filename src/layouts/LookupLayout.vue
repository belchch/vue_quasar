<template>
  <q-layout view="hhh LpR fFf">
    <MainLayoutHeader />
    <q-drawer
      :v-model="leftDrawerOpen"
      :width="300"
      :breakpoint="0"
      bordered
      :overlay="false"
      :mini="miniState"
      show-if-above
    >
      <template v-slot:mini>
        <q-item clickable v-ripple @click="toggleMini">
          <q-item-section avatar>
            <q-icon name="menu" />
          </q-item-section>
        </q-item>
      </template>
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <q-item
            clickable
            v-ripple
            v-for="link in menuLinks"
            :key="link.name"
            class="navigation-item"
            :to="{ name: link.route }"
          >
            <q-item-section>{{ link.name }}</q-item-section>
          </q-item>
        </div>
      </q-scroll-area>
      <div class="q-mini-drawer-hide absolute lt-md" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="secondary"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container class="">
      <div class="text-grey-8 full-width">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MainLayoutHeader from 'src/components/MainLayoutHeader.vue'
import { menuLinks } from 'src/config/lookup-links'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const leftDrawerOpen = ref(true)
const miniState = ref(false)
watch(
  () => $q.screen.xs,
  (isXs) => {
    miniState.value = isXs
  },
)
const toggleMini = () => {
  miniState.value = !miniState.value
}
</script>

<style lang="scss" scoped>
.menu {
  margin-inline: auto !important;
  text-transform: uppercase;
  color: $grey-7;
  font-weight: 500;
}
</style>

<style scoped lang="scss">
.navigation-item {
  border-radius: 5px;
  min-height: 44px !important;
}
</style>

<style lang="scss">
.shadow_custom {
  box-shadow: 0 2px 6px #4359711f !important;
}

.dark_active,
.active {
  color: $grey-10;
  background-color: green;
}

.q-router-link--exact-active {
  background-color: $grey-2 !important;
}
</style>
