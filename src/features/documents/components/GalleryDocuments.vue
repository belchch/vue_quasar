<template>
  <div class="row justify-end">
    <q-slider v-model="cardSize" :min="150" :max="800" style="width: 100px;" color="primary" class="q-mb-md" />
  </div>
  <LightBoxImage v-model="showLightbox" :images="lightBoxImg" />
  <div v-if="docs.length==0" class="text-h5 text-weight-light text-center">Документы отсутствуют</div>
  <div class="q-col-gutter-md row items-start">
    <div class="col-auto" v-for="doc in props.docs" :key="doc.id" style="align-self: stretch;">
      <q-card class="cord-hover full-height" flat bordered :style="{ width: cardSize + 'px', height: cardSize + 'px' }">
        <q-card-section v-if="doc.mimeType.indexOf('image') < 0">
          <q-img src="/img/no-preview.svg" />
        </q-card-section>
        <q-card-section v-else>
          <q-img class="hover-img" :src="doc.url" fit="contain" :ratio="1" @click="openImage(doc.url)">
          </q-img>
        </q-card-section>
        <div class="hover-controls absolute-top column" v-if="hasPermission(['document.update'])">
          <q-btn flat text-color="white" icon="edit" class="hover-delete-btn" @click="edit(doc)">
            <q-tooltip :anchor="'center right'" :self="'center start'">
              Редактировать
            </q-tooltip>
          </q-btn>
          <q-btn flat text-color="white" icon="download" class="hover-delete-btn" @click="downloadDoc(doc)">
            <q-tooltip :anchor="'center right'" :self="'center start'">
              Скачать
            </q-tooltip>
          </q-btn>
          <q-btn flat text-color="white" icon="delete" class="hover-delete-btn" @click="confirmDelete(doc)">
            <q-tooltip :anchor="'center right'" :self="'center start'">
              Удалить
            </q-tooltip>
          </q-btn>
        </div>
        <q-separator />
        <q-card-actions class="bg-blue-grey-1">
          <div style="max-width: 100%;text-overflow: ellipsis;overflow: hidden;word-wrap: none;white-space: nowrap;">
            {{ doc.displayName }}
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useQuasar } from 'quasar';
import { CaseDocumentResponse } from '../types';
import { DocumentsAPI } from '../api/documents-api';
import { useUserStore } from 'src/features/user/stores/user-store';

const cardSize = ref(400);

const showLightbox = ref(false);
const lightBoxImg = ref('');
// const newDisplayName = ref('');
// const editDialog = ref(false);

const $q = useQuasar();
const { hasPermission } = useUserStore()

const props = defineProps<{
  docs: CaseDocumentResponse[],
}>();
const emit = defineEmits<{
  remove: [id: number];
}>();

const openImage = (url: string) => {
  if (url) {
    lightBoxImg.value = url;
    showLightbox.value = true;
  }
}
const confirmDelete = (row: any) => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить документ?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await DocumentsAPI.deleteDocument(row.id);
      emit('remove', row.id);
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
};

const edit = (doc: any) => {
  $q.dialog({
    title: 'Редактирование',
    cancel: true,
    prompt: {
      model: doc.displayName,
      isValid: val => val.length > 0,
      type: 'text',
      autofocus: true,
    }
  }).onOk(async (val: string) => {
    try {
      doc.displayName = val;
      await DocumentsAPI.updateDocument(doc.id, doc);
      $q.notify({ type: 'positive', message: 'Изменения сохранены' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при редактировании' });
    }
  });
}
const downloadDoc = async (doc:CaseDocumentResponse) => {
  try {
    let fileExt = '';
    const fileNameSplit = doc.originalName.split('.');
    if (fileNameSplit.length > 1)
      fileExt = '.' + fileNameSplit.pop() || 'unknown';
    const fileName = doc.displayName + '.' + fileExt;
    await downloadFile(doc.url, fileName);
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Не удалось скачать файл' });
  }
}
function saveFile(url:string, filename:string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
async function downloadFile(url:string, filename:string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    saveFile(blobUrl, filename);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Error in fetching and downloading file:", err);
  }
}



</script>
<style lang="scss" scoped>
.hover-controls{
  background: rgba(0, 0, 0, 0.47);
  width: fit-content;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.cord-hover{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.hover-img:hover{
  cursor: pointer;
}
.cord-hover:hover .hover-controls {
  opacity: 1;
}
</style>
