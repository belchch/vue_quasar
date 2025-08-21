<template>
  <q-header class="bg-white text-black" reveal bordered>
    <q-toolbar class="q-px-sm q-py-none">
      <q-item class="row items-center">
        <router-link :to="{ name: 'cases' }" class="logo-link">
          <q-toolbar-title>

            <div class="text-h6">
              ЭПСЭ Экспертизы
            </div>
            <div class="text-overline">
              Межрегиональное бюро судебных экспертиз
            </div>
          </q-toolbar-title>
        </router-link>
      </q-item>
      <!-- <q-item class="row items-center" clickable active-class="" exact-active-class="" :to="{ name: 'cases' }">
        <q-toolbar-title class="text-grey-10">

          <div class="text-h6">
            ЭПСЭ Экспертизы
          </div>
          <div class="text-overline">
            Международное бюро судебных экспертиз
          </div>
        </q-toolbar-title>
      </q-item> -->

      <q-list class="row items-center menu q-gutter-md">
        <q-item class="menu-item" clickable v-ripple :class="{ active: isCasesActive }" :to="{ name: 'cases' }">
          <q-item-section> Экспертизы</q-item-section>
        </q-item>
        <q-item v-if="userStore.hasPermission(['lookup.read'])" class="menu-item" clickable v-ripple
          :class="{ active: isLookupActive }">
          <q-item-section> Справочники</q-item-section>
          <q-menu class="border-radius" style="">
            <q-list>
              <q-item clickable v-ripple v-close-popup v-for="link in menuLinks" :key="link.name"
                :to="{ name: link.route }">
                <q-item-section>
                  <q-item-label>{{ link.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-item v-if="userStore.user?.role == 'ADMIN'" class="menu-item" clickable v-ripple
          :class="{ active: isAdminActive }" :to="{ name: 'admin' }">
          <q-item-section>Администрирование</q-item-section>
        </q-item>
      </q-list>
      <div v-if="userStore.user" class="q-mx-sm flex justify-end" style="width: 320px;">
        <DownloadApkButton />
        <q-btn round flat class="q-mr-xs">
          <q-avatar color="primary" text-color="white" class="text-weight-regular">
            {{ avatarText }}
          </q-avatar>

          <q-menu class="border-radius" style="max-width: 440px">
            <q-list>
              <q-item class="q-mb-sm" clickable v-ripple v-close-popup>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" class="text-weight-regular">{{ avatarText }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ userStore.user?.username }}</q-item-label>
                  <q-item-label caption>{{ userRoleLabel(userStore.user.role) }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <!-- <q-item dense v-ripple v-close-popup>
                <q-item-section avatar>
                  <q-avatar text-color="grey-8">
                    <q-icon name="person" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Профиль</q-item-section>
              </q-item>

              <q-separator /> -->

              <q-item clickable v-ripple v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-avatar text-color="grey-8">
                    <q-icon name="logout" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Выйти</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuth } from 'src/features/auth/composables/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/features/user/stores/user-store'
import { menuLinks } from 'src/config/lookup-links'
import { userRoleLabel } from 'src/features/user/api/types'
import { useCommonService } from 'src/composables/common'
import DownloadApkButton from 'src/features/apk/components/DownloadApkButton.vue'

const auth = useAuth()
const router = useRouter()
const userStore = useUserStore()
const { cleanAll } = useCommonService()

const logout = async () => {
  cleanAll()
  await auth.logout()
  await router.push('/login')
}

const isLookupActive = computed(() => {
  return router.currentRoute.value.path.startsWith('/lookup');
})

const isCasesActive = computed(() => {
  return router.currentRoute.value.path.startsWith('/cases')
})

const isAdminActive = computed(() => {
  return router.currentRoute.value.path.startsWith('/administration')
})

const avatarText = computed(() => {
  return `${userStore.user?.firstName?.charAt(0)}${userStore.user?.lastName?.charAt(0)}`
})

onMounted(async () => {
  if (!userStore.user) {
    await logout()
  }
})
</script>

<style lang="scss" scoped>
.main-header {
  background-color: #fff;
}

.menu {
  margin-inline: auto !important;

  &-item {
    color: $grey-8;
    font-weight: 500;
    text-transform: uppercase;
    border-radius: 4px;
    padding: 12px 16px;
  }
}

.logo-link {
  text-decoration: none;
  color: $grey-10;
  transition: all 0.2s ease;
}

.dark_active,
.active {
  background: #eeeeee !important;
  color: $grey-10 ;
}
</style>
