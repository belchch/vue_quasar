<template>
  <div class="q-pa-md">
    <consumer-price-index-dialog :item="editedItem" v-model="openDialog" />
    <q-table
      title="Индекс потребительских цен"
      bordered
      flat
      separator="cell"
      :loading="cpiStore.loading"
      :rows="cpiStore.tableRows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-left>
        <div class="q-pa-sm">
          <span class="q-table__title">Индекс потребительских цен</span>
          <q-btn
            class="q-ml-md"
            @click="handleAdd"
            size="sm"
            icon="add"
            label="Добавить"
            color="primary"
          />
        </div>
      </template>
      <!-- Loading State -->
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <!-- Row Slot -->
      <template v-slot:body-cell="props">
        <q-td :props="props" @click="handleEdit(props.value)">
          <template v-if="props.col.name === 'year'">
            {{ props.value }}
          </template>
          <template v-else>
            <div v-if="props.value">
              <div>{{ props.value.value }}</div>
              <q-badge v-if="props.value.isArchived" color="grey" size="sm" class="q-mt-xs">
                Архивировано
              </q-badge>
            </div>
            <div v-else class="text-grey">—</div>
          </template>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import ConsumerPriceIndexDialog from './ConsumerPriceIndexDialog.vue'
import { ref, onMounted } from 'vue'
import { ConsumerPriceIndexItem } from '../../consumer-price-index/types'
import { useConsumerPriceIndexStore } from '../../consumer-price-index/store'

const cpiStore = useConsumerPriceIndexStore()

const openDialog = ref(false)
const editedItem = ref<ConsumerPriceIndexItem | null>(null)

onMounted(async () => {
  await cpiStore.fetchItems()
})

const handleAdd = () => {
  editedItem.value = null
  openDialog.value = true
}

const handleEdit = (item: ConsumerPriceIndexItem) => {
  editedItem.value = item
  openDialog.value = true
}

const columns = [
  { name: 'year', label: 'Год', field: 'year', sortable: true },
  { name: '1', label: 'янв.', field: '1', sortable: true },
  { name: '2', label: 'февр.', field: '2', sortable: true },
  { name: '3', label: 'март', field: '3', sortable: true },
  { name: '4', label: 'апр.', field: '4', sortable: true },
  { name: '5', label: 'май', field: '5', sortable: true },
  { name: '6', label: 'июнь', field: '6', sortable: true },
  { name: '7', label: 'июль', field: '7', sortable: true },
  { name: '8', label: 'авг.', field: '8', sortable: true },
  { name: '9', label: 'сент.', field: '9', sortable: true },
  { name: '10', label: 'окт.', field: '10', sortable: true },
  { name: '11', label: 'нояб.', field: '11', sortable: true },
  { name: '12', label: 'дек.', field: '12', sortable: true },
]
</script>

<style scoped></style>
