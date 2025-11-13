<template>
    <div class="row q-gutter-md">
        <q-toggle color="secondary" v-model="replacement" :label="replacementLabel" size="sm"/>

        <q-toggle color="secondary" v-model="preservation" :label="preservationLabel" size="sm" :disable="!replacement" />
    </div>
</template>
<script lang="ts" setup>
const replacement = defineModel<boolean>('replacement', { required: true })
const preservation = defineModel<boolean>('preservation', { required: true })

const props =  withDefaults(defineProps<{
  replacementLabel?: string | undefined,
  preservationLabel?: string | undefined
}>(), {
  replacementLabel: 'Замена',
  preservationLabel: 'С сохранением'
})
</script>