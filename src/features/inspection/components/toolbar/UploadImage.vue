<template>
  <q-dialog v-model="open">
    <q-uploader :factory="uploadFactory" multiple method="PUT" :send-raw="true" class="img-uploader"
      @uploaded="onUploaded" @factory-failed="onFactoryFailed" thumbnail-fit="contain" />
  </q-dialog>
  <q-btn color="primary" icon="sym_o_upload" @click="onOpenUpload" style="font-variation-settings: 'wght' 400;"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUploadConfig } from 'src/features/inspection/composables/upload-config'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'

const open = ref(false)
const uploadConfig = useUploadConfig()
const selectedInspectionService = useSelectedInspection()

const onOpenUpload = () => {
  open.value = true
}

const onUploaded = async (info: any) => {
  const objectKey = info.files[0].objectKey

  await selectedInspectionService.createPhotoDoc(objectKey)
  await selectedInspectionService.refreshPhotoDocs(true)
}

const onFactoryFailed = (error: any) => {
  console.error('error', error)
}

const getExtension = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.')
  return lastDotIndex === -1 ? '' : filename.substring(lastDotIndex + 1)
}

const uploadFactory = async (files: any) => {
  const file = files[0]
  console.log('length', files.length)
  console.log('file', file)
  const { url, objectKey } = await uploadConfig(getExtension(file.name))
  console.log(objectKey)
  file.objectKey = objectKey

  return {
    url,
  }
}
</script>

<style lang="scss">
.img-uploader {
  max-width: 100% !important;
  width: 800px;

  .q-uploader__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>
