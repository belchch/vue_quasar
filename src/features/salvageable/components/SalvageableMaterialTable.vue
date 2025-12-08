<template>
  <div class="q-pa-md">
    <cpi-select-dialog
      v-model="openCpiDialog"
      :item="salvageableMaterialsObject?.consumerPriceIndex || null"
    />
    <salvageable-material-dialog :item="rowClicked" v-model="editRowDialog" />
    <q-table
      :title="title"
      :rows="showUsed ? usedSalvageableMaterials : unUsedSalvageableMaterials"
      :columns="columns"
      wrap-cells
      separator="cell"
      row-key="name"
      @row-click="onRowClick"
    >
      <template v-slot:top-left>
        <div class="q-table__title">{{ title }}</div>
        <q-btn v-if="showUsed" size="sm" color="primary" class="q-ml-md" @click="create"
          >Сформировать</q-btn
        >
      </template>
      <template v-slot:top-right v-if="showUsed">
        <div @click="openCpiDialog = true" style="position: relative; cursor: pointer">
          Текущий ИПЦ:
          <span class="text-h5">{{
            salvageableMaterialsObject?.consumerPriceIndex.value || '-'
          }}</span>
          <q-icon name="edit" class="edit-icon" />
        </div>
      </template>
      <template v-slot:body-cell-count="props">
        <q-td :props="props" key="props.col.name">
          {{ props.value }}
          <q-icon v-if="showUsed" name="edit" class="edit-icon" />
        </q-td>
      </template>
      <template v-slot:body-cell-physicalWear="props">
        <q-td :props="props" key="props.col.name">
          {{ props.value }}
          <q-icon v-if="showUsed" name="edit" class="edit-icon" />
        </q-td>
      </template>
      <template v-slot:body-cell-functionalWear="props">
        <q-td :props="props" key="props.col.name">
          {{ props.value }}
          <q-icon v-if="showUsed" name="edit" class="edit-icon" />
        </q-td>
      </template>
      <template v-slot:body-cell-externalWear="props">
        <q-td :props="props" key="props.col.name">
          {{ props.value }}
          <q-icon v-if="showUsed" name="edit" class="edit-icon" />
        </q-td>
      </template>
      <template v-slot:body-cell-accumulatedWear="props">
        <q-td :props="props" key="props.col.name">
          {{ props.value }}
          <q-icon v-if="showUsed" name="edit" class="edit-icon" />
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td style="border-left: 0">
          <q-btn
            v-if="showUsed"
            class="action-btn"
            size="sm"
            flat
            round
            color="negative"
            icon="delete"
            @click.stop="showConfirm(props.row)"
          />
          <q-btn
            v-else
            class="action-btn"
            size="sm"
            flat
            round
            color="primary"
            icon="settings_backup_restore"
            @click.stop="showConfirm(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { QTableColumn } from 'quasar'
import { SalvageableMaterialType } from 'src/features/salvageable/types'
import { useSalvageableService } from 'src/features/salvageable/service'
import { useSalvageableMaterialStore } from 'src/features/salvageable/store'
import { uomDescription } from 'src/features/rate/stores/types'
import CpiSelectDialog from './CpiSelectDialog.vue'
import { useQuasar } from 'quasar'
import SalvageableMaterialDialog from './SalvageableMaterialDialog.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const $q = useQuasar()
const salvageableService = useSalvageableService()
const {
  salvageableMaterials,
  usedSalvageableMaterials,
  unUsedSalvageableMaterials,
  smId,
  isCreate,
  salvageableMaterialsObject,
} = storeToRefs(useSalvageableMaterialStore())

const { title, showUsed = true } = defineProps<{
  title: string
  showUsed?: boolean
}>()

const openCpiDialog = ref(false)
const editRowDialog = ref(false)
const init = async () => {
  await salvageableService.requestSalvageable()
  await salvageableService.requestSalvageableMaterials()
}
watch(
  () => route.params.inspectionId,
  async () => {
    await init()
  },
)
onMounted(async () => {
  await init()
})

const create = async () => {
  await salvageableService.initSalvageableMaterials()
  await salvageableService.requestSalvageableMaterials()
}

const showConfirm = (row: SalvageableMaterialType) => {
  const title = showUsed ? 'Подтвердите удаление' : 'Подтвердите восстановление'
  const text = showUsed ? 'Вы действительно хотите удалить:' : 'Восстановить:'
  $q.dialog({
    title: title,
    message: `Вы действительно хотите удалить: ${row.rawMaterial.name}?`,
    cancel: true,
  }).onOk(async () => {
    try {
      await salvageableService.updateSalvageableMaterialRaw(row.id, {
        isUse: !showUsed,
        count: row.count,
        physicalWear: row.physicalWear,
        functionalWear: row.functionalWear,
        externalWear: row.externalWear,
      })
      $q.notify({ type: 'positive', message: 'Успешно удалено' })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Ошибка при удалении' })
    }
  })
}
const rowClicked = ref<SalvageableMaterialType | null>(null)
const onRowClick = (evt: Event, row: TableRowType, index: number) => {
  if (!showUsed) return
  rowClicked.value = row
  editRowDialog.value = true
}
type TableRowType = SalvageableMaterialType & {
  action?: string
}
const columns: QTableColumn<TableRowType>[] = [
  {
    name: 'name',
    label: 'Наименование',
    field: (row) => row?.rawMaterial?.name,
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'count',
    align: 'center' as const,
    label: 'Кол-во',
    field: 'count',
    sortable: true,
  },
  {
    name: 'fat',
    label: 'ед. изм',
    field: (row) => {
      return uomDescription(row.rawMaterial.unitOfMeasure)
    },
    sortable: true,
  },
  { name: 'averagePrice', label: 'Стоимость на дату проведения', field: 'averagePrice' },
  { name: 'averagePriceCpi', label: 'Средняя стоимость чистая', field: 'averagePriceCpi' },
  { name: 'averagePriceTotal', label: 'Средняя итого', field: 'averagePriceTotal' },
  {
    name: 'averagePriceCpiInspectionDate',
    label: 'Средняя стоимость с учетом ИПЦ на дату акта',
    field: 'averagePriceCpi',
    sortable: true,
  },
  { name: 'physicalWear', label: 'Физический износ %', field: 'physicalWear', sortable: true },
  { name: 'functionalWear', label: 'Функциональный %', field: 'functionalWear', sortable: true },
  { name: 'externalWear', label: 'Внешний', field: 'externalWear', sortable: true },
  { name: 'accumulatedWear', label: 'Накопленный', field: 'accumulatedWear', sortable: true },
  {
    name: 'averagePriceWearInspectionDate',
    label: 'Стоимость с износом на дату проведения',
    field: 'averagePriceWearInspectionDate',
    sortable: true,
  },
  { name: 'action', label: '', field: 'action' },
]
</script>

<style scoped>
.edit-icon {
  opacity: var(--e-opacity-edit-icon);
  transition: opacity 0.3s;
  margin: -3px 0 0 10px;
}
.action-btn {
  opacity: 0;
  transition: opacity 0.3s;
}
tr:hover .action-btn {
  opacity: 1;
}
</style>
