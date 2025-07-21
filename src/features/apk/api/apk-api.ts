import { api } from "boot/axios";
import { ApkResponse } from "./types";

export const apkApi = {
  getApk() {
    return api.get<ApkResponse>(`/api/apk/current`);
  },

  postApk(source: string, version:string) {
    return api.post(`/api/apk`, {
      source,
      version
    });
  }
}
