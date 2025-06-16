import {defineStore} from "pinia";
import {PhotoDoc} from "src/features/inspection/store/types";
import {ref} from "vue";
import {PhotoDocSearchRequest} from "src/features/inspection/api/types";

export const usePhotoDocsStore = defineStore('photoDocs', () => {
  const photoDocs = ref<PhotoDoc[]>([])
  const filteredPhotoDocs = ref<PhotoDoc[]>([])
  const search = ref<PhotoDocSearchRequest>()

  const setPhotoDocs = (docs: PhotoDoc[]) => {
    photoDocs.value = docs
  }

  const setSearch = (value?: PhotoDocSearchRequest) => {
    search.value = value
  }

  const insertPhotoDoc = (insert: PhotoDoc) => {
    const index = photoDocs.value.findIndex(doc => doc.id === insert.id)

    if (index !== -1) {
      photoDocs.value[index] = insert
    }
  }

  return {
    photoDocs,
    search,
    setPhotoDocs,
    setSearch,
    insertPhotoDoc,
    filteredPhotoDocs
  }
})
