import { defineStore } from 'pinia';
import type {User} from "src/features/user/stores/types";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  function $reset () {
    user.value = null
    error.value = null
    isLoading.value = false
  }

  const setError = (value: string) => {
    error.value = value
  }

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setUser = (value: User) => {
    user.value = value
  }

  return {user, error, inProgress: isLoading, setError, setLoading, setUser, $reset}
}, {
  persist: true
});
