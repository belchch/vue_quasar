<template>
    <q-card>
        <q-card-section>
            <q-editor v-model="text" min-height="5rem" />
            <q-btn label="Добавить" class="q-mt-sm" color="primary" @click="addQuestion" />
            <q-list class="q-mt-sm">
                <q-item v-for="question in questions" :key="question.id!">
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
import { ref } from 'vue';
import { CaseQuestion } from '../../stores/types';

const text = ref<string>('')
const id = ref(0)

const questions = ref<CaseQuestion[]>([])

const deleteQuestion = (id: number) => {
    questions.value = questions.value.filter(item => item.id != id)
}

const addQuestion = () => {
    questions.value.push({
        id: id.value++,
        text: text.value
    })

    text.value = ''
}
</script>