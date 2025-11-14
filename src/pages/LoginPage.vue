<template>
  <q-card flat style="width: 400px" class="shadow_custom q-py-md">
    <q-card-section class="q-px-lg">
      <!-- <div class="row justify-center q-mt-md">
        <q-avatar size="64px">
          <img src="~assets/logo.svg">
        </q-avatar>
      </div> -->
      <div class="text-center q-mt-lg text-grey-8 text-h5">ЭПСЭ Экспертизы</div>
    </q-card-section>

    <q-card-section class="q-px-lg">
      <form @submit.prevent="login">
        <div class="q-px-sm q-py-xs">
          <q-input v-model="username" label="Email" outlined dense />
        </div>
        <div class="q-px-sm q-py-xs">
          <q-input v-model="password" type="password" label="Пароль" outlined dense />
        </div>
        <div class="q-py-sm q-pa-none text-grey-9">
          <q-checkbox v-model="remember" label="Запомнить меня" />
        </div>
        <div class="q-px-sm q-py-xs">
          <q-btn color="primary" type="submit" label="Войти" class="full-width" />
        </div>
      </form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from "src/features/auth/composables/auth";
import { useRouter } from "vue-router";

const auth = useAuth()
const router = useRouter()

const username = ref('')
const password = ref('')
const remember = ref(false)

const login = async () => {
  await auth.login({
    username: username.value,
    password: password.value
  })

  await router.push('/')
}
</script>
