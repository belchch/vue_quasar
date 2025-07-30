<template>
    <span>
        <span v-if="name">{{ name }} <q-icon name="check" color="positive" size="xs"/> </span>
        <span v-else>{{ backoffName }} <q-icon name="warning" color="warning" size="xs"/></span>
    </span>
</template>
<script setup lang="ts">
const props = defineProps<{
    name?: string | undefined,
    backoffName: string
}>()
</script>