<template>
  <q-card flat bordered>
    <!-- Меню -->
    <q-btn v-if="!editMode" class="absolute-top-right" style="z-index:1" color="grey-7" size="sm" round flat
      icon="more_vert">
      <q-menu auto-close>
        <q-list dense separator>
          <q-item clickable @click="showEditMode">
            <q-item-section side class="q-pr-xs">
              <q-icon name="edit" size="xs" />
            </q-item-section>
            <q-item-section>
              Реадктировать
            </q-item-section>
          </q-item>
          <q-item clickable @click="remove">
            <q-item-section side class="q-pr-xs">
              <q-icon name="delete" size="xs" color="negative" />
            </q-item-section>
            <q-item-section class="text-negative">Удалить</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <!-- Контент -->
    <q-card-section v-if="editMode">
      <q-editor v-model="editedTextComment" :disable="saving" min-height="5rem" />
      <div class="row justify-end q-mt-auto q-gutter-md">
        <q-btn color="blue-grey-7" flat @click="editMode = false">Отмена</q-btn>
        <q-btn @click="save" :loading="saving" color="primary" flat>Сохранить</q-btn>
      </div>
    </q-card-section>
    <q-card-section v-else>
      <div v-html="commentItem.text"></div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CaseComment } from "../../stores/types";
import { useCaseCommentService } from "../../composables/case-comments";
import { useQuasar } from 'quasar';
const { saveCaseComment, deleteCaseComment } = useCaseCommentService();
const { commentItem } = defineProps<{
  commentItem: CaseComment
}>();

const $q = useQuasar();
const editMode = ref(false);
const editedTextComment = ref("");
const saving = ref(false);

const emit = defineEmits<{
  (e: 'update', value: CaseComment): void
  (e: 'remove', value: CaseComment): void
}>();

function showEditMode() {
  editMode.value = true;
  editedTextComment.value = commentItem.text;
}
async function save() {
  try {
    saving.value = true;
    const newComment = {...commentItem, text: editedTextComment.value};
    const res = await saveCaseComment(newComment);
    emit('update', res);
    editMode.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    editedTextComment.value = "";
    editMode.value = false;
    saving.value = false;
  }
}
function remove() {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: `Вы действительно хотите удалить комментарий?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await deleteCaseComment(commentItem.id!!);
      emit('remove', commentItem);
      $q.notify({ type: 'positive', message: 'Успешно удалено' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
    }
  });
}
</script>

<style scoped>

</style>
