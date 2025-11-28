<template>
  <PlanTableButton v-if="hasPermission(['measurement.update'])" />
  <q-card class="q-mt-md" flat>
    <q-separator />
    <PlanLocationDialog v-if="editingNode" v-model="locationDialogOpen" />
    <PlanMaterialDialog v-if="editingNode" v-model="materialDialogOpen" />
    <PlanOpeningDialog v-if="editingNode" v-model="openingDialogOpen" />
    <PlanObjectDialog v-if="editingNode" v-model="objectDialogOpen" />
    <q-btn
      v-if="$q.screen.lt.md"
      outline
      class="q-mb-md q-mt-md"
      icon="menu"
      size="sm"
      label="Показать дерево"
      @click="leftDrawerOpen = true"
    />
    <q-drawer
      v-if="$q.screen.lt.md"
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="300"
      overlay
      behavior="mobile"
    >
      <div class="q-pa-md scroll" style="height: 100vh">
        <PlanTreeComponent
          ref="treePlanMobile"
          :nodes="treeData"
          :selected="selected"
          @update:selected="handleNodeSelected"
          @edit-location="editLocation"
          @edit-material="editMaterial"
          @edit-opening="editOpening"
          @edit-object="editObject"
        />
      </div>
    </q-drawer>
    <q-splitter v-model="splitterModel" style="min-height: 400px">
      <template v-if="$q.screen.gt.sm" v-slot:before>
        <div class="q-pa-md scroll" style="height: calc(100vh - 280px)">
          <PlanTreeComponent
            ref="treePlan"
            :nodes="treeData"
            :selected="selected"
            @update:selected="handleDesktopNodeSelected"
            @edit-location="editLocation"
            @edit-material="editMaterial"
            @edit-opening="editOpening"
            @edit-object="editObject"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          class="tree-tabs"
          v-if="selectedNode"
          v-model="selectedNodeType"
          style="height: calc(100vh - 280px)"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
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
                  <div class="text-body1">
                    {{ selectedNode.rawData.floor.perimeterExcludingOpenings || '-' }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="q-pa-md">
              <WallsInfo :walls-config="selectedNode.rawData.walls" />
              <FloorInfo :section="selectedNode.rawData.floor" />
              <CeilInfo :section="selectedNode.rawData.ceiling" />
            </div>
            <div class="q-pa-md">
              <div class="text-h6">Фотографии</div>
              <div class="text-h6 text-weight-light" v-if="selectedNode.rawData.photos.length == 0">
                Фотографии отсутствуют
              </div>
              <q-list v-else bordered separator>
                <q-item v-for="photo in selectedNode.rawData.photos" :key="photo.fileName">
                  <q-item-section>
                    {{ photo.fileName }}
                  </q-item-section>
                </q-item>
              </q-list>
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
          <q-tab-panel name="notmovable-item">
            <ObjectInfo :selected-node="selectedNode" label-block="Колонна" />
          </q-tab-panel>
          <!-- Лестницы -->
          <q-tab-panel name="stairway-item">
            <ObjectInfo :selected-node="selectedNode" label-block="Лестница" />
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
import { ref, watch } from 'vue'
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
import WallInfo from './WallInfo.vue'
import WallSectionInfo from './WallSectionInfo.vue'
import WallsInfo from './WallsInfo.vue'
import ObjectInfo from './ObjectInfo.vue'
import PlanObjectDialog from './PlanObjectDialog.vue'
import { useQuasar } from 'quasar'
import PlanTreeComponent from './PlanTreeComponent.vue'
import { useUserStore } from 'src/features/user/stores/user-store'

const { hasPermission } = useUserStore()

const $q = useQuasar()
const { treeData, editingNode } = storeToRefs(usePlanTreeStore())

const treePlan = ref()
const treePlanMobile = ref()
const splitterModel = ref(30)
const selected = ref<number | null>(null)
const selectedNode = ref<TreeItem | null>(null)
const selectedNodeType = ref('')
const locationDialogOpen = ref(false)
const materialDialogOpen = ref(false)
const openingDialogOpen = ref(false)
const objectDialogOpen = ref(false)
const leftDrawerOpen = ref(false)

watch(
  () => $q.screen.lt.md,
  (isMobile) => {
    if (isMobile) {
      splitterModel.value = 0
    } else {
      splitterModel.value = 30
    }
  },
  { immediate: true },
)
const nodeSelected = async (refTree: any, node: any) => {
  const item = await refTree.value?.getNodeByKey(node)
  if (!item) {
    selectedNode.value = null
    selectedNodeType.value = ''
    return
  }
  selectedNode.value = item
  selectedNodeType.value = item.type
}
const handleNodeSelected = async (node: any) => {
  await nodeSelected(treePlanMobile, node)
  leftDrawerOpen.value = false
  if ($q.screen.lt.md) {
    leftDrawerOpen.value = false
  }
}
const handleDesktopNodeSelected = async (node: any) => {
  await nodeSelected(treePlan, node)
}
const editLocation = (node: any) => {
  locationDialogOpen.value = true
  editingNode.value = node
}

const editMaterial = (node: any) => {
  materialDialogOpen.value = true
  editingNode.value = node
}

const editOpening = (node: any) => {
  openingDialogOpen.value = true
  editingNode.value = node
}
const editObject = (node: any) => {
  objectDialogOpen.value = true
  editingNode.value = node
}
</script>

<style scoped></style>
