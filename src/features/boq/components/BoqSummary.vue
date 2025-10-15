<template>
    <div class="row q-col-gutter-sm">
        <div class="col-7">
            <BoqLocations @navigate-location="(location: BoqLocation) => navigateLocation(location.id)" />
            <EstimateTabs />
        </div>
        <div class="col-5">
            <BoqResultItems/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { BoqLocation } from '../api/types';
import { useBoqLocationService } from '../composables/boq-location';

import BoqLocations from './BoqLocations.vue';
import BoqResultItems from './BoqResultItems.vue';
import EstimateTabs from 'src/features/estimate/components/EstimateTabs.vue'

const { navigateLocation } = useBoqLocationService()

</script>
