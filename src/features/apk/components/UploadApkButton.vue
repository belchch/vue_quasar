<template>
  <div>
    <div>
      <input
        type="file"
        @change="uploadFile($event)"
        style="display: none;"
        ref="uploadInp"
        accept=".apk" />
      <q-btn
        @click="triggerFileInput"
        :loading="loading"
        flat
        round
        icon="upload"
      >
        <q-tooltip>
          Загрузить APK
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { Notify } from 'quasar';
import { useUploadApk } from 'src/features/inspection/composables/upload-config'
import { apkApi } from 'src/features/apk/api/apk-api'

const uploadConfig = useUploadApk();

const uploadInp = ref<HTMLInputElement | null>(null);
const loading = ref(false);


function triggerFileInput() {
  uploadInp.value?.click();
}
async function uploadFile(e:Event) {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return;
  const file = target.files[0] as File;
  target.value = '';
  loading.value = true;
  try{
    const { url, objectKey } = await uploadConfig(file?.name);
    console.log(url, objectKey, file?.type);
    const blob = new Blob([file], { type: file?.type || 'application/octet-stream' })
    const uploadResponse = await fetch(url, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': file?.type || 'application/octet-stream',
      }
    });
    if(uploadResponse.ok){
      let version = file.name.replace('.apk','')?.replace('Epse-','');
      if(!version){ version = Date.now().toString(); }
      await apkApi.postApk(objectKey, version);
      Notify.create({
        type: 'positive',
        message: 'Файл успешно загружен',
      });
    } else {
      Notify.create({
        type: 'negative',
        message: 'Ошибка при загрузке файла'
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(
        'Неизвестная ошибка во время загрузки файла .apk',
      );
    }
  } finally{
    loading.value = false;
  }

}
</script>

<style scoped>

</style>
