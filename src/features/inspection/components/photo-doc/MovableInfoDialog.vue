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
            v-model.number="objectForm.height"
            label="Высота"
            :rules="[(val) => val > 0 || 'Высота должна быть больше 0']"
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
import { PhotoDocMovable, PhotoDocMovableInfo, PhotoDoc } from '../../store/types'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'
import { storeToRefs } from 'pinia'

type FormPhotoDocMovable = Omit<
  PhotoDocMovable,
  'id' | 'heightFromFloor' | 'perimeter' | 'area' | 'hasCustomShape'
>
const { updatePhotoDoc } = useSelectedInspection()
const openDialog = defineModel<boolean>({ default: false })

const { photoDoc } = defineProps<{
  photoDoc: PhotoDoc | undefined
}>()

const defaultForm: FormPhotoDocMovable = {
  name: '',
  height: 0,
  width: 0,
  length: 0,
}

const objectForm = ref<FormPhotoDocMovable>({ ...defaultForm })
const saving = ref(false)
const onShowHandler = () => {
  saving.value = false
  if (photoDoc?.movableInfo?.movable) {
    objectForm.value = { ...photoDoc.movableInfo.movable }
  } else {
    objectForm.value = { ...defaultForm }
  }
}
const submitHandler = async () => {
  saving.value = true
  const clone = { ...photoDoc }
  delete clone['defectInfo']
  if (!clone.movableInfo) {
    clone.movableInfo = {
      movable: { ...objectForm.value },
      floodPropertyDamage: undefined,
    }
  } else if (clone.movableInfo?.movable) {
    clone.movableInfo.movable = {
      ...clone.movableInfo.movable,
      ...objectForm.value,
    }
  } else {
    clone.movableInfo['movable'] = { ...objectForm.value }
  }
  try {
    await updatePhotoDoc(clone as PhotoDoc)
    openDialog.value = false
  } finally {
    saving.value = false
  }
}
</script>

<style scoped></style>
