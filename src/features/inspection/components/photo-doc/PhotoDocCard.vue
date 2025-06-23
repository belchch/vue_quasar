<template>
  <q-card flat bordered class="card">
    <div v-if="photoDoc.urls?.length && photoDoc.urls?.length > 1">
      <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated arrows
        navigation infinite2 class="img">
        <q-carousel-slide v-for="(url, index) in photoDoc.urls" :key="index" :name="index" :img-src="url"
          @click="openLightbox(index)" />

      </q-carousel>
      <q-badge class="img-badge" color="accent" text-color="white">{{
        photoDoc.urls?.length }}</q-badge>
    </div>
    <div v-else>
      <q-img :src="_.first(photoDoc.urls)" class="img" @click="openLightbox()" />

    </div>
    <q-card-section v-if="!collapsed">
      <div class="q-mb-xs q-gutter-md">
        <q-btn-dropdown :label="photoDocTypeDesc(photoDoc.type)" icon="image" size="sm" no-caps color="grey-8" flat
          square>
          <q-list>
            <q-item v-for="item in ['DEFECT', 'GENERAL_VIEW']" :key="item!!" clickable v-close-popup
              @click="() => onSelectType(item as PhotoDocType)">
              <q-item-section>
                <q-item-label>{{ photoDocTypeDesc(item as PhotoDocType) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown :label="displaySpotName(photoDoc)" icon="house" size="sm" no-caps color="grey-8" flat square>
          <q-list>
            <q-item v-for="item in inspectionSpotOptions" :key="item.id!!" clickable v-close-popup
              @click="() => onSelectSpot(item)">
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <DefectInfo v-if="photoDoc.type == 'DEFECT'" :defect-info="photoDoc.defectInfo"
        @changeDefectInfo="onChangeDefectInfo" :photo-doc-id="photoDoc.id!!" />
    </q-card-section>


    <template v-if="!unionStore.isUnionMode">
      <div class="hover-controls absolute-top column">
        <q-btn flat text-color="white" icon="filter" class="union-btn" @click.stop="startUnionMode">
          <q-tooltip>Добавить к фотографии другие фото</q-tooltip>
        </q-btn>
        <q-btn v-if="photoDoc.urls?.length && photoDoc.urls?.length > 1" flat text-color="white" icon="view_cozy"
          class="hover-delete-btn" @click.stop="ungroupPhotoDoc">
          <q-tooltip>Разгруппировать</q-tooltip>
        </q-btn>
        <q-btn flat text-color="white" icon="delete" class="hover-delete-btn" @click.stop="confirmDelete" />
      </div>
    </template>
    <template v-else>
      <div class="hover-controls hover-controls--union-mode absolute-top column">
        <q-btn v-if="unionStore.mainPhotoDoc?.id == photoDoc.id" flat color="white" text-color="white" icon="filter"
          class="union-btn union-btn-active" @click.stop="unionStore.resetUnion">
          <q-tooltip>Сбросить объединение</q-tooltip>
        </q-btn>
        <q-checkbox v-else flat :model-value="unionStore.isSelected(photoDoc)" color="secondary"
          @update:model-value="handleCheckboxChange" class="hover-checkbox" @click.stop />
      </div>
    </template>
  </q-card>
  <q-dialog v-model="showLightbox" full-width full-height maximized backdrop-filter="brightness(40%)">
    <q-card class="lightbox-container" style="background: transparent; box-shadow: none">
      <!-- Для нескольких изображений -->
      <div v-if="photoDoc.urls?.length && photoDoc.urls?.length > 1" class="carousel-wrapper">
        <q-carousel v-model="slide" swipeable animated arrows navigation infinite2 transition-prev="slide-right"
          transition-next="slide-left" class="full-height-carousel" style="background-color: transparent;">
          <q-carousel-slide v-for="(url, index) in photoDoc.urls" :key="index" :name="index" class="full-height-slide">
            <q-img :src="url" fit="contain" class="full-height-img" />
          </q-carousel-slide>
        </q-carousel>

      </div>

      <!-- Для одного изображения -->
      <q-img v-else :src="_.first(photoDoc.urls)" fit="contain" class="single-img" />

      <q-btn icon="close" flat round dense v-close-popup class="dialog-img-close-btn bg-primary text-white" />
    </q-card>
  </q-dialog>
  <!-- <q-dialog v-model="showLightbox" backdrop-filter="brightness(60%)" full-height2 full-width2 maximized2>
    <q-card style="max-width: 100vw; background: transparent; box-shadow: none" class="lightbox-container">
      <q-img :src="_.first(photoDoc.urls)" fit="contain" style="max-height: 90vh; max-width: 100vw">
      </q-img>
      <q-btn icon="close" flat round dense v-close-popup class="dialog-img-colse-btn bg-primary text-white" />
    </q-card>
  </q-dialog> -->
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  type PhotoDoc,
  type PhotoDocDefectInfo,
  type PhotoDocType,
  photoDocTypeDesc,
} from 'src/features/inspection/store/types'
import { Spot } from 'src/features/lookup/spot/stores/types'
import DefectInfo from 'src/features/inspection/components/photo-doc/DefectInfo.vue'
import { useSelectedInspection } from 'src/features/inspection/composables/selected-inspection'
import { usePhotoDocsUnionStore } from '../../store/photo-doc-union-store'
import _ from 'lodash'
import { useQuasar } from 'quasar'
import { useTechnicalReportService } from 'src/features/defect/composables/technical-report'
import { buildInspectionSpotOptions, InspectionSpotOption } from '../../composables/inspection-spot'
import { useInspectionSpotStore } from '../../store/inspection-spot-store'
import { storeToRefs } from 'pinia'

const unionStore = usePhotoDocsUnionStore()
const $q = useQuasar()

const props = defineProps<{
  photoDoc: PhotoDoc
  collapsed: boolean
}>()
const showLightbox = ref(false)
const {inspectionSpots} = storeToRefs(useInspectionSpotStore())
const { requestTechnicalReport } = useTechnicalReportService()
const selectedInspectionService = useSelectedInspection()
const selected = ref([])
const slide = ref(0)
const confirmDelete = () => {
  $q.dialog({
    title: 'Подтвердите удаление',
    message: 'Вы действительно хотите удалить фотографию?',
    cancel: true,
  }).onOk(async () => {
    await deletePhotoDoc()
  })
}

const displaySpotName = (photoDoc: PhotoDoc) => {
  return photoDoc.spotNum ? `${photoDoc.spot?.name} ${photoDoc.spotNum}` : photoDoc.spot?.name
}

const inspectionSpotOptions = computed(() => {
  if (!inspectionSpots.value) {
    return []
  }
  return buildInspectionSpotOptions(inspectionSpots.value)
})

const updatePhotoDoc = async (photoDoc: PhotoDoc) => {
  await selectedInspectionService.updatePhotoDoc(photoDoc)
}

const deletePhotoDoc = async () => {
  await selectedInspectionService.deletePhotoDoc(props.photoDoc.id!!)
}

const ungroupPhotoDoc = async () => {
  await selectedInspectionService.ungroupPhotoDoc(props.photoDoc.id!!)
}

const onSelectSpot = async (option: InspectionSpotOption) => {
  await updatePhotoDoc({
    ...props.photoDoc,
    spot: option.spot,
    spotNum: option.spotNum
  })
}

const onSelectType = async (type: PhotoDocType) => {
  await updatePhotoDoc({
    ...props.photoDoc,
    type,
  })
}

const onChangeDefectInfo = async (defectInfo: PhotoDocDefectInfo) => {
  await updatePhotoDoc({
    ...props.photoDoc,
    defectInfo,
  })
  await requestTechnicalReport()
}

function openLightbox(index = 0) {
  slide.value = index
  showLightbox.value = true
}

const startUnionMode = () => {
  unionStore.setMainPhotoDoc(props.photoDoc)
  unionStore.isUnionMode = true
}

const handleCheckboxChange = () => {
  unionStore.toggleSelect(props.photoDoc)
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  --btn-size: 40px;

  &:has(.union-btn-active) {
    border-color: var(--q-primary) !important;
  }
}

.img {
  cursor: pointer;
  aspect-ratio: 3/3.5;
  border-radius: 4px 4px 0 0;
  height: 100%;
}

.dialog-img-colse-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  translate: 40% -40%;
  cursor: pointer;
}

.img-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  aspect-ratio: 1;
  padding: 8px;
  // border-radius: 4px;
  // width: var(--btn-size);
  // height: var(--btn-size);
  // display: flex;
  // justify-content: center;
  // align-items: center;
}


.hover-controls {
  background: rgba(0, 0, 0, 0.47);
  width: fit-content;
  padding: 4px;
  pointer-events: none;
  border-radius: 0 !important;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  .q-btn {
    aspect-ratio: 1;
    width: var(--btn-size);
  }

  &--union-mode {
    opacity: 1;
    pointer-events: all;
    // background-color: transparent;
  }
}

.card:hover {
  .hover-controls {
    opacity: 1;

    .q-btn {
      pointer-events: all;
    }
  }
}

.hover-checkbox {
  pointer-events: all;
  transition: opacity 0.2s ease-in-out;
}

// .union-btn {
//   opacity: 0;
//   pointer-events: all;
//   transition: opacity 0.2s ease-in-out;
//   // align-self: flex-start;
//   padding: 8px;
//   width: var(--btn-size);
//   height: var(--btn-size);
//   display: block;
//   border-radius: 0;

//   &-active {
//     opacity: 1;
//   }
// }

// .hover-delete-btn {
//   opacity: 0;
//   pointer-events: all;
//   transition: opacity 0.2s ease-in-out;
//   width: var(--btn-size);
//   height: var(--btn-size);
//   border-radius: 0;
//   border-top: 1px solid var(--q-secondary);
// }

.card:hover .union-btn {
  opacity: 1;
}

.card:hover .hover-delete-btn {
  opacity: 1;
}
</style>
<style lang="scss">
.lightbox-container {
  overflow: visible !important;

  .q-img__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: static;
    width: fit-content;
    margin: auto;
    max-height: calc(100vh - 48px);
  }

  .q-img__image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100vh - 48px);
    pointer-events: none;
  }

  .q-img>div:first-child {
    display: none;
  }
}
</style>


<style>
.lightbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* Для карусели */
.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.full-height-carousel {
  height: 100vh;
  width: 100vw;
}

.full-height-slide {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-height-img {
  max-height: 100vh;
  max-width: 100vw;
  width: auto;
  height: auto;
}

/* Для одиночного изображения */
.single-img {
  max-height: 90vh;
  max-width: 100vw;
}

/* Кнопка закрытия */
.dialog-img-close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}

.img-badge {
  /* position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10000; */
}
</style>
