<template>
  <div class="col-6">
    <div class="col-12">
      <div class="text-grey-8 text-weight-medium title q-pa-sm">{{ title }}</div>
    </div>
    <div class="col-12 row">
      <q-btn icon="event" flat no-caps round class="bg-grey-3 text-grey-8 q-ml-sm q-mr-lg" size="md">
        <q-popup-proxy @before-show="getRange()" cover transition-show="scale" transition-hide="scale">
          <q-date color="grey" v-model="range" range minimal>
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Отмена" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="saveRange" v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
      <q-chip v-if="model?.from && model.to" class="q-mr-sm" @remove="model = { from: '', to: '' }" removable
        color="grey-2" text-color="grey-8" size="md">
        {{ model.from }} - {{ model.to }}
      </q-chip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string
}>()

const model = defineModel<DateRange>()

export type DateRange = {
  from: string | undefined
  to: string | undefined
}

const range = ref<DateRange>({ from: '', to: '' })

const getRange = () => {
  if (model.value) {
    range.value = model.value
  }
}

const saveRange = () => {
  model.value = range.value
}
</script>
