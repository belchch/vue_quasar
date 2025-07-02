<template>
  <q-card>
    <q-card-section>
      <div v-if="hasPermission(['question.create'])">
        <q-editor v-model="text" min-height="5rem" />
        <q-btn label="Добавить" class="q-mt-sm" color="primary" @click="addQuestion" />
      </div>
      <q-list class="q-mt-sm">
        <q-item v-for="question in caseQuestions" :key="question.id!">
          <q-item-section caption v-html="question.text" />
          <q-item-section side v-if="hasPermission(['question.update'])">
            <q-btn icon="delete" flat color="negative" dense @click="deleteQuestion(question.id!)" />
          </q-item-section>
        </q-item>
      </q-list>
      <div
        v-if="caseQuestions.length === 0"
        class="text-h5 text-center text-blue-grey-5 text-weight-light"
      >
        Вопросы отсутствуют
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CaseQuestion } from '../../stores/types';
import { useCasesStore } from '../../stores/case-store';
import { useSelectedCaseStore } from '../../stores/selected-case-store';
import { storeToRefs } from 'pinia';
import { useCaseQuestionService } from '../../composables/case-questions';
import { useCaseQuestionsStore } from '../../stores/case-questions-store';
import { useUserStore } from 'src/features/user/stores/user-store';

const {selectedCase} = storeToRefs(useSelectedCaseStore())
const {requestCaseQuestions, saveCaseQuestion, deleteCaseQuestion} = useCaseQuestionService()
const {caseQuestions} = storeToRefs(useCaseQuestionsStore())
const { hasPermission } = useUserStore()

const text = ref<string>('')

const deleteQuestion = async (id: number) => {
    await deleteCaseQuestion(id)
}

const addQuestion = async () => {
    await saveCaseQuestion({
        text: text.value,
        caseId: selectedCase.value!.id!
    })
}

onMounted(async () => {
    await requestCaseQuestions()
})
</script>
