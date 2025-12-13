<template>
  <div>
    <q-card-section class="q-pt-none">
      <q-select dense outlined v-model="params.type" :options="doorOptions" option-value="value"
        option-label="label" emit-value map-options label="Тип двери" />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-select dense outlined v-model="params.dimension" :options="calcOptions" option-value="value"
        option-label="label" emit-value map-options label="Измерение для расчета" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.hasSlopes" label="Наличие откосов" />
      <span v-if="params.hasSlopes === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.trimsReplacement" label="Замена наличников" />
      <span v-if="params.trimsReplacement === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.trimsPreservation" label="Замена наличников с сохранением" />
      <span v-if="params.trimsPreservation === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.replacement" label="Замена двери" />
      <span v-if="params.replacement === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-toggle toggle-indeterminate v-model="params.preservation" label="Замена двери с сохранением" />
      <span v-if="params.preservation === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DimensionType, DimensionEnum, DoorTypeEnum, DoorType } from 'src/features/lookup/rate/types';
import { BoqDoor } from 'src/features/lookup/rate/types';
const params = defineModel<BoqDoor>({ default: null });
const calcOptions = computed(() => {
  return Object.keys(DimensionEnum).map(key => ({
    value: key as DimensionType,
    label: DimensionEnum[key as DimensionType]
  }));
});
const doorOptions = computed(() => {
  return Object.keys(DoorTypeEnum).map(key => ({
    value: key as DoorType,
    label: DoorTypeEnum[key as DoorType]
  }));
})
</script>

<style scoped>

</style>
