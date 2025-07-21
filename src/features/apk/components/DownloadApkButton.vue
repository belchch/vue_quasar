<template>
  <div>
    <q-dialog v-model="showUploadDialog">
      <q-uploader :factory="uploadFactory" method="PUT" :send-raw="true" class="img-uploader"
        @uploaded="onUploaded" @factory-failed="onFactoryFailed" thumbnail-fit="contain" />
    </q-dialog>
    <q-btn flat round icon="android">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="downloadApk">
            <q-item-section>Скачать приложение</q-item-section>
          </q-item>
          <q-item v-if="userStore?.user?.role == 'ADMIN'" clickable v-close-popup @click="showUploadDialog=true">
            <q-item-section>Загрузить приложение</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { apkApi } from 'src/features/apk/api/apk-api'
import { Notify } from 'quasar';
import { useUserStore } from 'src/features/user/stores/user-store'
import { useUploadApk } from 'src/features/inspection/composables/upload-config'
import axios from 'axios';
import { ref } from "vue";
const userStore = useUserStore()
const uploadConfig = useUploadApk();
const showUploadDialog = ref(false);

const downloadApk = async () => {
  const response = await apkApi.getApk();
  console.log(response.data);
  if(!response.data.url){
    Notify.create({
      message: 'Файл не найден',
      type: 'negative',
    });
    return;
  }
  const responseApk = await axios({
    url:response.data.url,
    method: 'GET',
    responseType: 'blob',
  });
  const href = window.URL.createObjectURL(responseApk.data);
  const link = document.createElement('a')
  link.href = href;
  const filename = response.data.source.split('/').pop()!;
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove();
}
const uploadFactory = async (files: any) => {
  const file = files[0]
  const { url, objectKey } = await uploadConfig(file.name)
  console.log(objectKey)
  file.objectKey = objectKey
  return { url }
}
const onUploaded = async (info: any) => {
  const objectKey = info.files[0].objectKey;
  const file = info.files[0];
  try {
    let version = file.name.replace('.apk', '')?.replace('Epse-', '');
    if (!version) { version = Date.now().toString(); }
    await apkApi.postApk(objectKey, version);
    Notify.create({
      type: 'positive',
      message: 'Файл успешно загружен',
    });
  } catch (error: any) {
    console.error(
      'Ошибка при загрузке документа:',
      error.message
    );
  }
}
const onFactoryFailed = (error: any) => {
  console.error('error', error)
}

</script>

<style scoped>

</style>
