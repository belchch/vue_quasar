<template>
  <div>
    <h5 class="q-mb-sm q-mt-md text-weight-light">Комментарии</h5>
    <div class="q-gutter-md column">
      <template v-for="(comment) in comments" :key="comment.id">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeIn">
          <CaseCommentItem :comment-item="comment" @update="updateCommentById($event)"
            @remove="deleteComment($event)" />
        </transition>
      </template>
      <!-- <q-separator /> -->
      <div>
        <div class="row column q-gutter-md">
          <q-editor v-model="textComment" min-height="5rem" />
          <div class="col-auto text-right">
            <q-btn @click="addComment" color="primary">Добавить</q-btn>
          </div>

        </div>
      </div>


      <q-card flat bordered v-if="false">
        <q-card-section>
          <q-editor v-model="textComment" min-height="5rem" />
          {{ textComment }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="addComment" color="primary">Добавить</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import CaseCommentItem from './CaseCommentItem.vue'
import { useCaseCommentService } from "../../composables/case-comments";
import { CaseComment } from "../../stores/types";

const textComment = ref('');
const comments = ref<CaseComment[]>([]);

const { requestCaseComments, addCaseComment } = useCaseCommentService();

onMounted(async() => {
  const res = await requestCaseComments();
  comments.value = res;
});

const addComment = async()=> {
  const comment:CaseComment = await addCaseComment(textComment.value);
  comments.value.push(comment);
  textComment.value = '';
}

function updateCommentById(newComment: CaseComment) {
  const index = comments.value.findIndex(c => c.id === newComment.id);
  if (index !== -1) {
    comments.value[index] = newComment;
  }
}
function deleteComment(removedItem: CaseComment) {
  comments.value = comments.value.filter(
    (item) => item.id !== removedItem.id
  );
}

</script>

<style scoped>

</style>
