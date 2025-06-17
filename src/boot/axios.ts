import { defineBoot } from '#q-app/wrappers'
import axios, { type AxiosInstance } from 'axios'
import {Credentials} from "src/features/auth/composables/credentials";
import qs from 'qs'

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

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
api.interceptors.request.use(
  (config) => {
    const accessToken = Credentials.getAccessToken()

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  }
)

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
