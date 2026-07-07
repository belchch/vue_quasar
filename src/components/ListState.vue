<template>
  <div class="column flex-center text-center list-state" :class="paddingClass">
    <q-icon :name="icon" :color="color" size="48px" class="q-mb-md list-state__icon" />
    <div class="text-subtitle1 text-weight-medium text-grey-8">{{ title }}</div>
    <div v-if="description" class="text-grey-6 q-mt-xs list-state__desc">{{ description }}</div>
    <q-btn
      v-if="retry"
      unelevated
      no-caps
      color="primary"
      :icon="retryIcon"
      :label="retryLabel"
      class="q-mt-md"
      @click="$emit('retry')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon?: string
    title: string
    description?: string
    color?: string
    retry?: boolean
    retryLabel?: string
    retryIcon?: string
    dense?: boolean
  }>(),
  {
    icon: 'inbox',
    color: 'grey-6',
    retryLabel: 'Повторить',
    retryIcon: 'refresh',
    dense: false,
  },
)

defineEmits<{ retry: [] }>()

const paddingClass = computed(() => (props.dense ? 'q-pa-lg' : 'q-pa-xl'))
</script>

<style lang="scss" scoped>
.list-state {
  width: 100%;

  &__icon {
    opacity: 0.55;
  }

  &__desc {
    max-width: 360px;
  }
}
</style>
