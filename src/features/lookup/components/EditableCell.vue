<template>
    <div class="editable-cell" @click="startEditing">
        <span>{{ value }}</span>
        <q-dialog v-model="isEditing">
            <q-card style="min-width: 350px" :class="{ 'user-form': type === 'user'}">
                <q-card-section class="q-pt-none2">
                    <q-form class="q-gutter-md" ref="formRef" @submit.prevent="handleSave(editRow)"
                        @keyup.enter.prevent="handleSave(editRow)">
                        <template v-for="(field, index) in editableFields" :key="field.name">
                            <q-select v-if="field.type === 'select'" :id="field.name"
                                :model-value="editRow[field.name]"
                                @update:model-value="(newVal) => editRow[field.name] = newVal"
                                :options="field.options"
                                option-value="id" 
                                option-label="name" 
                                :label="field.label" 
                                style="min-width: 120px;"
                                :map-options="true" dense :emit-value="field.emitValue" outlined />
                            <q-select v-else-if="field.type === 'select-multiple'"
                                :model-value="editRow[field.name]"
                                @update:model-value="(newVal) => editRow[field.name] = newVal"
                                :options="field.options"
                                option-value="id"
                                option-label="name"
                                :label="field.label"
                                style="min-width: 120px;"
                                multiple
                                map-options
                                dense
                                outlined 
                            />
                            <template v-else-if="field.type === 'checkbox'">
                                <q-checkbox color="secondary" v-model="editRow[field.name]" :label="field.label"
                                    :key="index" :id="field.name" />
                            </template>
                            <q-input v-else-if="field.type == 'decimal'" v-model="editRow[field.name]" :label="field.label" dense outlined
                                :autofocus="index === 0" mask="#.##" fill-mask="0" reverse-fill-mask/>
                            <q-input v-else v-model="editRow[field.name]" :label="field.label" dense outlined
                                :autofocus="index === 0" :type="field.type" />
                        </template>
                        <div v-if="type === 'user'" class="row q-mt-lg">
                            <q-btn label="Сохранить" type="submit" color="primary" flat2 />
                            <q-btn label="Отмена" type="reset" @click="isEditing = false" color="primary" flat  class="q-ml-sm" />
                        </div>
                        <div v-else class="row justify-end q-mt-xs">
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
    type?: string
}
>();
const formRef = ref()

const emit = defineEmits(['update']);

const isEditing = ref(false);
const editRow = ref({ ...props.row });

const startEditing = () => {
    editRow.value = { ...props.row };
    // editRow.value = flattenObject(props.row);
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
.user-form {
    padding: 24px;
    width: 430px;
    form {
        label {
            margin-bottom: 20px;
        }
    }
}
</style>
<style>
textarea {
    /* width: 100% !important; */
    height: 100px !important;
}
</style>