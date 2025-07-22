import { defineBoot } from '#q-app/wrappers'
import { useRouter } from 'vue-router'
import axios, { type AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse,InternalAxiosRequestConfig  } from 'axios'
import {Credentials} from "src/features/auth/composables/credentials";

import { AuthApi } from 'src/features/auth/api';
import qs from 'qs'
import { Notify } from 'quasar';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}
declare module 'axios' {
  interface AxiosRequestConfig {
    __isRetryRequest?: boolean;
    __isRefreshTokenRequest?: boolean;
  }
}

const AUTH_HEADER = 'X-Authorization';
const apiUrl = process.env.VUE_APP_API_URL

if (!apiUrl) {
  throw Error('No API_URL environment variable')
}
const api = axios.create({
  baseURL: apiUrl,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'comma' });
  },
})

let isRefreshing = false;
let failedRequests :{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig ;
}[] = [];
// Повтор запросов из очереди
const retryFailedRequests = (newToken: string)=> {
  failedRequests.forEach((request) => {
    request.config.headers![AUTH_HEADER] = `Bearer ${newToken}`;
    api(request.config)
      .then(request.resolve)
      .catch(request.reject);
  });
  failedRequests = [];
}
// Обработка ошибок в очереди
const rejectFailedRequests = (error: any)=> {
  failedRequests.forEach((request) => request.reject(error));
  failedRequests = [];
}
// if(Credentials.isAuthenticated()){
//   api.defaults.headers.common[AUTH_HEADER] = `Bearer ${Credentials.getAccessToken()}`;
//   console.log('Авторизован');
// }

api.interceptors.request.use(
  (config) => {
    const accessToken = Credentials.getAccessToken()

    if (accessToken) {
        config.headers[AUTH_HEADER] = `Bearer ${accessToken}`
    }

    return config
  }
)



export default defineBoot(({ app,router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  api.interceptors.response.use(
    response => response,
    async (error:AxiosError) => {
      const originalRequest = {...error.config} as InternalAxiosRequestConfig;
      // Токен истек
      if (error.response?.status === 401 && originalRequest){
        if (originalRequest?.__isRefreshTokenRequest) {
          console.log("Refresh token invalid",originalRequest.url);
          Credentials.removeTokens();
          rejectFailedRequests(error);
          isRefreshing = false;
          await router.push('/login');
          return Promise.reject(error);
        }
        if(isRefreshing && originalRequest && originalRequest.__isRetryRequest){
          const router = useRouter();
          console.log("повторный запрос",originalRequest.url);
          Credentials.removeTokens();
          isRefreshing = false;
          rejectFailedRequests(error);
          await router.push('/login');
          return Promise.reject(error);
        }
        console.log(`Токен истек: ${originalRequest.url}`);
        originalRequest.__isRetryRequest = true;
        // Если обновление уже в процессе - добавляем запрос в очередь
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequests.push({ resolve, reject, config: originalRequest });
          });
        }
        isRefreshing = true;

        try {
          const refreshToken = Credentials.getRefreshToken();
          Credentials.removeTokens();
          delete originalRequest.headers[AUTH_HEADER];
          console.log('send refresh',originalRequest)
          const tokens = await AuthApi.refreshToken(refreshToken,{
            __isRefreshTokenRequest: true // Помечаем запрос
          });
          console.log('refresh tokens',tokens)
          Credentials.setTokens(tokens.data);
          // originalRequest.headers[AUTH_HEADER] = `Bearer ${tokens.data.accessToken}`;
          // api.defaults.headers.common[AUTH_HEADER] = `Bearer ${tokens.data.accessToken}`;
          const  resultOriginalRequest = await api(originalRequest);
          retryFailedRequests(tokens.data.accessToken);
          return resultOriginalRequest;
        } catch(refreshError){
          const router = useRouter();
          console.log("Ошибка обновления токена", refreshError);
          Credentials.removeTokens();
          rejectFailedRequests(refreshError);
          await router.push('/login');
        }
        finally {
          isRefreshing = false;
        }

      } else {
        Notify.create({
          type: 'negative',
          message: error.message
        })
        throw error
      }
    }
  )
})

export { api }
