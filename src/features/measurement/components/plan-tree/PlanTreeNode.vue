<template>
    <q-item class="full-width">
        <q-item-section>
            <q-item-label caption>{{label}}</q-item-label>
            <q-item-label>
                <PlanTreeNodeName :name="name" :backoff-name="backoffName" />
            </q-item-label>
        </q-item-section>
        <q-item-section avatar @click="emits('edit')">
            <q-btn flat dense round color="primary">
                <q-icon :size="'xs'" name="edit" />
            </q-btn>
        </q-item-section>
    </q-item>
</template>
<script lang="ts" setup>
import PlanTreeNodeName from './PlanTreeNodeName.vue';

const props = defineProps<{
    label: string,
    name?: string | undefined,
    backoffName: string    
}>()

const emits = defineEmits<{
    edit: []
}>()
</script>