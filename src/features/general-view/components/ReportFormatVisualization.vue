<template>
    <div class="row justify-end q-mr-xl">
        <div>
            <q-card style="display: inline-block;" flat bordered class="q-pa-sm">
            <div>
                <div class="row q-gutter-sm">
                    <q-card class="photo bg-grey-4" flat/>
                    <q-card class="photo bg-grey-4" flat/>
                </div>
            </div>
            <div class="q-pt-sm">
                <div v-if="format == 'DOUBLE_SPOT_ROW'">
                    <div class="row q-gutter-sm">
                        <q-card class="caption double bg-grey-4" flat/>
                        <q-card class="caption double bg-grey-4" flat/>
                    </div>
                </div>
                <div v-if="format == 'SINGLE_SPOT_ROW'">
                    <q-card class="caption bg-grey-4" flat/>
                </div>
            </div>
        </q-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ReportFormat } from '../api/types';

defineProps < {
    format: ReportFormat
} > ()
</script>
<style scoped>
.photo {
    width: 40px;
    height: 50px;
}

.caption {
    height: 10px;
}

.double {
    width: 40px;
}
</style>