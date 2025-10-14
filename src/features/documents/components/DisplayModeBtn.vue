<template>
    <q-btn-dropdown flat :size="'sm'"
      :label="model == 'gallery' ? 'Галерея' : 'Список'"
      :icon="model == 'gallery' ? 'o_grid_view' : 'o_dns'" class="q-px-sm">
      <q-list>
        <q-item clickable v-close-popup @click="changeMode('gallery')"
          :active="model === 'gallery'"
          :class="model === 'gallery' ? 'active' : ''">
          <q-item-section>
            <q-item-label>Галлерея</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="changeMode('table')"
          :active="model === 'table'"
          :class="model === 'table' ? 'active' : ''">
          <q-item-section>
            <q-item-label>Список</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, defineEmits } from 'vue';

const model = defineModel({
  type: String as () => 'gallery' | 'table',
  default: 'gallery',
});
const displayMode = ref('gallery');

const emit = defineEmits<{
  change: [mode: string];
}>();

function changeMode(mode: string) {
    model.value = mode;
    emit('change', mode);
}

</script>

<style scoped>

</style>
