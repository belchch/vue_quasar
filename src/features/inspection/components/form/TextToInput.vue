<template>
    <span v-if="!isEditMode" class="text-weight-medium2 ">{{ modelValue }}</span>
    <q-input v-else outlined :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"
        class="input-slim q-my-xs" dense @focus="(e: Event) => (e.target as
            HTMLInputElement)?.select()" />
</template>

<script setup lang="ts">
defineProps<{
    isEditMode: boolean;
    modelValue: string;
}>()
defineEmits(['update:modelValue'])
</script>

<style scoped></style>