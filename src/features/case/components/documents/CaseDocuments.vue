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
            <UploadDocumentBtn @add="addDocument" file-type="INSPECTION_REPORT" />
            <q-list bordered class="rounded-borders" separator>
              <q-expansion-item switch-toggle-side expand-separator default-opened icon="o_library_books"
                label="Список файлов" headerClass="text-primary bg-grey-2">
                <q-card>
                  <q-card-section>
                    <TableDocuments :docs="filteredAct" @remove="onRemove"></TableDocuments>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item switch-toggle-side expand-separator default-opened icon="o_library_books"
                label="Просмотр" headerClass="text-primary bg-grey-2">
                <q-card>
                  <q-card-section>
                    <GalleryDocuments :docs="filteredAct" @remove="onRemove"/>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="scheme" class="q-pt-none">
            <UploadDocumentBtn file-type="FLOOR_PLAN" @add="addDocument" />
            <q-list bordered class="rounded-borders" separator>
              <q-expansion-item headerClass="text-primary bg-grey-2" switch-toggle-side expand-separator
                icon="o_library_books" label="Список файлов">
                <q-card>
                  <q-card-section>
                    <TableDocuments :docs="filteredPlan" @remove="onRemove"></TableDocuments>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item switch-toggle-side expand-separator default-opened icon="o_library_books"
                label="Просмотр" headerClass="text-primary bg-grey-2">
                <q-card>
                  <q-card-section>
                    <GalleryDocuments :docs="filteredPlan" @remove="onRemove" />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
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

const { hasPermission } = useUserStore()
const tab = ref('act');
const actDocuments = ref<any[]>([]);

const filteredAct = computed(() => actDocuments.value.filter((item: any) => { return item.fileType =='INSPECTION_REPORT' }));

const filteredPlan = computed(() => actDocuments.value.filter((item: any) => { return item.fileType == 'FLOOR_PLAN' }));
const inspectionStore = useInspectionsStore();

onMounted(async () => {
  try {
    const response = await DocumentsAPI.getDocuments(inspectionStore.selectedInspectionId || 0);
    // const response = await api.get(`/api/documents?inspectionId=${inspectionStore.selectedInspectionId}`);
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

<style lang="scss" scoped>

</style>
