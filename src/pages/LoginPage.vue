<template>
  <q-card flat class="login-card">
    <q-card-section class="login-card__header text-center">
      <div class="text-h6 text-grey-9 text-weight-medium">ЭПСЭ Экспертизы</div>
      <div class="text-caption text-grey-6 q-mt-xs">Межрегиональное бюро судебных экспертиз</div>
    </q-card-section>

    <q-card-section class="q-px-lg q-pb-lg">
      <q-banner
        v-if="errorMessage"
        class="bg-red-1 text-negative q-mb-md login-card__error"
        rounded
        dense
      >
        <template #avatar>
          <q-icon name="error_outline" color="negative" />
        </template>
        {{ errorMessage }}
      </q-banner>

      <q-form ref="formRef" class="q-gutter-md" @submit.prevent="onSubmit">
        <q-input
          v-model="login"
          label="Логин"
          outlined
          dense
          autocomplete="username"
          :disable="loading"
          clearable
          :rules="loginRules"
          @update:model-value="clearError"
        >
          <template #prepend>
            <q-icon name="person_outline" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          label="Пароль"
          outlined
          dense
          autocomplete="current-password"
          :disable="loading"
          :rules="passwordRules"
          @update:model-value="clearError"
        >
          <template #prepend>
            <q-icon name="lock_outline" />
          </template>
          <template #append>
            <q-icon
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPasswordVisible = !isPasswordVisible"
            >
              <q-tooltip>{{ isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль' }}</q-tooltip>
            </q-icon>
          </template>
        </q-input>

        <div class="row items-center justify-between">
          <q-checkbox v-model="remember" label="Запомнить меня" dense class="text-grey-8" />
        </div>

        <q-btn
          type="submit"
          color="primary"
          label="Войти"
          class="full-width login-card__submit"
          unelevated
          no-caps
          :loading="loading"
          :disable="loading"
        >
          <template #loading>
            <q-spinner-dots />
            <span class="q-ml-sm">Вход…</span>
          </template>
        </q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { QForm } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuth } from 'src/features/auth/composables/auth'
import { getApiErrorStatus } from 'src/common/errors'

const auth = useAuth()
const router = useRouter()

const formRef = ref<QForm>()
const login = ref('')
const password = ref('')
const remember = ref(false)
const isPasswordVisible = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const loginRules = [(val: string) => !!val?.trim() || 'Введите логин']

const passwordRules = [(val: string) => !!val || 'Введите пароль']

const clearError = () => {
  if (errorMessage.value) errorMessage.value = ''
}

const onSubmit = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return

  errorMessage.value = ''
  loading.value = true
  try {
    await auth.login({ username: login.value.trim(), password: password.value })
    await router.push('/')
  } catch (err) {
    const status = getApiErrorStatus(err)
    errorMessage.value =
      status === 401
        ? 'Неверный логин или пароль'
        : 'Не удалось войти. Проверьте подключение и попробуйте снова.'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  padding: 8px 0 4px;

  &__header {
    padding: 28px 24px 8px;
  }

  &__submit {
    height: 42px;
    font-weight: 600;
    border-radius: 8px;
    margin-top: 4px;
  }

  &__error {
    border: 1px solid rgba(255, 22, 68, 0.25);
  }
}
</style>
