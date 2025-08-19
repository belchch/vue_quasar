<template>
    <div class="row q-gutter-md">
        <div v-for="(url, index) in urls" class="photo" :key="index">
            <q-img :src="url" />
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    urls: string[] | undefined
}>()
</script>