import type { CredentialsRequest } from 'src/features/auth/api/types'
import { AuthApi } from 'src/features/auth/api'
import {UserService} from "src/features/user/api";
import {useUserStore} from "src/features/user/stores/user-store";
import {Credentials} from "src/features/auth/composables/credentials";

export const useAuth = () => {
  const { setUser, setLoading, setError, $reset } = useUserStore()

  const login = async (request: CredentialsRequest) => {
    setLoading(true)

    try {
      const tokens = await AuthApi.login(request)
      Credentials.setTokens(tokens.data)
      const user = await UserService.currentUser()
      setUser(user.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    const refreshToken = Credentials.getRefreshToken()

    if (refreshToken) {
      try {
        await AuthApi.logout({ refreshToken })
      } finally {
        Credentials.removeTokens()
        $reset()
      }
    }
  }

  return { login, logout }
}
