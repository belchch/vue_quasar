<template>
    <div class="q-pa-md" style="max-width: 1400px;margin-inline:auto">
        <q-inner-loading :showing="loading">
            <q-spinner size="50px" color="primary" />
        </q-inner-loading>
        <q-table :class="{'is-loading': loading}"
            wrap-cells
            flat bordered
            title="Пользователи"
            :rows="rows"
            :columns="columns"
            row-key="id" v-model:pagination="pagination" hide-pagination no-data-label="Нет данных" :filter="filter"
            separator="cell">
            <template v-slot:top>
                <div class="table-header row items-center full-width">
                    <div class="q-table__title">Пользователи</div>
                    <q-btn color="primary" icon="add"
                        label="Добавить" size="sm" @click="showCreateFrom = true" class="q-ml-md" />
                    <q-space />
                    <q-input outlined dense debounce="300" color="primary" v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
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
                            :editable-fields="formFields" type="user"
                            @update="(newValue) => handleUpdateRow(props.row, newValue)" />
                    </template>
                </q-td>
            </template>


        </q-table>
        <div v-if="pagesNumber > 1" class="row justify-center q-mt-md">
            <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="sm" />
        </div>
    </div>

    <q-dialog v-model="showCreateFrom">
        <q-card class="q-pa-lg">
            <CreateUserForm
                v-model="newUser"
                @save="handleSave"
                @reset="handleReset"
            />
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { UserService } from 'src/features/user/api/user-api'
import EditableCell from 'src/features/lookup/components/EditableCell.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useQuasar } from 'quasar'
import CreateUserForm from 'src/features/admin/components/CreateUserForm.vue'
import { UserCreateRequest, userRoleLabel } from 'src/features/user/api/types'

const $q = useQuasar()

const loading = ref(false)
const rows = ref<any[]>([])
const filter = ref('');
const showCreateFrom = ref(false)
const newUser = ref<UserCreateRequest>()

const columns = [
    {
        name: 'name',
        field: (row: any) => `${row.lastName} ${row.firstName} ${row.middleName || ''}`,
        label: 'Имя',
        editable: true,
        sortable: true,
        align: 'left' as const
    },
    {
        name: 'username',
        field: 'username',
        label: 'Email',
        editable: true,
        sortable: true,
        align: 'left' as const
    },
    {
        name: 'role',
        field: (row: any) => userRoleLabel(row.role),
        label: 'Роль',
        editable: true,
        sortable: true,
        align: 'left' as const,
        style: 'width: 170px'
    },
]

const formFields = computed((): Field[] => [
    {
        name: 'username',
        label: 'Email (username)',
        type: 'text' as const,
        required: true,
    },
    {
        name: 'firstName',
        label: 'Имя',
        type: 'text' as const,
        required: true,
    },
    {
        name: 'lastName',
        label: 'Фамилия',
        type: 'text' as const,
        required: true,
    },
    {
        name: 'middleName',
        label: 'Отчество',
        type: 'text' as const,
    },
    {
        name: 'role',
        label: 'Роль',
        type: 'select' as const,
        options: [
            {
                id: 'ADMIN',
                name: userRoleLabel('ADMIN')
            },
            {
                id: 'BUSINESS_ADMIN',
                name: userRoleLabel('BUSINESS_ADMIN')
            },
            {
                id: 'HEAD',
                name: userRoleLabel('HEAD')
            },
            {
                id: 'MANAGER',
                name: userRoleLabel('MANAGER')
            },
            {
                id: 'EXPERT',
                name: userRoleLabel('EXPERT')
            },
            {
                id: 'INSPECTOR',
                name: userRoleLabel('INSPECTOR')
            }
        ],
        emitValue: true
    },
])

const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 15
})
const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))

onMounted(loadUsers)

async function loadUsers() {
    loading.value = true;
    try {
        const users = await UserService.getAllUsers();
        rows.value = users.data;
    } finally {
        loading.value = false;
    }
}

const handleUpdateRow = async (row: { id: number }, { newValue, onSuccess }: { newValue: any, onSuccess: () => void }) => {
    try {
        await UserService.updateUser(row.id, newValue)
        await loadUsers()
        // editFormRef.value?.close()
        $q.notify({ type: 'positive', message: 'Данные обновлены' })
        onSuccess()
    } catch (error) {
        $q.notify({ type: 'negative', message: 'Ошибка обновления' })
    }
};

const handleSave = async (localUser: any) => {
    if (localUser) {
        newUser.value = localUser
        await UserService.createUser(localUser)
        await loadUsers()
    }
    console.log('handleSave', localUser)
    showCreateFrom.value = false;
}
const handleReset = () => {
    showCreateFrom.value = false
}
</script>
<style scoped >
.is-loading {
    opacity: 0.5
}
</style>
