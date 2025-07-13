<template>
  <q-card class="q-pa-md">
    <div class="row no-wrap">
      <q-tabs vertical v-model="tab" no-caps active-color="primary">
        <q-tab label="Акт осмотра" name="act" class="justify-between" />
        <q-tab label="Схемы объекта" name="scheme" class="justify-between" />
      </q-tabs>
      <div style="width: 100%">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="act" class="q-pt-none">
            <div class="row justify-between q-pb-lg">
              <UploadDocumentBtn v-if="hasPermission(['document.update'])" @add="addDocument"
                file-type="INSPECTION_REPORT" />
              <DisplayModeBtn v-model="displayMode" />
              <DownloadReportButton label="Скачать отчет" :disable="false" :api-fn="downloadReport" />
            </div>
            <TableDocuments v-if="displayMode=='table'" :docs="filteredAct" @remove="onRemove"></TableDocuments>
            <GalleryDocuments v-else :docs="filteredAct" @remove="onRemove" />
          </q-tab-panel>
          <q-tab-panel name="scheme" class="q-pt-none">
            <div class="row justify-between q-pb-lg">
              <UploadDocumentBtn v-if="hasPermission(['document.update'])" file-type="FLOOR_PLAN" @add="addDocument" />
              <DisplayModeBtn v-model="displayMode" />
              <DownloadReportButton label="Скачать отчет" :disable="false" :api-fn="downloadReport" />
            </div>
            <TableDocuments v-if="displayMode == 'table'" :docs="filteredPlan" @remove="onRemove"></TableDocuments>
            <GalleryDocuments v-else :docs="filteredPlan" @remove="onRemove" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInspectionsStore } from "src/features/inspection/store/inspection-store";
import { DocumentsAPI } from './documents-api';
import { useUserStore } from "src/features/user/stores/user-store";

import UploadDocumentBtn from './UploadDocumentBtn.vue';
import TableDocuments from "./TableDocuments.vue";
import GalleryDocuments from './GalleryDocuments.vue';
import DownloadReportButton from 'src/components/DownloadReportButton.vue';
import DisplayModeBtn from './DisplayModeBtn.vue'

const { hasPermission } = useUserStore()
const tab = ref('act');
const actDocuments = ref<any[]>([]);
const displayMode = ref('gallery');

const filteredAct = computed(() => actDocuments.value.filter((item: any) => { return item.fileType == 'INSPECTION_REPORT' }));

const filteredPlan = computed(() => actDocuments.value.filter((item: any) => { return item.fileType == 'FLOOR_PLAN' }));
const inspectionStore = useInspectionsStore();

const downloadReport = async () => {
  return (await DocumentsAPI.downloadReport(inspectionStore.selectedInspectionId!)).data
}

onMounted(async () => {
  try {
    const response = await DocumentsAPI.getDocuments(inspectionStore.selectedInspectionId || 0);
    actDocuments.value = response.data;
  } catch (error) {
    console.log(error);
  }
})

const addDocument = (item: any) => {
  actDocuments.value.push(item);
}

const onRemove = (id: number) => {
  actDocuments.value = actDocuments.value.filter((item: any) => item.id !== id);
}
</script>

<style lang="scss" scoped></style>
