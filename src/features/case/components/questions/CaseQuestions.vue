<template>
    <q-card>
        <q-card-section>
            <q-editor v-model="text" min-height="5rem" />
            <q-btn label="Добавить" class="q-mt-sm" color="primary" @click="addQuestion" />
            <q-list class="q-mt-sm">
                <q-item v-for="question in caseQuestions" :key="question.id!">
                    <q-item-section caption v-html="question.text" />
                    <q-item-section side>
                        <q-btn icon="delete" flat color="negative" dense @click="deleteQuestion(question.id!)"/>
                    </q-item-section>
                </q-item>
            </q-list>
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

const {selectedCase} = storeToRefs(useSelectedCaseStore())
const {requestCaseQuestions, saveCaseQuestion, deleteCaseQuestion} = useCaseQuestionService()
const {caseQuestions} = storeToRefs(useCaseQuestionsStore())

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