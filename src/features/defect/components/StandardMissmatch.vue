<template>
  <q-icon v-if="show()" name="error" color="negative" size="xs">
    <q-tooltip>{{ message }}</q-tooltip>
  </q-icon>
</template>
<script setup lang="ts">
import { Standard } from 'src/features/lookup/standard/stores/types'
import { computed } from 'vue'

const show = () => {
  return props.one && props.another && props.one.id != props.another.id
}

const message = computed(() => {
  return `Несоответсвие нормативов ${props.one?.name} и ${props.another?.name}`
})

const props = defineProps<{
  one?: Standard | undefined
  another?: Standard | undefined
}>()

console.log('one', props.one)
console.log('another', props.another)
</script>
