<template>
    <q-card-section class="row card-wrapper" style="border-bottom: 1px solid lightgrey;">

        <div v-if="title" class="col-12 row">
            <q-toolbar-title ellipsis class="q-pb-lg">{{ title }}</q-toolbar-title>
            <slot name="appendTitle"></slot>
        </div>

        <template v-if="template == '8-4'">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <slot name="s1"></slot>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <slot name="s2"></slot>
            </div>
        </template>

        <template v-else-if="template == '4-4-4'">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <slot name="s1"></slot>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <slot name="s2"></slot>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <slot name="s3"></slot>
            </div>
        </template>
        <template v-else-if="template == '6-6'">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <slot name="s1"></slot>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <slot name="s2"></slot>
            </div>
        </template>
    </q-card-section>
</template>
<script setup lang="ts">
defineProps({
    title: String,
    template: String,
})


</script>