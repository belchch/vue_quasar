<template>
    <q-card-section >
        <q-form  @submit="handleSave">
            <div class="grid">
                
                <FormInput v-model="localUser.username" label="Email (username)" :hideTitle="true" :required="true"/>
                
                <FormInput class="q-mb-md" v-model="localUser.password" label="Пароль" type="password" :hideTitle="true" :required="true"/>
               
                <FormInput v-model="localUser.lastName" label="Фамилия" :hideTitle="true" :required="true"/>
                
                <FormInput v-model="localUser.firstName" label="Имя" :hideTitle="true" :required="true"/>
                
                <FormInput v-model="localUser.middleName!" :hideTitle="true" label="Отчество" />
               
                <q-select class="q-pt-lg"
                    v-model="localUser.role"
                    :options="[
                            {
                                id: 'ADMIN',
                                name: 'Администратор'
                            },
                            {
                                id: 'USER',
                                name: 'Пользователь'
                            }
                    ]"
                    label="Роль"
                    emit-value
                    map-options
                    option-label="name"
                    option-value="id"
                    dense
                    outlined
                />
               
            </div>
            <div class="row justify-between items-end q-ml-none q-mt-lg">

                <div>
                    <q-btn label="Сохранить" type="submit" color="primary" />
                    <q-btn label="Отмена" @click="resetForm" color="primary" flat class="q-ml-sm" />
                </div>
            </div>
        </q-form>
    </q-card-section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FormInput from 'src/features/inspection/components/form/FormInput.vue'
import { UserCreateRequest } from 'src/features/user/api/types'

const localUser = ref<UserCreateRequest>({
    username: '',
    firstName: '',
    lastName: '',
    middleName: '',
    password: '',
    role: 'USER',
})

const initLocalForm = () => {
    
}
onMounted(() => {
    initLocalForm()
})

const emit = defineEmits(['update:modelValue', 'save', 'reset'])

const handleSave = () => {
    emit('save', localUser.value)
}

const resetForm = () => {
    emit('reset')
    localUser.value = {
        username: '',
        firstName: '',
        lastName: '',
        middleName: '',
        password: '',
        role: 'USER',
    }
}
</script>
<style scoped lang="scss">
.grid {
    display: grid;
    grid-template-columns: 1fr;
    width: 350px;
    max-width: 100%;
}
</style>