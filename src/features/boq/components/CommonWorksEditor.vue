<template>
  <q-dialog v-model="open">
    <q-card style="width: 100%;max-width: 800px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Дополнительные работы</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item>
            <q-item-section v-if="works.length == 0" class="text-center">
              Список пуст
            </q-item-section>
          </q-item>
          <q-item v-for="(item, index) in works" :key="index">
            <q-item-section>
              <q-toggle color="primary" @update:model-value="(val) => updateVisible(item, val)"
                :label="`${item.rate.name}`" v-model="item.visible" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Закрыть" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-btn @click="openDialog" outline color="primary" size="sm" label="Доп. работы" class="q-ml-md" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBoqCommonWorkService } from 'src/features/boq/composables/boq-common-work';
import { BoqWork } from '../api/types';
const open = ref<boolean>(false)
const { requestWorks, updateWork } = useBoqCommonWorkService();
const works = ref<BoqWork[]>([]);

onMounted(async () => {
  works.value = await requestWorks();
});

const openDialog = () => {
  open.value = true
};

const updateVisible = async (item: BoqWork, val: boolean) => {
  try {
    await updateWork(item);
  } catch {
    item.visible = !val;
  }
}
</script>
