<template>
    <q-dialog v-model="model" position="left">
        <q-card class="q-pa-sm" style="width: 400px">
            <q-form @submit="onSubmit" @reset="onReset">
                <q-card-section>
                    <div class="text-h6">Новый осмотр</div>
                </q-card-section>
                <q-card-section>
                    <q-input outlined v-model="apartment" label="Номер квартиры" dense
                        :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Отмена" v-close-popup color="primary" type="reset" />
                    <q-btn flat label="Сохранить" color="primary" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import { useInspections } from 'src/features/inspection/composables/inspection';
import { ref } from 'vue';
import _ from 'lodash'

const { createApartmentInspection } = useInspections()

const model = defineModel<boolean>({ default: false })
const apartment = ref<string>()

const clean = () => {
    apartment.value = undefined
}

const onSubmit = async () => {
    if (apartment.value) {
        await createApartmentInspection(apartment.value)
        clean()
        model.value = false
    }
}

const onReset = () => {
    clean()
}

</script>