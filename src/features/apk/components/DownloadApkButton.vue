<template>
  <div>
    <q-dialog v-model="showUploadDialog">
      <q-card style="width: 100%;max-width: 450px;">
        <q-card-section class="row items-center">
          <h6 class="q-ma-none">Загрузка APK</h6>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form @submit="submitUpload">
          <q-card-section class="q-pb-none">
            <q-input label="Имя версии" v-model="version" outlined dense
              :rules="[val => !!val || 'Поле не может быть пустым']" />
          </q-card-section>
          <q-card-section class="q-pb-none">
            <q-input label="Версия" v-model="versionCode" outlined dense
              :rules="[val => !!val || 'Поле не может быть пустым', val => /^\d+$/.test(val) || 'Введите целое число']" />
          </q-card-section>
          <q-card-section>
            <q-uploader style="width:100%" ref="uploader" hide-upload-btn flat bordered :factory="uploadFactory" method="PUT"
              :send-raw="true" class="img-uploader" @uploaded="onUploaded" @factory-failed="onFactoryFailed"
              thumbnail-fit="contain" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Загрузить" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-btn flat round icon="android" style="color: #616161;">
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
const version = ref('');
const versionCode = ref<number>();
const uploader = ref();
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
    await apkApi.postApk(objectKey, version.value, versionCode.value!);
    Notify.create({
      type: 'positive',
      message: 'Файл успешно загружен',
    });
  } catch (error: any) {
    console.error(
      'Ошибка при загрузке:',
      error.message
    );
  } finally{
    showUploadDialog.value = false;
  }
}
const submitUpload = () => {
  if(uploader.value.files.length==0){
    Notify.create({
      type: 'negative',
      message: 'Выберите файл',
    });
    return;
  }
  uploader.value.upload();
}
const onFactoryFailed = (error: any) => {
  console.error('error', error)
}

</script>

<style scoped>

</style>
