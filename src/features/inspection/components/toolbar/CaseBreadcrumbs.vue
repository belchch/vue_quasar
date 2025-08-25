<template>
    <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs active-color="primary">
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
import { BreadcrumbProps } from 'src/features/navigation/stores/types';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useInspectionsStore } from '../../store/inspection-store';
import { usePageBreadcrumbsStore } from 'src/features/navigation/stores/page-breadcumbs-store';

const { selectedInspection } = storeToRefs(useInspectionsStore())
const { inspectionHomeUrl, caseHomeUrl, inspectionUrl, caseUrl } = useNavigate()
const { pageBreadcrumbs } = storeToRefs(usePageBreadcrumbsStore())

const route = useRoute()

const page = computed(() => casePages[route.name as string]!)

const parentUrl = () => {
    if (!page.value.parent) {
        return undefined
    }
    
    const parentPage = casePages[page.value.parent]

    switch(page.value.rootEntity) {    
        case 'CASE': return caseUrl(parentPage!.segment)
        case 'INSPECTION': return inspectionUrl(parentPage!.segment)

    }
}

const breadcrumbs = computed(() => {
    const result: BreadcrumbProps[] = [{        
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
        icon: page.value.icon,
        to: pageBreadcrumbs.value.length ? parentUrl() : undefined
    })

    result.push(...pageBreadcrumbs.value)

    return result
})

</script>