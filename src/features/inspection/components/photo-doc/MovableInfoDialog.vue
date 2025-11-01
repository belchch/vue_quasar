<template>
  <q-dialog v-model="openDialog" @show="onShowHandler">
    <q-card style="width: 100%; max-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">Редактирование</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-form @submit.prevent="submitHandler">
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            dense
            v-model="objectForm.name"
            label="Наименование"
            :rules="[(val) => !!val || 'Наименование обязательно для заполнения']"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            type="number"
            outlined
            dense
            v-model.number="objectForm.width"
            label="Ширина"
            :rules="[(val) => val > 0 || 'Ширина должна быть больше 0']"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            type="number"
            outlined
            dense
            v-model.number="objectForm.length"
            label="Длина"
            :rules="[(val) => val > 0 || 'Длина должна быть больше 0']"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            type="number"
            outlined
            dense
            v-model.number="objectForm.height"
            label="Высота"
            :rules="[(val) => val > 0 || 'Высота должна быть больше 0']"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Сохранить" color="primary" type="submit" :loading="saving" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PhotoDocMovable, PhotoDocMovableInfo } from '../../store/types'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'

const { updatePhotoDocMovableInfo } = useSelectedInspection()
const openDialog = defineModel<boolean>({ default: false })

const { photoDocId, movableInfo } = defineProps<{
  photoDocId: number
  movableInfo: PhotoDocMovableInfo | undefined
}>()

const defaultForm: PhotoDocMovable = {
  name: '',
  height: 0,
  width: 0,
  length: 0,
}

const objectForm = ref<PhotoDocMovable>({ ...defaultForm })
const saving = ref(false)
const onShowHandler = () => {
  saving.value = false
  if (movableInfo?.movable) {
    objectForm.value = { ...movableInfo.movable }
  } else {
    objectForm.value = { ...defaultForm }
  }
}
const submitHandler = async () => {
  saving.value = true
  try {
    await updatePhotoDocMovableInfo(photoDocId, {
      ...movableInfo,
      movable: objectForm.value,
      floodPropertyDamage: movableInfo?.floodPropertyDamage,
    })
    openDialog.value = false
  } finally {
    saving.value = false
  }
}
</script>

<style scoped></style>
