<template>
  <div/>
<!--    <div class="row q-col-gutter-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card flat bordered>
                <q-card-section>
                    <div class="text-h6 text-grey-8">Формирование отчета</div>
                    <div class="subtitle text-grey-8">Подзаголочный текст</div>
                </q-card-section>
                <q-card-section>
                    <vuedraggable v-model="targetImages" group="images" item-key="id"
                        class="q-pa-md bg-grey-3 grid_style">
&lt;!&ndash;                        <template #item="{ element }">
                            <q-card class="cursor-grab q-ma-sm" flat>
                                <IsnpecionImageCard :id="element.id" type="text" />
                            </q-card>
                        </template>&ndash;&gt;
                    </vuedraggable>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card flat bordered>
                <q-card-section class="q-pb-none">
                    <div class="text-h6 text-grey-8">Результаты осмотра</div>
                    <div class="subtitle text-grey-8">Подзаголочный текст</div>
                    <div class="q-pt-md">
                        <ImageFilter />
                    </div>

                </q-card-section>
                <q-card-section>
                    <vuedraggable v-model="sourceImages" group="images" item-key="id"
                        class="q-pa-md bg-grey-1 grid_style">
&lt;!&ndash;                        <template #item="{ element }">
                            <q-card class="cursor-grab q-ma-sm">
                                <IsnpecionImageCard :id="element.id" />
                            </q-card>
                        </template>&ndash;&gt;
                    </vuedraggable>
                </q-card-section>
            </q-card>
        </div>
    </div>-->
</template>

<script setup lang="ts">
/*
import ImageFilter from 'src/features/inspection/components/ImageFilter.vue'
//import IsnpecionImageCard from '../components/InspectionImageCard.vue';
import { ref } from 'vue'
import vuedraggable from 'vuedraggable'

interface Image {
    id: number
}

const sourceImages = ref<Image[]>([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
])

const targetImages = ref<Image[]>([])

*/

</script>

<style lang="scss" scoped>
.grid_style {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    align-items: flex-start;
}
</style>
