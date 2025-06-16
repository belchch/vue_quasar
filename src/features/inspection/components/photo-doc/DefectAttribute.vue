<template>
  <q-chip
    square
    ext-color="white"
    size="sm"
    :color="color()"
    :text-color="textColor()"
    @click="emit('click')"
    clickable
  >
    {{ name }}
  </q-chip>
</template>
<script setup lang="ts">

export type DefectAttributeProps = {
  name: string,
  type: DefectAttributeType
}

const props = defineProps<DefectAttributeProps>()

const emit = defineEmits<{
  click: []
}>()

const color = () => {
  switch (props.type) {
    case 'structElem':
      return 'orange-1'
    case 'material':
      return 'green-1'
    case 'flaw':
      return 'blue-1'
  }
}

const textColor = () => {
  switch (props.type) {
    case 'structElem':
      return 'orange-7'
    case 'material':
      return 'green-7'
    case 'flaw':
      return 'blue-7'
  }
}

export type DefectAttributeType = 'structElem' | 'material' | 'flaw'
</script>
