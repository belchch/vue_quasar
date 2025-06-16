<template>
  <q-dialog v-model="open">
    <q-card flat class="content">
      <q-card-section>
        <div class="row">
          <div v-for="photo in photos" :key="photo.id" class="col-4 photo">
            <q-img :src="photo.url">
              <q-checkbox
                color="secondary"
                :model-value="photo.used"
                @update:model-value="(val) => emits('togglePhoto', photo.id, val)"
              />
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-btn icon="image" flat dense color="secondary" @click="open = true">
    <q-badge v-if="more > 0" floating transparent color="accent">{{ more }}</q-badge>
  </q-btn>
</template>
<script setup lang="ts">
import { DefectReportPhotoModel } from 'src/features/defect/stores/defect-report-types'
import { computed, ref } from 'vue'

const props = defineProps<{
  photos: DefectReportPhotoModel[]
}>()

const emits = defineEmits<{
  togglePhoto: [id: number, val: boolean]
}>()

const more = computed(() => props.photos.filter((item) => !item.used).length)
const open = ref<boolean>(false)

</script>
<style scoped>
.content {
  width: 700px;
  overflow-y: auto;
}
.photo {
  cursor: pointer;
  padding: 4px;
}
</style>
