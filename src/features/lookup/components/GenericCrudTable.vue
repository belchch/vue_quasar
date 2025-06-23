<template>
    <div class="q-pa-md">
        <q-inner-loading :showing="loading">
            <q-spinner size="50px" color="primary" />
        </q-inner-loading>
        <div v-if="visibleColumns.length > 0" class="q-mb-md">
            <template v-for="(column, index) in processedColumns" :key="index">
                <q-toggle v-if="column.name != 'actions'" :key="column.name" v-model="localVisibleColumns"
                    :val="column.name" :label="column.label" />
            </template>

        </div>
        <q-table v-if="!loading" 
            wrap-cells 
            flat 
            bordered 
            :title="title" 
            :rows="rows" 
            :columns="processedColumns"
            row-key="id" 
            v-model:pagination="pagination" 
            hide-pagination 
            no-data-label="Нет данных" 
            :filter="filter"
            separator="cell" 
            :visible-columns="localVisibleColumns">
            <template v-slot:top>
                <div class="table-header row items-center full-width">
                    <div class="q-table__title">{{ title }}</div>
                    <q-btn :color="showForm ? 'secondary' : 'primary'" :icon="showForm ? 'close' : 'add'"
                        :label="showForm ? 'Скрыть' : addButtonLabel" @click="showForm = !showForm" size="sm" />
                    <q-space />
                    <q-input outlined dense debounce="300" color="primary" v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>

                <template v-if="showForm">
                    <AddForm ref="addFormRef" :fields="formFields" @submit="handleAdd" @cancel="showForm = false"
                        :class="addForm.classname" />
                </template>
            </template>

            <template v-slot:body-cell="props">
                <q-td :props="props" :key="props.col.name">
                    <template v-if="!props.col.editable">
                        {{ props.value }}
                    </template>
                    <template v-else-if="props.col.classes === 'view-checkbox'">
                        <q-checkbox v-if="props.value" v-model="props.value" readonly color="secondary" />
                    </template>
                    <template v-else>
                        <EditableCell ref="editFormRef" :value="props.value" :row="props.row" @close="() => { }"
                            :editable-fields="formFields" @update22="() => console.log('update22')"
                            @update="(newValue) => handleUpdateRow(props.row, newValue)" />
                    </template>
                </q-td>
            </template>

            <template v-slot:header-cell-actions>
                <q-th style="width: 82px;border-left: 0"></q-th>
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td style="border-left: 0">
                    <q-btn class="action-btn" size="sm" flat round color="negative" icon="delete"
                        @click.stop="confirmDelete(props.row)" />
                </q-td>
            </template>
        </q-table>
        <div v-if="pagesNumber > 1" class="row justify-center q-mt-md">
            <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="md" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, PropType, watch } from 'vue'
import { useQuasar } from 'quasar'
import AddForm from './AddForm.vue'
import EditableCell from './EditableCell.vue'
import { Field } from '../base/store/types'

interface TableColumn {
    name: string
    label: string
    field: string | ((row: any) => any)
    required?: boolean
    align?: 'left' | 'center' | 'right'
    sortable?: boolean
    sort?: (a: any, b: any, rowA: any, rowB: any) => number
    format?: (val: any, row: any) => any
    style?: string | ((row: any) => string)
    classes?: string | ((row: any) => string)
    headerStyle?: string
    headerClasses?: string
    editable?: boolean
    type?: string
}
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    columns: {
        type: Array as PropType<TableColumn[]>,
        required: true,
        validator: (cols: TableColumn[]) => cols.every(c => 'name' in c && 'label' in c)
    },
    visibleColumns: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    items: {
        type: Array,
        required: true
    },
    formFields: {
        type: Array as PropType<Field[]>,
        required: true
    },
    store: {
        type: Object,
        required: true
    },
    addButtonLabel: {
        type: String,
        default: 'Добавить'
    },
    autoLoad: {
        type: Boolean,
        default: true
    },
    addForm: {
        type: Object,
        default: () => ({})
    }

});

const loading = ref(false);
const rows = ref<any[]>([]);

// Автоматическая загрузка при изменении store
watchEffect(async () => {
    if (props.autoLoad && props.store) {
        loading.value = true;
        try {
            await props.store.requestLookup();
            rows.value = [...props.store.items];
        } finally {
            loading.value = false;
        }
    }
});

const emit = defineEmits(['add', 'update', 'delete']);

const $q = useQuasar();
const filter = ref('');
const showForm = ref(false);

const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 15
    // rowsNumber: xx if getting data from a server
})
const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))

const processedColumns = computed<TableColumn[]>(() => [
    ...props.columns.map(col => ({
        name: col.name,
        label: col.label,
        field: col.field || col.name, // Если field не указан, используем name
        align: col.align || 'left',
        sortable: col.sortable !== false,
        // Добавляем остальные обязательные поля с дефолтными значениями
        required: col.required || false,
        format: col.format || ((val: any) => val),
        style: col.style || '',
        classes: col.classes || '',
        headerStyle: col.headerStyle || '',
        headerClasses: col.headerClasses || '',
        editable: col.editable || true,
    })),
    {
        name: 'actions',
        label: '',
        field: 'actions',
        align: 'right',
        sortable: false,
        required: false
    }
])
const localVisibleColumns = ref(
    props.visibleColumns.length > 0 ? props.visibleColumns : processedColumns.value.map((col) => col.name)
)
// const localVisibleColumns = ref(() => {
//     return props.visibleColumns.length > 0 ? props.visibleColumns : processedColumns.value.map((col) => col.name)
// })
watch(
    () => props.store.items,
    (newItems) => {
        rows.value = [...newItems]
    },
    { deep: true }
)
const addFormRef = ref()
const editFormRef = ref()
const handleAdd = async (formData: Record<string, any>) => {
    console.log('formData', formData);
    try {
        await props.store.addItem(formData);
        showForm.value = false;
        addFormRef.value?.resetForm()
        $q.notify({ type: 'positive', message: 'Успешно добавлено' });
    } catch (error) {
        $q.notify({ type: 'negative', message: 'Ошибка при добавлении' });
    }
};

const handleUpdateRow = async (row: { id: number }, { newValue, onSuccess }: { newValue: any, onSuccess: () => void }) => {
    try {
        await props.store.updateItem(row.id, newValue);
        // editFormRef.value?.close()
        $q.notify({ type: 'positive', message: 'Данные обновлены' });
        onSuccess()
    } catch (error) {
        $q.notify({ type: 'negative', message: 'Ошибка обновления' });
    }
};

const confirmDelete = (row: { id: number, name: string }) => {
    $q.dialog({
        title: 'Подтвердите удаление',
        message: `Вы действительно хотите удалить ${row.name}?`,
        cancel: true,
    }).onOk(async () => {
        try {
            await props.store.deleteItem(row.id);
            $q.notify({ type: 'positive', message: 'Успешно удалено' });
        } catch (error) {
            $q.notify({ type: 'negative', message: 'Ошибка при удалении' });
        }
    });
};
</script>
<style scoped lang="scss">
.content {
    padding-left: 300px;
}

.left-menu {
    width: 300px;
    transform: translateX(0px);
    top: 81px;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    color: #697a8d !important;
}

.navigation-item {
    border-radius: 5px;
    min-height: 44px !important;

}

.table-header {
    gap: 40px;
}

.action-btn {
    opacity: 0;
    transition: .25s ease-in-out;
}

.q-table tr:hover .action-btn {
    opacity: 1;
}

/* Ограничение максимальной ширины ячеек */
.q-table td {
    max-width: 400px !important;
    /* Или любое другое значение */
    //white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Показывать полный текст при наведении */
.hoverable:hover {
    white-space: normal;
    overflow: visible;
    position: relative;
    z-index: 100;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
<style>
.popup-edit {
    width: 300px !important;
    min-width: 0 !important;
}
</style>