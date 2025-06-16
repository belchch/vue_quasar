<template>
    <q-list bordered class="rounded-borders">
        <q-expansion-item v-for="(group, index) in generalViewGallery" :key="index" :label="group.name || 'Без локации'" default-opened
            header-class="text-primary bg-grey-2" class="grouped-body">
            <q-card flat>
                <q-card-section>
                    <draggable v-model="group.photos" item-key="id" tag="div" 
                        group="photos" @change="onDragChange" @start="drag = true" @end="drag = false"
                        class="q-gutter-md row">
                        <template #item="{ element }">
                            <div class="photo" >
                                <q-img :src="element.url"/>
                            </div>
                        </template>
                    </draggable>
                </q-card-section>
            </q-card>
        </q-expansion-item>
    </q-list>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'
import { useGeneralViewGalleryService } from '../composables/gallery'
import { useGeneralViewGalleryStore } from '../store/general-view-gallery-store'

const {generalViewGallery} = storeToRefs(useGeneralViewGalleryStore())
const {requestGallery, generatePresignedUrlsAndRequestGallery} = useGeneralViewGalleryService()

const drag = ref(false)

const onDragChange = (e: any) => {
    console.log(e)
}

onMounted( async () => {
    await generatePresignedUrlsAndRequestGallery()
})
</script>
<style scoped>
.photo {
    height: 200;
    width: 160px;
}
</style>