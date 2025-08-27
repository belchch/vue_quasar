<template>
    <q-dialog v-model="open">
        <q-card>
            <q-card-section>
                
            </q-card-section>
        </q-card>
    </q-dialog>
    <q-btn label="Дополнительные работы"/>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const open = ref<boolean>(false)
</script>