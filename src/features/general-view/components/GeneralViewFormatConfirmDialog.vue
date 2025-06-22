<template>
    <q-dialog v-model="openModel">    
        <q-card class="q-pa-lg" style="width: 600px;">
            <q-card-section>
                <div class="text-h6">Формат отчета</div>
            </q-card-section>
            <q-card-section>
                <div>
                    <div>
                        <q-radio v-model="formatModel" val="SINGLE_SPOT_ROW" label="Одна локация на строку" />
                        <ReportFormatVisualization format="SINGLE_SPOT_ROW"/>            
                    </div>
                    <div>
                        <q-radio v-model="formatModel" val="DOUBLE_SPOT_ROW" label="Две локации на строку" />
                        <ReportFormatVisualization format="DOUBLE_SPOT_ROW"/>       
                    </div>
                </div>
            </q-card-section>
            <q-card-actions>
                <q-btn label="Подтвердить" color="primary" @click="emits('confirm')"/>
                <q-btn label="Отмена" @click="openModel = false" color="primary" flat class="q-ml-sm" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ReportFormat } from '../api/types';
import ReportFormatVisualization from './ReportFormatVisualization.vue';

const emits = defineEmits<{
    confirm: []
}>()

const formatModel = defineModel<ReportFormat>('format', { default: 'SINGLE_SPOT_ROW' })
const openModel = defineModel<boolean>('open', { default: false })
</script>