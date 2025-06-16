<template>
  <div/>
<!--    <div class="row q-col-gutter-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card flat bordered class="q-mb-md">
                <q-card-section>
                    <div class="text-h6 text-grey-8">Формирование отчета</div>
                    <div class="subtitle text-grey-8">Группировка изображений по разделам</div>
                </q-card-section>
                <q-card-section v-for="(section, index) in sections" :key="index">
                    <q-input v-model="section.title" placeholder="Название раздела" dense borderless
                        class="q-mb-sm text-subtitle1" />
                    <vuedraggable v-model="section.images" group="images" item-key="id"
                        class="q-pa-sm bg-grey-2 grid-style" :max-items="2" @change="updateCaptions(section)">
&lt;!&ndash;                        <template #item="{ element, index: imgIndex }">
                            <div class="image-with-caption">
                                <q-card flat class="cursor-grab">
                                    <InspectionImageCard :id="element.id" />
                                </q-card>
                                <q-input v-model="element.caption" :placeholder="`Фото${imgIndex + 1}`" dense borderless
                                    class="caption-input" />
                            </div>
                        </template>&ndash;&gt;
                    </vuedraggable>
                </q-card-section>
                &lt;!&ndash; Кнопка добавления новой секции &ndash;&gt;
                <div class="text-center q-mt-md q-mb-lg">
                    <q-btn label="Добавить раздел" color="primary" outline @click="addNewSection" />
                </div>
            </q-card>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card flat bordered>
                <q-card-section class="q-pb-none">
                    <div class="text-h6 text-grey-8">Результаты осмотра</div>
                    <div class="subtitle text-grey-8">Доступные изображения</div>
                    <div class="q-pt-md">
                        <ImageFilter />
                    </div>
                </q-card-section>
                <q-card-section>
                    <vuedraggable v-model="sourceImages" group="images" item-key="id" class="q-pa-sm grid-style">
&lt;!&ndash;                        <template #item="{ element }">
                            <q-card flat class="cursor-grab">
                                <InspectionImageCard :id="element.id" />
                            </q-card>
                        </template>&ndash;&gt;
                    </vuedraggable>
                </q-card-section>
            </q-card>
        </div>
    </div>-->
</template>

<script setup lang="ts">
/*import { ref } from 'vue'
import vuedraggable from 'vuedraggable'
import ImageFilter from 'src/features/inspection/components/ImageFilter.vue'
//import InspectionImageCard from '../components/InspectionImageCard.vue'

interface Image {
    id: number
    caption: string
}

interface Section {
    id: number
    title: string
    images: Image[]
}

// Исходные изображения
const sourceImages = ref<Image[]>([
    { id: 1, caption: '' },
    { id: 2, caption: '' },
    { id: 3, caption: '' },
    { id: 4, caption: '' },
    { id: 5, caption: '' },
    { id: 6, caption: '' }
])

// Секции для группировки изображений
const sections = ref<Section[]>([
    { id: 1, title: 'Раздел 1', images: [] },
    { id: 2, title: 'Раздел 2', images: [] }
])


// Добавление новой секции
const addNewSection = () => {
    const newId = Math.max(...sections.value.map(s => s.id), 0) + 1
    sections.value.push({
        id: newId,
        title: `Раздел ${newId}`,
        images: []
    })
}

const updateCaptions = (section: Section) => {
    section.images.forEach((img, index) => {
        // Сохраняем пользовательскую часть после точки
        const userText = img.caption.split('.').slice(1).join('.').trim()
        const newPrefix = `Фото${index + 1}. `

        // Обновляем подпись, сохраняя пользовательский текст
        img.caption = userText ? `${newPrefix}${userText}` : newPrefix
    })
}*/
</script>

<style lang="scss" scoped>
.grid-style {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    min-height: 150px;
}

.image-with-caption {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.caption-input {
    // font-size: 18px;
    margin-top: auto;
}

.drop-here-hint {
    border: 2px dashed #ccc;
    border-radius: 4px;
    grid-column: span 2;
    background-color: red;
    min-height: 100px;
}
</style>
