<template>
  <div>
    <q-list separator bordered class="rounded-borders">
      <q-expansion-item
        header-class="text-h6 text-weight-regular"
        v-for="(items, keyValue, index) in groupedByRoom"
        :key="index"
        separator
        :label="keyValue + ' (' + items.length + ')'"
      >
        <q-card>
          <q-card-section>
            <movable-object-table :items="items" />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMovableStore } from '../../stores/movable-store';
import { ref, computed, onMounted } from 'vue'
import MovableObjectTable from './MovableObjectTable.vue'
const { groupedByRoom } = storeToRefs(useMovableStore());
</script>

<style scoped>

</style>
