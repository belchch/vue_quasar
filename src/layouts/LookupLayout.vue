<template>
  <q-layout view="hhh LpR fFf">
    <MainLayoutHeader />
    <q-page-container class="">
      <div class="left-menu text-grey-8">
        <q-scroll-area style="height: 100%">
          <div class="q-pa-md q-ma-none">
            <q-item clickable v-ripple v-for="link in menuLinks" :key="link.name" class="navigation-item"
              :to="{ name: link.route }">
              <q-item-section>{{ link.name }}</q-item-section>
            </q-item>
          </div>
        </q-scroll-area>
      </div>
      <div class="content text-grey-8 full-width">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from 'src/features/auth/composables/auth'
import { useUserStore } from "src/features/user/stores/user-store";
import { useRouter } from "vue-router"
import MainLayoutHeader from 'src/components/MainLayoutHeader.vue'
import { menuLinks } from 'src/config/lookup-links'

const auth = useAuth()
const userStore = useUserStore()
const router = useRouter()

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = async () => {
  await auth.logout()
  await router.push('/login')
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
.content {
  padding-left: 300px;
}

.left-menu {
  width: 300px;
  transform: translateX(0px);
  top: 81px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  color: #697a8d !important;
}

.navigation-item {
  border-radius: 5px;
  min-height: 44px !important;

}
</style>

<style lang="scss">
.body--light {
  //background-color: #f3f3f7;
}

.shadow_custom {
  box-shadow: 0 2px 6px #4359711f !important;
}

.dark_active,
.active {
  // background: linear-gradient(72.47deg, #7367f0 22.16%, #7367f0b3 76.47%) !important;
  color: $grey-10;
  background-color: green;
}

.q-router-link--exact-active {
  background-color: $grey-2 !important;
}
</style>
