<template>
    <q-card>
        <q-card-section>
            <DownloadReportButton label="Скачать" :disable="false" :api-fn="downloadReport"/>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import DownloadReportButton from 'src/components/DownloadReportButton.vue';
import { ReportApi } from '../api/report-api';
import { useCasesStore } from 'src/features/case/stores/case-store';
import { storeToRefs } from 'pinia';
import { useSelectedCaseService } from 'src/features/case/composables/selected-case';
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store';

const {selectedCase} = storeToRefs(useSelectedCaseStore())

const downloadReport = async () => {
    return (await ReportApi.downloadReport(selectedCase.value!.id!)).data
}
</script>