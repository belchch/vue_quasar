import {api} from "boot/axios";
import type { CredentialsRequest, LogoutRequest } from 'src/features/auth/api/types';
import type { Tokens } from 'src/features/auth/stores/types';
import { type AxiosRequestConfig } from 'axios'


export const AuthApi = {
  async login(request: CredentialsRequest) {
    // Флаги, обрабатываемые в boot/axios:
    //  - __isLoginRequest:   на 401 не запускаем обновление токена
    //  - __skipErrorNotify:  не показываем глобальный тост — ошибку покажет форма входа
    const config: AxiosRequestConfig = {
      __isLoginRequest: true,
      __skipErrorNotify: true,
    }
    return api.post<Tokens>('/api/auth/login', request, config);
  },

  async logout(request: LogoutRequest) {
    return api.post(`/api/auth/logout`, request)
  },
  async refreshToken(token:string | null, config?: AxiosRequestConfig) {
    return api.post<Tokens>(`/api/auth/refresh`,{refreshToken:token},config);
  }
};
