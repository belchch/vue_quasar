<template>
  <q-tree
    ref="treeRef"
    @update:selected="$emit('update:selected', $event)"
    :nodes="nodes"
    node-key="id"
    selected-color="primary"
    v-model:selected="selectedModel"
    no-selection-unset
  >
    <template v-slot:header-room="prop">
      <PlanTreeNode
        label="Помещение"
        :name="roomLookupName(prop.node.rawData)"
        :backoff-name="prop.node.label"
        @edit="$emit('editLocation', prop.node)"
      />
    </template>
    <template v-slot:header-wall="prop">
      <PlanTreeNode
        :label="`Стена-${prop.node.index}`"
        :name="materialLookupName(prop.node.rawData.materialId)"
        :backoff-name="prop.node.label"
        @edit="$emit('editMaterial', prop.node)"
      />
    </template>
    <template v-slot:header-opening="prop">
      <PlanTreeNode
        :label="openingTypeName(prop.node.rawData.type)"
        :name="openingFullName(prop.node.rawData.openingId, prop.node.rawData.materialId)"
        :backoff-name="
          openingBackOffName(
            prop.node.label,
            prop.node.rawData.openingId,
            prop.node.rawData.materialId,
          )
        "
        @edit="$emit('editOpening', prop.node)"
      />
    </template>
    <template v-slot:header-wall-section="prop">
      <PlanTreeNode
        label="Секция"
        :name="materialLookupName(prop.node.rawData.materialId)"
        :backoff-name="prop.node.label"
        @edit="$emit('editMaterial', prop.node)"
      />
    </template>
    <template v-slot:header-section="prop">
      <PlanTreeNode
        label="Секция"
        :name="materialLookupName(prop.node.rawData.materialId)"
        :backoff-name="prop.node.label"
        @edit="$emit('editMaterial', prop.node)"
      />
    </template>
    <template v-slot:header-root-ceiling="prop">
      <PlanTreeNode
        label="Потолок"
        :name="materialLookupName(prop.node.rawData.materialId)"
        :backoff-name="prop.node.label"
        @edit="$emit('editMaterial', prop.node)"
      />
    </template>
    <template v-slot:header-root-floor="prop">
      <PlanTreeNode
        label="Пол"
        :name="materialLookupName(prop.node.rawData.materialId)"
        :backoff-name="prop.node.label"
        @edit="$emit('editMaterial', prop.node)"
      />
    </template>
    <template v-slot:header-movable-objects>
      <q-item-section>
        <q-item-label>Движимое имущество</q-item-label>
      </q-item-section>
    </template>
    <template v-slot:header-movable-item="prop">
      <PlanTreeNode
        label="Объект"
        :name="movabelName(prop.node.rawData.comment)"
        backoff-name="Без названия"
        @edit="$emit('editObject', prop.node)"
      />
    </template>
    <template v-slot:header-notmovable-objects>
      <q-item-section>
        <q-item-label>Колонны</q-item-label>
      </q-item-section>
    </template>
    <template v-slot:header-notmovable-item="prop">
      <PlanTreeNode
        label="Объект"
        :name="movabelName(prop.node.rawData.comment)"
        backoff-name="Без названия"
        @edit="$emit('editObject', prop.node)"
      />
    </template>
    <template v-slot:header-stairways>
      <q-item-section>
        <q-item-label>Лестницы</q-item-label>
      </q-item-section>
    </template>
    <template v-slot:header-stairway-item="prop">
      <PlanTreeNode
        label="Лестница"
        :name="movabelName(prop.node.rawData.comment)"
        backoff-name="Без названия"
        @edit="$emit('editObject', prop.node)"
      />
    </template>
  </q-tree>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useOpeningStore } from 'src/features/lookup/opening/opening-store'
import { useSpotStore } from 'src/features/lookup/spot/stores/spot-store'
import PlanTreeNode from './PlanTreeNode.vue'

interface Props {
  nodes: any[]
  selected?: number | null
}

interface Emits {
  (e: 'update:selected', value: any): void
  (e: 'editLocation', node: any): void
  (e: 'editMaterial', node: any): void
  (e: 'editOpening', node: any): void
  (e: 'editObject', node: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const spotStore = useSpotStore()
const materialStore = useMaterialStore()
const openingStore = useOpeningStore()

const treeRef = ref()

const selectedModel = computed({
  get: () => props.selected,
  set: (value) => emit('update:selected', value),
})

const roomLookupName = ({ roomId, roomNum }: { roomId: number; roomNum: number }) => {
  const spotName = () => spotStore.items.find((item) => item.id == roomId)?.name
  return roomId ? `${spotName()} ${roomNum != undefined ? ' ' + roomNum : ''}` : ''
}

const materialLookupName = (materialId: number) => {
  return materialId != undefined
    ? materialStore.items.find((item) => item.id == materialId)?.name
    : undefined
}

const openingLookupName = (openingId: number) => {
  return openingStore.items.find((item) => item.id == openingId)?.name
}

const openingFullName = (openingId: number, materialId: number) => {
  const openingName = openingLookupName(openingId)
  const materialName = materialLookupName(materialId)
  if (openingName && materialName) return `${openingName} (${materialName})`
  return undefined
}

const openingBackOffName = (label: string, openingId: number, materialId: number) => {
  const openingName = openingLookupName(openingId)
  const materialName = materialLookupName(materialId)
  if (openingName) return label ? `${openingName} (${label})` : `${openingName}`
  if (materialName) return `${materialName}`
  return label
}

const openingTypeName = (openningType: string) => {
  if (openningType == 'window') {
    return 'Окно'
  } else if (openningType == 'door') {
    return 'Дверь'
  } else {
    return 'Проем'
  }
}

const ObjectName = (isMovable: boolean, comment: string, materialId: number | null = null) => {
  if (isMovable) return comment ? comment : undefined
  if (!materialId) return undefined
  const materialName = materialLookupName(materialId)
  if (!comment || !materialName) return undefined
  return `${comment} (${materialName})`
}

const fixedObjectBackOffName = (comment: string, materialId: number | null = null) => {
  if (!materialId && !comment) return ''
  const materialName = materialId ? materialLookupName(materialId) : ''
  return comment ? comment : materialName ? materialName : ''
}

const movabelName = (comment: string) => {
  if (!comment) return undefined
  return comment
}

// Метод для получения узла по ключу
const getNodeByKey = (key: number) => {
  return treeRef.value?.getNodeByKey(key)
}

defineExpose({
  getNodeByKey,
})
</script>
