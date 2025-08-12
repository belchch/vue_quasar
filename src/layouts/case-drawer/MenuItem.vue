<template>
    <div class="text-grey-8">
        <q-item clickable v-ripple :to="to" active-class="text-primary">
            <q-item-section avatar>
                <q-icon :name="page.icon" />
            </q-item-section>
            <q-item-section class="text-subtitle2">
                {{ page.label }}
            </q-item-section>
        </q-item>
    </div>    
</template>
<script setup lang="ts">
import { useNavigate } from 'src/composables/navigate';
import { casePages } from 'src/features/case/constants/case-pages';
import { computed } from 'vue';

const { caseUrl, inspectionUrl } = useNavigate()

const props = defineProps<{
    pageName: string
}>()

const page = computed(() => casePages[props.pageName]!)

const to = computed(() => {
    switch (page.value.rootEntity) {
        case 'CASE': return caseUrl(page.value.segment)
        case 'INSPECTION': return inspectionUrl(page.value.segment)
        default: return ''
    }
})
</script>