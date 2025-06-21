<template>
    <q-btn icon="download" :label="label" @click="execute" color="primary" :loading="loading" flat :disable="disable"/>
</template>
<script setup lang="ts">
import axios from 'axios';
import { FileInfo } from 'src/features/defect/api/types';
import { ref } from 'vue';

const props = defineProps<{
    label: string,
    disable: boolean,
    apiFn: () => Promise<FileInfo>
}>()

const loading = ref(false)

const execute = async () => {
    loading.value = true
    const fileInfo = await props.apiFn()
    await download(fileInfo.fileLink, fileInfo.fileName)
    loading.value = false
}

async function download(url: string, filename: string): Promise<void> {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob', 
    });

    const href = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
}
</script>