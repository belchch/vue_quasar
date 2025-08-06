<template>
    <div class="row q-col-gutter-lg">
        <div class="col-12">
            <q-card square flat bordered>
                <q-card-section>
                    <q-breadcrumbs active-color="accent">
                        <q-breadcrumbs-el label="Ведомость объемов работ" icon="home" @click="emits('goHome')" to="#" />
                        <q-breadcrumbs-el v-if="secondaryTitle" :label="secondaryTitle" />
                    </q-breadcrumbs>
                </q-card-section>            
            </q-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    secondaryTitle?: string | undefined
}>()

const emits = defineEmits<{
    goHome: []
}>()
</script>