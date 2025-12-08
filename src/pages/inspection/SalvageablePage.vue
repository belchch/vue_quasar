<template>
  <div>
    <SalvageableMaterialTable title="Годные остатки" />
    <SalvageableMaterialResultTable title="Итоговый расчет" />
    <SalvageableMaterialTable title="Не используемые" :show-used="false" />
  </div>
</template>

<script setup lang="ts">
import SalvageableMaterialTable from 'src/features/salvageable/components/SalvageableMaterialTable.vue'
import SalvageableMaterialResultTable from 'src/features/salvageable/components/SalvageableMaterialResultTable.vue'
</script>

<style scoped></style>
