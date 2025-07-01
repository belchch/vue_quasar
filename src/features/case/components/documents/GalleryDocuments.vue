<template>
  <div class="q-col-gutter-md row items-start">
    <div class="col-6" v-for="doc in props.docs" :key="doc.id" style="align-self: stretch;">
      <q-card class="cord-hover">
        <q-card-section>
          <q-img :src="doc.url">
            <div class="absolute-bottom text-subtitle1 text-center">
              {{ doc.displayName }}
            </div>
          </q-img>
        </q-card-section>
        <div class="hover-controls absolute-top column">
          <q-btn flat text-color="white" icon="delete" class="hover-delete-btn" @click="confirmDelete(doc)" />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { useQuasar } from 'quasar';
import { CaseDocumentResponse } from './types';
import { DocumentsAPI } from './documents-api';
const $q = useQuasar();
const props = defineProps<{
  docs: CaseDocumentResponse[],
}>();
const emit = defineEmits<{
  remove: [id: number];
}>();
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
.cord-hover:hover .hover-controls {
  opacity: 1;
}
</style>
