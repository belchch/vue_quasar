<template>
    <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs active-color="accent">
            <template v-for="item in breadcrumbs" :key="item.to" >
                <q-breadcrumbs-el :label="item.label" :icon="item.icon" :to="item.to" :class=" !item.to && 'text-grey-8'"/>
            </template>        
        </q-breadcrumbs>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNavigate } from 'src/composables/navigate';
import { casePages } from 'src/features/case/constants/case-pages';
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useInspectionsStore } from '../../store/inspection-store';

const { selectedInspection } = storeToRefs(useInspectionsStore())
const { inspectionHomeUrl, caseHomeUrl } = useNavigate()
const { selectedCase } = storeToRefs(useSelectedCaseStore())

const route = useRoute()

type BreadcrumbProps = {
    label?: string,
    icon?: string,
    to?: string
}

const page = computed(() => casePages[route.name as string]!)

const breadcrumbs = computed(() => {
    const result: BreadcrumbProps[] = [{
        //label: `№ ${selectedCase.value!.number!}`,
        icon: 'home',
        to: caseHomeUrl()
    }]

    if (page.value.rootEntity == 'INSPECTION') {
        result.push({
            label: `Кв. ${selectedInspection.value?.apartment}`,
            icon: 'policy',
            to: inspectionHomeUrl(),
        })
    }

    result.push({
        label: page.value.label,
        icon: page.value.icon
    })

    return result
})

</script>