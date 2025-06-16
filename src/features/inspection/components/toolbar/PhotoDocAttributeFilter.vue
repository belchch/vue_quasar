<template>
  <q-select v-bind="$attrs" v-model="selected" dense outlined class="filter_select" multiple @popup-hide="clean"
    ref="selectRef" options-selected-class="selected-option">
    <template v-if="model?.length" v-slot:append>
      <q-icon name="close" @click.stop.prevent="clearSelection" size="xs" class="close-icon" />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label
            :class="[{ 'text-grey-8': !scope.selected }, { 'text-italic': scope.opt.key === null || scope.opt.id === null }]">{{
              scope.opt.name
            }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:after-options>
      <q-btn label="Применить" class="full-width" color="primary" square @click="update" />
    </template>
  </q-select>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  inheritAttrs: false
})

const model = defineModel<any[]>()
const selected = ref<any[]>([])
const selectRef = ref()

const update = () => {
  model.value = selected.value
  selectRef.value.hidePopup()
}

const clean = () => {
  selected.value = model.value as any[]
}

const clearSelection = () => {
  selected.value = []
  model.value = []
  selectRef.value?.blur()
  selectRef.value?.hidePopup()
}
</script>
<style lang="scss" scoped>
.close-icon {
  margin-right: -4px;
}

.selected-option {
  background-color: var(--q-primary-15);
}
</style>
<style lang="scss">
.filter_select {
  width: 200px;

  .q-field__control {
    padding-right: 4px;
  }
}
</style>