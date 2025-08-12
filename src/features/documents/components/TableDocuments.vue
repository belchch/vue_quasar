<template>
  <div>
    <q-table flat bordered :rows="props.docs" :columns="columnsAct" row-key="id"
      :pagination="{ rowsPerPage: 0 }"
      hide-pagination>
      <template v-slot:body-cell-displayName="props">
        <q-td>
          <EditableCell :no-edit="!hasPermission(['document.update'])" :editableFields="formFields" :value="props.value"
            :row="props.row" @update="(newValue) =>{ handleUpdateRow(props.row, newValue)}"></EditableCell>
        </q-td>

      </template>
      <template v-slot:header-cell-actions>
        <q-th style="width: 82px;border-left: 0"></q-th>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td style="border-left: 0">
          <div v-if="hasPermission(['document.update'])">
            <q-btn class="action-btn" size="sm" flat round color="primary" icon="o_file_download"
              @click.stop="saveFile(props.row)">
              <q-tooltip anchor="top middle" self="bottom middle">
                Скачать
              </q-tooltip>
            </q-btn>
            <q-btn class="action-btn" size="sm" flat round color="negative" icon="delete"
              @click.stop="confirmDelete(props.row)">
              <q-tooltip anchor="top middle" self="bottom middle">
                Удалить
              </q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { useQuasar } from 'quasar';
import { CaseDocumentResponse } from '../types';
import { DocumentsAPI } from '../api/documents-api';
import { useUserStore } from 'src/features/user/stores/user-store';
import EditableCell from 'src/features/lookup/components/EditableCell.vue';
import { Field } from 'src/features/lookup/base/store/types';

const { hasPermission } = useUserStore()
const columnsAct = ref<any[]>([]);
const $q = useQuasar();
const props = defineProps<{
  docs: CaseDocumentResponse[],
}>();
const emit = defineEmits<{
  remove: [id: number];
}>();

columnsAct.value = [
  { name: 'displayName', label: 'Имя', field: 'displayName', align: 'left', sortable: true },
  { name: 'originalName', label: 'Имя файла', align: 'left', field: 'originalName', sortable: true },
  { name: 'actions', label: '', align: 'right', field: 'actions' },
]
const formFields = ref<Field[]>([
  {
    name: 'displayName',
    label: 'Название',
    type: 'text' as const,
    required: true,
  }
])
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
const handleUpdateRow = async (row: any, { newValue, onSuccess }: { newValue: any, onSuccess: () => void }) => {
  try {
    console.log(newValue);
    delete newValue['id'];
    await DocumentsAPI.updateDocument(row.id,newValue);
    row.displayName = newValue.displayName;
    $q.notify({ type: 'positive', message: 'Данные обновлены' });
    onSuccess()
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Ошибка обновления' });
  }
};
function saveFile(item:any) {
  const a = document.createElement("a");
  a.href = item.url;
  a.download = item.displayName || item.originalName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>

<style scoped>

</style>
