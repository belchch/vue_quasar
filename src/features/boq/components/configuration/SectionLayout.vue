<template>
    <div class="q-mt-md q-ml-md">
            <q-btn color="secondary" size="sm" @click="emits('addSection')">
                Добавить секцию
            </q-btn>
        </div>
        <q-card-section v-for="(section, index) in sections" :key="section.id">
            <q-separator />
            <div class="text-caption q-ma-sm text-accent">Секция {{ index + 1 }}</div>
            <div class="row q-pl-md q-gutter-xl">
                <slot :section="section"></slot>
                <div class="absolute-top-right q-mr-md" v-if="index > 0">
                    <q-btn icon="delete" color="secondary" flat size="md" @click="emits('removeSection', section.id)" />
                </div>
            </div>
        </q-card-section>
</template>
<script lang="ts" setup>
defineProps<{
    sections: {
        id: number,
        [key: string]: any
    }[]
}>()

const emits = defineEmits<{
    removeSection: [id: number]
    addSection: []
}>()
</script>