<template>
  <PlanTableButton />
  <q-card class="q-mt-md" flat>
    <q-separator />
    <PlanLocationDialog v-if="editingNode" v-model="locationDialogOpen" />
    <PlanMaterialDialog v-if="editingNode" v-model="materialDialogOpen" />
    <PlanOpeningDialog v-if="editingNode" v-model="openingDialogOpen" />
    <PlanObjectDialog v-if="editingNode" v-model="objectDialogOpen" />
    <q-splitter v-model="splitterModel" style="min-height: 400px;">
      <template v-slot:before>
        <div class="q-pa-md scroll" style="height: calc(100vh - 280px);">

          <q-tree ref="treePlan" @update:selected="nodeSelected" :nodes="treeData" node-key="id"
            selected-color="primary" v-model:selected="selected" no-selection-unset>
            <template v-slot:header-room="prop">
              <PlanTreeNode label="Помещение" :name="roomLookupName(prop.node.rawData)" :backoff-name="prop.node.label"
                @edit="editLocation(prop.node)" />
            </template>
            <template v-slot:header-wall="prop">
              <PlanTreeNode :label="`Стена-${prop.node.index}`" :name="materialLookupName(prop.node.rawData.materialId)"
                :backoff-name="prop.node.label" @edit="editMaterial(prop.node)" />
            </template>
            <template v-slot:header-opening="prop">
              <PlanTreeNode :label="openingTypeName(prop.node.rawData.type)"
                :name="openingLookupName(prop.node.rawData.openingId, prop.node.rawData.materialId)"
                :backoff-name="prop.node.label" @edit="editOpening(prop.node)" />
            </template>
            <template v-slot:header-wall-section="prop">
              <PlanTreeNode label="Секция" :name="materialLookupName(prop.node.rawData.materialId)"
                :backoff-name="prop.node.label" @edit="editMaterial(prop.node)" />
            </template>
            <template v-slot:header-section="prop">
              <PlanTreeNode label="Секция" :name="materialLookupName(prop.node.rawData.materialId)"
                :backoff-name="prop.node.label" @edit="editMaterial(prop.node)" />
            </template>
            <template v-slot:header-root-ceiling="prop">
              <PlanTreeNode label="Потолок" :name="materialLookupName(prop.node.rawData.materialId)"
                :backoff-name="prop.node.label" @edit="editMaterial(prop.node)" />
            </template>
            <template v-slot:header-root-floor="prop">
              <PlanTreeNode label="Пол" :name="materialLookupName(prop.node.rawData.materialId)"
                :backoff-name="prop.node.label" @edit="editMaterial(prop.node)" />
            </template>
            <template v-slot:header-movable-objects>
              <q-item-section>
                <q-item-label>Движимое имущество</q-item-label>
              </q-item-section>
            </template>
            <template v-slot:header-movable-item="prop">
              <PlanTreeNode label="Объект" :name="movabelName(prop.node.rawData.comment)" backoff-name="Без названия"
                @edit="editObject(prop.node)" />
            </template>
          </q-tree>
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels v-if="selectedNode" v-model="selectedNodeType" style="height: calc(100vh - 280px);" animated
          transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel name="room">
            <div class="text-blue-grey">Помещение</div>
            <div class="text-h6">{{ selectedNode['label'] || '-' }}</div>
            <div class="q-pa-md row items-start q-gutter-md">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-light">Высота</div>
                  <div class="text-body1">{{ selectedNode.rawData.height || '-' }}</div>
                </q-card-section>
              </q-card>
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-light">Площадь</div>
                  <div class="text-body1">{{ selectedNode.rawData.floor.area || '-' }}</div>
                </q-card-section>
              </q-card>
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-light">Периметр</div>
                  <div class="text-body1">{{ selectedNode.rawData.floor.perimeter || '-' }}</div>
                </q-card-section>
              </q-card>
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-light">Периметр без проемов</div>
                  <div class="text-body1">{{ selectedNode.rawData.floor.perimeterExcludingOpenings || '-' }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="q-pa-md">
              <WallsInfo :walls-config="selectedNode.rawData.walls" />
              <FloorInfo :section="selectedNode.rawData.floor" />
              <CeilInfo :section="selectedNode.rawData.ceiling" />
            </div>
          </q-tab-panel>
          <!-- Стены -->
          <q-tab-panel name="root-walls">
            <WallsInfo :walls-config="selectedNode.rawData" />
          </q-tab-panel>
          <!-- Стена -->
          <q-tab-panel name="wall">
            <WallInfo :selected-node="selectedNode" />
          </q-tab-panel>
          <!-- Пол -->
          <q-tab-panel name="floor">
            <FloorInfo :section="selectedNode.rawData" />
          </q-tab-panel>
          <!-- Потолок -->
          <q-tab-panel name="ceiling">
            <CeilInfo :section="selectedNode.rawData" />
          </q-tab-panel>
          <!-- Секция cтены -->
          <q-tab-panel name="wall-section">
            <WallSectionInfo :section="selectedNode" />
          </q-tab-panel>
          <!-- Секция пола -->
          <q-tab-panel name="floor-section">
            <FloorSectionInfo :section="selectedNode" />
          </q-tab-panel>
          <!-- Секция потолка -->
          <q-tab-panel name="ceiling-section">
            <CeilSection :section="selectedNode" />
          </q-tab-panel>
          <!-- Проем -->
          <q-tab-panel name="opening">
            <OpeningInfo :selected-node="selectedNode" />
          </q-tab-panel>
          <!-- Объекты -->
          <q-tab-panel name="movable-item">
            <ObjectInfo :selected-node="selectedNode" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useOpeningStore } from 'src/features/lookup/opening/opening-store'
import { useSpotStore } from 'src/features/lookup/spot/stores/spot-store'
import { ref } from 'vue'
import { usePlanTreeStore } from '../../stores/plan-tree-store'
import { TreeItem } from '../../stores/types'
import CeilInfo from './CeilInfo.vue'
import CeilSection from './CeilSection.vue'
import FloorInfo from './FloorInfo.vue'
import FloorSectionInfo from './FloorSectionInfo.vue'
import OpeningInfo from './OpeningInfo.vue'
import PlanLocationDialog from './PlanLocationDialog.vue'
import PlanMaterialDialog from './PlanMaterialDialog.vue'
import PlanOpeningDialog from './PlanOpeningDialog.vue'
import PlanTableButton from './PlanTableButton.vue'
import PlanTreeNode from './PlanTreeNode.vue'
import WallInfo from './WallInfo.vue'
import WallSectionInfo from './WallSectionInfo.vue'
import WallsInfo from './WallsInfo.vue'
import ObjectInfo from './ObjectInfo.vue'
import PlanObjectDialog from './PlanObjectDialog.vue'

const { treeData, editingNode } = storeToRefs(usePlanTreeStore())
const spotStore = useSpotStore()
const materialStore = useMaterialStore()
const openingStore = useOpeningStore()

const roomLookupName = ({roomId, roomNum}: {roomId: number, roomNum: number}) => {
  const spotName = () => spotStore.items.find(item => item.id == roomId)?.name
  return roomId ? `${spotName()} ${roomNum != undefined ? ' ' + roomNum : ''}` : ''
}

const materialLookupName = (materialId: number) => {
  return materialId != undefined ? materialStore.items.find(item => item.id == materialId)?.name : undefined
}

const openingLookupName = (openingId: number, materialId: number) => {
  const materialName = () => materialStore.items.find(item => item.id == materialId)?.name
  const openingName = () => openingStore.items.find(item => item.id == openingId)?.name
  return materialId != undefined && openingId != null ? `${openingName()} (${materialName()})` : undefined
}

const openingTypeName = (openningType: string) => {
  if(openningType == 'window') {
    return 'Окно'
  } else if(openningType == 'door') {
    return 'Дверь'
  } else {
    return 'Проем'
  }
}

const movabelName = (comment:string) => {
  if(!comment) return undefined;
  return comment;
}

const treePlan = ref();
const splitterModel = ref(30);
const selected = ref<number | null>(null);
const selectedNode = ref<TreeItem | null>(null);
const selectedNodeType = ref('');
const locationDialogOpen = ref(false);
const materialDialogOpen = ref(false);
const openingDialogOpen = ref(false);
const objectDialogOpen = ref(false);

const nodeSelected = (node: any) => {
  const item = treePlan.value.getNodeByKey(node)
  if (!item) {
    selectedNode.value = null;
    selectedNodeType.value = '';
    return;
  }
  selectedNode.value = item;
  selectedNodeType.value = item.type;
}

const editLocation = (node: any) => {
  locationDialogOpen.value = true;
  editingNode.value = node
}

const editMaterial = (node: any) => {
  materialDialogOpen.value = true;
  editingNode.value = node
}

const editOpening = (node: any) => {
  openingDialogOpen.value = true;
  editingNode.value = node
}
const editObject = (node: any) => {
  objectDialogOpen.value = true;
  editingNode.value = node
}

</script>

<style scoped></style>
