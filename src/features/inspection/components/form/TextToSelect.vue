<template>
    <span v-if="!isEditMode" class="text-weight-medium2">
        {{ displayValue }}
    </span>
    <q-select v-else :class="classnames" outlined v-model="selectedOption" :options="options" option-label="label"
        option-value="value" emit-value map-options class="input-slim" dense @update:model-value="handleSelection" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
    label: string
    value: any
    [key: string]: any
}

const props = defineProps<{
    isEditMode: boolean
    modelValue: any
    options: Option[]
    classnames?: string
}>()

console.log('props', props)

const emit = defineEmits(['update:modelValue'])

const selectedOption = computed({
    get: () => props.modelValue?.id || null,
    set: (val) => {
        const selected = props.options.find(opt => opt.value === val)
        if (selected) {
            emit('update:modelValue', {
                id: selected.value,
                name: selected.label,
                ...selected
            })
        }
    }
})

const displayValue = computed(() => {
    return props.modelValue?.name || props.modelValue?.label || ''
})

function handleSelection(value: any) {
    const selected = props.options.find(opt => opt.value === value)
    if (selected) {
        // Копируем все поля из выбранного варианта
        const { label, value: val, ...rest } = selected
        emit('update:modelValue', {
            id: val,
            name: label,
            ...rest
        })
    }
}
</script>