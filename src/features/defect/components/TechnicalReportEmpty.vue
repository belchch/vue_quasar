<template>
  <q-card flat>
    <div>
      <q-card-section>
        <div class="text-h6">Техническое заключение</div>
        <div class="text-body2">После создания технического заключения оно будет доступно в разделе «Осмотр».</div>
      </q-card-section>
    </div>
    <q-card-section v-if="hasPermission(['defectReport.update'])">
      <q-btn label="Создать" @click="createDialogOpen = true" color="primary"/>
    </q-card-section>
  </q-card>
  <q-dialog v-model="createDialogOpen">
    <q-card class="q-pa-lg" style="width: 600px; max-width: 80vw">
      <div class="text-h6">Создать технического заключения</div>
      <q-card-section>
        <q-form @submit="onSubmit()" @reset="onReset" class="q-gutter-lg" ref="createForm">
          <q-input
            dense
            outlined
            v-model="technicalReportName"
            lazy-rules
            label="№ Технического заключения"
            :rules="[
              value => !_.isEmpty(value) || 'Обязательное поле'
            ]"
          />

          <div>
            <q-btn label="Сохранить" :loading="creating" type="submit" color="primary" />
            <q-btn label="Отмена" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import {ref} from "vue";
import _ from 'lodash'
import {QForm} from "quasar";
import {useTechnicalReportService} from "src/features/defect/composables/technical-report";
import { useUserStore } from "src/features/user/stores/user-store";

const { createTechnicalReport } = useTechnicalReportService()
const technicalReportName = ref<string>()
const createForm = ref()
const createDialogOpen = ref(false)
const { hasPermission } = useUserStore()
const creating = ref(false)

const onSubmit = async () => {
  creating.value = true
  createForm.value.validate()
  await createTechnicalReport({
    name: technicalReportName.value!!
  })
  creating.value = false
  createDialogOpen.value = false
}

const onReset = () => {
  createForm.value.resetValidation()
  technicalReportName.value = undefined
  createDialogOpen.value = false
}
</script>
