<template>
  <q-card class="column full-height" flat>
    <q-card-section>
      <div class="row tag-card q-gutter-md no-wrap">
        <DefectAttributeFilter
          :options="structElemOptions"
          title="Поверхность"
          type="structElem"
          @select="selectStructElem"
        />
        <DefectAttributeFilter
          :options="materialOptions"
          title="Материал"
          type="material"
          @select="selectMaterial"
        />
        <DefectAttributeFilter
          :options="flawOptions"
          title="Тип дефекта"
          type="flaw"
          @select="selectFlaw"
        />
      </div>
    </q-card-section>
    <q-card-section class="col">
      <q-table
        :rows="defectRows"
        :columns="defectColumns"
        row-key="name"
        flat
        bordered
        class="q-pa-none"
        wrap-cells
      >
        <template v-slot:top-left>
          <q-btn label="Сбросить" class="q-mb-sm" size="sm" color="primary" @click="reset" />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props)" style="cursor: pointer">
            <q-td key="template" :props="props">
              {{ props.row.template }}
            </q-td>
            <q-td key="standard" :props="props">
              {{ props.row.standard.name }} {{ props.row.standard.description || '' }}
            </q-td>
            <q-td key="structElem" :props="props">
              <DefectAttribute :name="props.row.structElem.name" type="structElem" />
            </q-td>
            <q-td key="material" :props="props">
              <DefectAttribute
                v-if="props.row.material"
                :name="props.row.material?.name"
                type="material"
              />
            </q-td>
            <q-td key="flaw" :props="props">
              <DefectAttribute v-if="props.row.flaw" :name="props.row.flaw?.name" type="flaw" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { useDefectSearch } from 'src/features/inspection/store/defect-search-store'
import { computed } from 'vue'
import { DefectSearchRequest } from 'src/features/inspection/api/types'
import { LookupItem } from 'src/features/lookup/base/store/types'
import DefectAttributeFilter from 'src/features/inspection/components/photo-doc/DefectAttributeFilter.vue'
import DefectAttribute from 'src/features/inspection/components/photo-doc/DefectAttribute.vue'

const defectSearchService = useDefectSearch()

const updateDefectInfo = async (search: Partial<DefectSearchRequest>) => {
  await defectSearchService.search(search)
}

const onRowClick = async (e: any) => {
  await selectDefect(e.row.id)
}

const selectDefect = async (id: number) => {
  await updateDefectInfo({
    defectId: id,
  })
}

const selectStructElem = async (id: number) => {
  await updateDefectInfo({
    structElemId: id,
  })
}

const selectMaterial = async (id: number) => {
  await updateDefectInfo({
    materialId: id,
  })
}

const selectFlaw = async (id: number) => {
  await updateDefectInfo({
    flawId: id,
  })
}

const defectRows = computed(() => defectSearchService.response.defects)
const structElemOptions = computed(() => lookupToOptions(defectSearchService.response.structElems))
const materialOptions = computed(() => lookupToOptions(defectSearchService.response.materials))
const flawOptions = computed(() => lookupToOptions(defectSearchService.response.flaws))

const reset = async () => {
  await defectSearchService.search({
    structElemId: undefined,
    materialId: undefined,
    flawId: undefined,
    defectId: undefined,
  })
}

const lookupToOptions = (items: LookupItem[]) => {
  return items.map(({ id, name }) => ({ id: id!!, name }))
}

const defectColumns = [
  { name: 'template', align: 'left' as const, label: 'Шаблон', field: 'template', sortable: true },
  { name: 'standard', align: 'left' as const, label: 'ГОСТ', field: 'standard', sortable: true },
  {
    name: 'structElem',
    align: 'center' as const,
    label: 'Элемент',
    field: (row: any) => row.name,
    sortable: true,
  },
  {
    name: 'material',
    align: 'center' as const,
    label: 'Материал',
    field: (row: any) => row.name,
    sortable: true,
  },
  {
    name: 'flaw',
    align: 'center' as const,
    label: 'Тип дефекта',
    field: (row: any) => row.name,
    sortable: true,
  },
]
</script>
<style scoped>
.tag-card {
  height: 150px;
}
</style>
