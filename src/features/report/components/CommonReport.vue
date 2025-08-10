<template>
    <q-card>
        <q-card-section>
            <DownloadReportButton label="Скачать" :disable="false" :api-fn="downloadReport"/>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import DownloadReportButton from 'src/components/DownloadReportButton.vue';
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store';
import { ReportApi } from '../api/report-api';
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';

const { selectedInspectionId } = storeToRefs(useInspectionsStore())

const downloadReport = async () => {
    return (await ReportApi.downloadReport(selectedInspectionId.value!)).data
}
</script>