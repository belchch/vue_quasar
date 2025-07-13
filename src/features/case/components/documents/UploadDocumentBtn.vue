<template>
  <div>
    <q-dialog v-model="showUploadDialog">
      <q-uploader :factory="uploadFactory" multiple method="PUT" :send-raw="true" class="img-uploader"
        @uploaded="onUploaded" @factory-failed="onFactoryFailed" thumbnail-fit="contain" />
    </q-dialog>
    <q-btn color="primary" icon="upload" label="Загрузить" @click="showUploadDialog=true" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { useUploadConfig } from 'src/features/inspection/composables/upload-config'
import { useInspectionsStore } from "src/features/inspection/store/inspection-store";
import { api } from 'boot/axios'
import { CaseDocumentResponse, CaseDocumentType } from './types';
import { DocumentsAPI } from './documents-api';


const uploadConfig = useUploadConfig();
const inspectionStore = useInspectionsStore();

const showUploadDialog = ref(false);
const uploadProgress = ref(0);
const uploadMessage = ref('');
const uploadMessageClass = ref('');

const props = defineProps<{
  fileType: CaseDocumentType,
}>();

const emit = defineEmits<{
  add:[item: any];
}>();

const getExtension = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.')
  return lastDotIndex === -1 ? '' : filename.substring(lastDotIndex + 1)
}
const uploadFactory = async (files: any) => {
  const file = files[0]
  const { url, objectKey } = await uploadConfig(getExtension(file.name))
  console.log(objectKey)
  file.objectKey = objectKey
  return {
    url,
  }
}
const onUploaded = async (info: any) => {
  const objectKey = info.files[0].objectKey;
  const file = info.files[0];
  try{
    const document = {
      inspectionId: inspectionStore.selectedInspectionId,
      displayName: file.name.split('.').slice(0, -1).join('.'),
      originalName: file.name,
      mimeType: file.type,
      fileType: props.fileType,
      objectKey: objectKey
    }
    const responsePost = await DocumentsAPI.postDocument(document);
    const newItem: CaseDocumentResponse = responsePost.data;
    emit('add', newItem);
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
