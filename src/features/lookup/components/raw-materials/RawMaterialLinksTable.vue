<template>
  <div>
    <div class="text-subtitle1">Ссылки</div>
    <q-dialog v-model="showForm" persistent>
      <q-card style="width: 100%; max-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">Новая ссылка</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form ref="formRef" @submit.prevent="addLink" class="full-width q-mt-sm">
          <q-card-section>
            <q-input
              v-model="newLink"
              :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
              type="textarea"
              autogrow
              label="Ссылка"
              dense
              outlined
            />
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="newPrice"
              :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
              type="number"
              label="Цена"
              dense
              outlined
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Отмена" color="primary" v-close-popup />
            <q-btn flat label="Добавить" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-table :rows="links" :columns="columns" flat wrap-cells separator="cell" bordered>
      <template v-slot:top>
        <div class="row full-width">
          <q-btn color="secondary" icon="add" label="Добавить" @click="onShowForm" size="sm" />
          <q-space />
        </div>
      </template>
      <template #body-cell-actions="props">
        <q-td auto-width style="border-left: 0" class="text-right">
          <q-btn
            class="action-btn"
            size="sm"
            flat
            round
            color="negative"
            icon="delete"
            @click.stop="remove(props.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle"> Удалить </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RawMaterialSources } from '../../raw-material/types'

const links = defineModel<RawMaterialSources[]>('links', { required: true })
const showForm = ref(false)
const newLink = ref('')
const newPrice = ref<number>(0)
const onShowForm = () => {
  newLink.value = ''
  newPrice.value = 0
  showForm.value = true
}
const addLink = () => {
  links.value = [
    ...links.value,
    {
      url: newLink.value,
      price: newPrice.value,
    },
  ]
  showForm.value = false
}

const remove = (row: RawMaterialSources) => {
  links.value = links.value.filter((item) => item !== row)
}

const columns = [
  {
    name: 'url',
    label: 'Ссылка',
    align: 'left' as const,
    field: 'url',
    sortable: true,
  },
  {
    name: 'price',
    label: 'Цена',
    align: 'left' as const,
    field: 'price',
    sortable: true,
  },
  {
    name: 'actions',
    label: '',
    field: 'actions',
  },
]
</script>

<style scoped></style>
