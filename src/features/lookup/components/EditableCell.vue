<template>
    <div class="editable-cell" @click="startEditing">
        <span>{{ value }}</span>
        <q-dialog v-model="isEditing">
            <q-card style="min-width: 350px">
                <q-card-section class="q-pt-none2">
                    <q-form class="q-gutter-md" ref="formRef" @submit.prevent="handleSave(editRow)"
                        @keyup.enter.prevent="handleSave(editRow)">
                        <template v-for="(field, index) in editableFields" :key="field.name">
                            <q-select v-if="field.type === 'select'" :id="field.name" v-model="editRow[field.name]"
                                :options="field.options?.map((item) => ({ label: item.name, value: item.id!! }))"
                                :label="field.label" style="min-width: 120px;" map-options dense emit-value outlined />
                            <template v-else-if="field.type === 'select-multiple'">
                                <q-select :id="field.name" v-model="editRow[field.name]"
                                    :options="field.options?.map((item) => ({ label: item.name, value: item.id!! }))"
                                    :label="field.label" style="min-width: 120px;" multiple map-options dense emit-value
                                    outlined />
                                <!-- <q-select :id="field.name" :model-value="editRow[field.name]"
                                    @update:model-value="(newVal) => editRow[field.name].id = field.options?.find(opt => opt.id === newVal.value)"
                                    :options="field.options?.map((item) => ({ label: item.name, value: item.id!! }))"
                                    :label="field.label" style="min-width: 120px;" multiple map-options dense emit-value
                                    outlined /> -->
                            </template>
                            <template v-else-if="field.type === 'checkbox'">
                                <q-checkbox color="secondary" v-model="editRow[field.name]" :label="field.label"
                                    :key="index" :id="field.name" />
                            </template>
                            <q-input v-else v-model="editRow[field.name]" :label="field.label" dense outlined
                                :autofocus="index === 0" :type="field.type" />
                        </template>
                        <div class="row justify-end q-mt-xs">
                            <q-btn label="OK" type="submit" color="primary" flat />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-icon name="edit" class="edit-icon" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Field } from '../base/store/types';

const props = defineProps<{
    value: any,
    row: any,
    editableFields: Field[]
}
>();
const formRef = ref()

const emit = defineEmits(['update']);

const isEditing = ref(false);
const editRow = ref({ ...props.row });

const startEditing = () => {
    // editRow.value = { ...props.row };
    editRow.value = flattenObject(props.row);
    isEditing.value = true;
};

const handleSave = (editRow: any) => {
    emit('update', {
        newValue: editRow,
        onSuccess: () => {
            isEditing.value = false; // Закрываем только при успехе
        }
    });
};

const flattenObject = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && 'id' in value) {
            // Если это объект с ID, заменяем его на ID
            result[key] = value.id;
        } else if (Array.isArray(value)) {
            // Обрабатываем массивы
            result[key] = value.map(item =>
                item && typeof item === 'object' && 'id' in item ? item.id : item
            );
        } else {
            // Простые значения копируем как есть
            result[key] = value;
        }
    }

    return result;
};

</script>

<style scoped>
.edit-icon {
    opacity: 0;
    transition: opacity 0.3s;
    margin: -3px 0 0 10px;
}

.editable-cell {
    height: 100%;
    align-content: center;
    cursor: pointer;
}

.editable-cell:hover .edit-icon {
    opacity: .5;
}
</style>
<style>
textarea {
    /* width: 100% !important; */
    height: 100px !important;
}
</style>