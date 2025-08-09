<template>
    <div class="text-grey-8">
        <q-item clickable v-ripple :to="name" active-class="text-primary">
            <q-item-section avatar>
                <q-icon :name="icon" />
            </q-item-section>
            <q-item-section class="text-subtitle2">
                {{ label }}
            </q-item-section>
        </q-item>
    </div>    
</template>
<script setup lang="ts">

const props = defineProps<{
    name: string,
    label: string,
    icon?: string
}>()
</script>