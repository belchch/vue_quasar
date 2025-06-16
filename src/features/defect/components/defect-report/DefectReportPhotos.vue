<template>
  <q-card flat>
    <div class="row justify-end">
      <DefectReportPhotosPicker :photos="photosLocal" @togglePhoto="togglePhoto"/>
    </div>
    <div class="row q-gutter-sm justify-center">
      <div v-for="(url, index) in showUrls" :key="index" :class="`col-5`">
        <q-img :src="url" />
      </div>
      <div></div>
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { DefectReportPhotoModel } from 'src/features/defect/stores/defect-report-types'
import DefectReportPhotosPicker from 'src/features/defect/components/defect-report/DefectReportPhotosPicker.vue'
import { useDefectReportService } from 'src/features/defect/composables/defect-report-service'

const { usePhoto } = useDefectReportService()

const props = defineProps<{
  photos: DefectReportPhotoModel[]
}>()

const photosLocal = ref(props.photos)

const togglePhoto = async (id: number, use: boolean) => {
  photosLocal.value = await usePhoto(id, use, 2)
}

const showUrls = computed(() => photosLocal.value.filter((item) => item.used).map((item) => item.url))
</script>
<style scoped></style>
