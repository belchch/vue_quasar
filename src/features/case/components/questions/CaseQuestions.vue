<template>
  <q-card>
    <q-card-section>
      <div class="row justify-end">
        <DownloadReportButton label="Скачать" :disable="false" :api-fn="downloadReport"/>
      </div>
      <div v-if="hasPermission(['question.create'])" class="q-mt-md">
        <q-input v-model="text" min-height="5rem" type="textarea" outlined />
        <q-btn label="Добавить" class="q-mt-sm" color="primary" @click="addQuestion" />
      </div>
      <q-list class="q-mt-sm">
        <q-item v-for="question in caseQuestions" :key="question.id!">
          <q-item-section caption v-html="question.text" />
          <q-item-section side v-if="hasPermission(['question.update'])">
            <q-btn icon="edit" flat color="primary" dense @click="editQuestion(question.id!)" />
          </q-item-section>
          <q-item-section side v-if="hasPermission(['question.update'])">
            <q-btn icon="delete" flat color="negative" dense @click="deleteQuestion(question.id!)" />
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="caseQuestions.length === 0" class="text-h5 text-center text-blue-grey-5 text-weight-light">
        Вопросы отсутствуют
      </div>
    </q-card-section>
    <q-dialog v-model="editDialogOpen">
      <q-card style="width: 700px;">
        <q-card-section>
          <q-input v-model="editQuestionText" type="textarea" outlined />
        </q-card-section>
        <q-card-actions>
          <div>
            <q-btn label="Сохранить" @click="updateQuestion" color="primary" />
            <q-btn label="Отмена" @click="closeEdit" color="primary" flat class="q-ml-sm" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { CaseQuestion } from '../../stores/types';
import { useCasesStore } from '../../stores/case-store';
import { useSelectedCaseStore } from '../../stores/selected-case-store';
import { storeToRefs } from 'pinia';
import { useCaseQuestionService } from '../../composables/case-questions';
import { useCaseQuestionsStore } from '../../stores/case-questions-store';
import { useUserStore } from 'src/features/user/stores/user-store';
import DownloadReportButton from 'src/components/DownloadReportButton.vue';
import { CaseQuestionApi } from '../../api/case-questions-api';

const { selectedCase } = storeToRefs(useSelectedCaseStore())
const { requestCaseQuestions, saveCaseQuestion, deleteCaseQuestion } = useCaseQuestionService()
const { caseQuestions } = storeToRefs(useCaseQuestionsStore())
const { hasPermission } = useUserStore()

const downloadReport = async () => {
  return (await CaseQuestionApi.downloadReport(selectedCase.value!.id!)).data
}

const text = ref<string>('')

const editQuestionId = ref<number>()
const editQuestionText = ref<string>()
const editDialogOpen = ref(false)

const editQuestion = (id: number) => {
  editQuestionId.value = id
  editDialogOpen.value = true
  editQuestionText.value = caseQuestions.value.find(item => item.id == id)?.text
}

const closeEdit = () => {
  editQuestionId.value = undefined
  editQuestionText.value = undefined
  editDialogOpen.value = false
}

const deleteQuestion = async (id: number) => {
  await deleteCaseQuestion(id)
}

const addQuestion = async () => {
  await saveCaseQuestion({
    text: text.value,
    caseId: selectedCase.value!.id!
  })

  text.value = ''
}

const updateQuestion = async () => {
  await saveCaseQuestion({
    id: editQuestionId.value,
    text: editQuestionText.value!,
    caseId: selectedCase.value!.id!
  })
  closeEdit()
}

onMounted(async () => {
  await requestCaseQuestions()
})
</script>
