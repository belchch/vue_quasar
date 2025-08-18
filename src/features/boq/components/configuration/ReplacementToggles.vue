<template>
    <div class="row q-gutter-md">
        <q-toggle color="secondary" v-model="replacement" label="Замена" size="sm"/>

        <q-toggle color="secondary" v-model="preservation" label="С сохранением" size="sm" :disable="!replacement" />
    </div>
</template>
<script lang="ts" setup>
const replacement = defineModel<boolean>('replacement', { required: true })
const preservation = defineModel<boolean>('preservation', { required: true })

</script>