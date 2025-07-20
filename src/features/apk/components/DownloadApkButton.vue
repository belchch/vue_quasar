<template>
  <div>
    <q-btn @click="downloadApk" flat round icon="android">
      <q-tooltip>
        Скачать приложение
      </q-tooltip>
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { apkApi } from 'src/features/apk/api/apk-api'
import { Notify } from 'quasar';

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
  const url = window.URL.createObjectURL(new Blob([response.data.url]));
  const link = document.createElement('a')
  link.href = url
  const filename = response.data.source.split('/').pop()!;
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove();
}

</script>

<style scoped>

</style>
