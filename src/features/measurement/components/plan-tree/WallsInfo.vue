<template>
  <div>
    <div class="text-h6">Стены</div>
    <div class="q-pa-md">
      <q-table
        :pagination="{ rowsPerPage: 10 }"
        flat
        bordered
        :rows="wallsConfig"
        :columns="columns"
        separator="cell"
        row-key="name"
      />
    </div>
  </div>
</template>
<!-- "length": 4.0,
        "height": 2.5,
        "perimeter": 4.0,
        "area": 10.0,
        "hasCustomShape": false, -->
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  wallsConfig: any[]
}>()
// {
//   name: 'Комментарий',
//     required: true,
//       label: 'Dessert (100g serving)',
//         align: 'left',
//           field: row => row.name,
//             format: val => `${val}`,
//               sortable: true
// },
const columns = [
  { name: 'length', label: 'Длина', field: 'length', sortable: true },
  { name: 'height', label: 'Высота', field: 'height', sortable: true },
  { name: 'perimeter', label: 'Периметр', field: 'perimeter', sortable: true },
  { name: 'area', label: 'Площадь', field: 'area', sortable: true },
  { name: 'comment', label: 'Комментарий', field: 'comment', sortable: true },
  { name: 'hasCustomShape', label: 'hasCustomShape', field: 'hasCustomShape' },
]

</script>

<style scoped></style>
