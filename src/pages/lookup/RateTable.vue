<template>
  <div class="text-center q-mt-md" v-if="rateStore.loading">
    <q-spinner color="primary" size="3em" :thickness="2" />
    <div class="q-mt-md">Загрузка...</div>
  </div>
  <div v-else class="q-pa-md">
    <div class="row items-center q-mb-md justify-between">
      <div class="col-auto">
        <q-btn-group flat>
          <q-btn
            label="Свернуть все"
            size="md"
            icon="unfold_less"
            @click="collapseAll"
            flat
            dense
            no-caps
          />
          <q-btn
            class="q-ml-sm"
            label="Развернуть все"
            size="md"
            icon="unfold_more"
            @click="expandAll"
            flat
            dense
            no-caps
          />
        </q-btn-group>
      </div>
      <div class="col-4">
        <q-input v-model="filter" placeholder="Поиск..." clearable outlined dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <q-table
      :rows="groupHeaders"
      :rows-per-page-options="[0]"
      row-key="type"
      hide-header
      hide-bottom
      hide-pagination
      flat
      bordered
    >
      <template v-slot:body="props">
        <q-tr :props="props" @click="toggleRow(props)">
          <q-td>
            <span class="text-h6 text-weight-regular">{{ props.row.title }}</span>
          </q-td>
          <q-td auto-width>
            <q-icon
              :name="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click.stop="toggleRow(props)"
              size="sm"
              color="grey-7"
            />
          </q-td>
        </q-tr>

        <q-tr v-show="expandedRows[props.row.type]" :props="props" no-hover>
          <q-td colspan="100%">
            <q-table
              :rows="getFilteredRates(props.row.type)"
              :rows-per-page-options="[0]"
              :columns="detailsColumn"
              row-key="id"
              flat
              dense
              separator="cell"
              bordered
            >
              <template #body-cell-sources="props">
                <q-td>
                  <RatePriceTable :rate="props.row" :sources="props.row.sources" />
                </q-td>
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Rate,
  UnitOfMeasureEnum,
  ParamsTypeEnum,
  ParamsType,
  RateSources,
} from 'src/features/lookup/rate/types'
import { useUserStore } from 'src/features/user/stores/user-store'
import { useQuasar } from 'quasar'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import RatePriceTable from './RatePriceTable.vue'
const $q = useQuasar()
const tableRate = ref()
const { hasPermission } = useUserStore()
const openDialog = ref(false)
const editedRate = ref<Rate | null>(null)
const rateStore = useRateStore()
const filter = ref('')

const { rates = [] } = defineProps<{
  rates: Rate[]
}>()
const expandedRows = ref<Record<string, boolean>>({})
const getFilteredRates = (type: string) => {
  const ratesForType = rateStore.groupedByType[type] || []

  if (!filter.value) {
    return ratesForType
  }

  const searchTerm = filter.value.toLowerCase().trim()
  return ratesForType.filter(
    (rate) =>
      rate.name?.toLowerCase().includes(searchTerm) ||
      rate.unitOfMeasure?.toString().toLowerCase().includes(searchTerm) ||
      rate.factor?.toString().includes(searchTerm) ||
      searchInLinks(rate?.sources),
  )
}

const searchInLinks = (sources: RateSources[] | undefined) => {
  if (!sources) return false
  for (const source of sources) {
    if (source?.url.toLowerCase().includes(filter.value.toLowerCase().trim())) {
      return true
    }
  }
  return false
}
const toggleRow = (props: any) => {
  props.expand = !props.expand
  expandedRows.value[props.row.type] = props.expand
}
const collapseAll = () => {
  expandedRows.value = {}
}

const expandAll = () => {
  const allExpanded: Record<string, boolean> = {}
  groupHeaders.value.forEach((header) => {
    allExpanded[header.type] = true
  })
  expandedRows.value = allExpanded
}
const groupHeaders = computed(() => {
  return Object.entries(rateStore.groupedByType).map(([type]) => ({
    type,
    title: getGroupTitle(type as ParamsType),
  }))
})

const getGroupTitle = (type: ParamsType) => {
  return ParamsTypeEnum[type]
}
const detailsColumn = [
  {
    name: 'name',
    field: 'name',
    label: 'Название',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'unitOfMeasure',
    field: (row: Rate) => UnitOfMeasureEnum[row.unitOfMeasure],
    label: 'Ед.изм.',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'averagePrice',
    field: 'averagePrice',
    label: 'Ср.цена',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'sources',
    field: 'sources',
    label: 'Ссылки',
    align: 'left' as const,
  },
]
</script>
<style scoped>
td:hover {
  cursor: pointer;
}
</style>
