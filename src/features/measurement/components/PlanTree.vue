<template>
  <div>
    <q-separator />
    <q-splitter v-model="splitterModel">

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree ref="treePlan" @update:selected="nodeSelected" :nodes="treeData" node-key="id"
            selected-color="primary" v-model:selected="selected" no-selection-unset>
            <template v-slot:header-room="prop">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Помещение</q-item-label>
                  <q-item-label>{{ prop.node.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:header-wall="prop">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Стена-{{ prop.node.index }}</q-item-label>
                  <q-item-label>{{ prop.node.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:header-opening="prop">
              <q-item>
                <q-item-section>
                  <q-item-label caption>{{ prop.node.rawData.type == 'WINDOW' ? 'Окно' : 'Дверь' }}</q-item-label>
                  <q-item-label>{{ prop.node.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:header-wall-section="prop">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Секция</q-item-label>
                  <q-item-label>{{ prop.node.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:header-section="prop">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Секция</q-item-label>
                  <q-item-label>{{ prop.node.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:header-root-ceiling="prop">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Потолок</q-item-label>
                  <q-item-label>{{ prop.node.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:header-root-floor="prop">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Пол</q-item-label>
                  <q-item-label>{{ prop.node.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-tree>
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels v-if="selectedNode" v-model="selectedNodeType" animated transition-prev="jump-up"
          transition-next="jump-up">
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
            <FloorInfo :section="selectedNode" />
          </q-tab-panel>
          <!-- Потолок -->
          <q-tab-panel name="ceiling">
            <CeilInfo :section="selectedNode" />
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
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WallInfo from './WallInfo.vue'
import WallsInfo from './WallsInfo.vue'
import { head } from 'lodash';
import OpeningInfo from './OpeningInfo.vue'
import WallSectionInfo from './WallSectionInfo.vue'
import FloorSectionInfo from './FloorSectionInfo.vue'
import CeilSection from './CeilSection.vue'
import FloorInfo from './FloorInfo.vue'
import CeilInfo from './CeilInfo.vue'

// const simple = ref([])
const treePlan = ref();
const splitterModel = ref(30);
const selected = ref<number | null>(null);
const treeData = ref<object[]>([]);
const selectedNode = ref<TreeItem | null>(null);
const selectedNodeType = ref('');
const planJson = [
  {
    "comment": "Жилая комната",
    "height": 2.5,
    "walls": [
      {
        "length": 4.0,
        "height": 2.5,
        "perimeter": 4.0,
        "area": 10.0,
        "hasCustomShape": false,
        "comment": "Штукатурка",
        "sections": [
          {
            "length": 2.0,
            "height": 2.5,
            "perimeter": 2.0,
            "hasCustomShape": false,
            "area": 5.0,
            "perimeterExcludingOpenings": 3.6,
            "comment": "Обои",
            "openings": [
              {
                "type": "WINDOW",
                "hasCustomShape": false,
                "width": 1.2,
                "height": 1.2,
                "heightFromFloor": 0.6,
                "area": 1.44,
                "perimeter": 4.8,
                "comment": "Окно во двор",
                "hasSlopes": true,
                "slopesWidth": 1.0
              }
            ]
          }
        ],
        "openings": [
          {
            "type": "DOOR",
            "hasCustomShape": false,
            "width": 0.9,
            "height": 2.1,
            "heightFromFloor": 0,
            "area": 1.89,
            "perimeter": 6.0,
            "comment": "Дверь в спальню",
            "hasTrims": false,
            "trimsWidth": 0
          }
        ]
      },
      {
        "length": 4.0,
        "height": 2.5,
        "perimeter": 4.0,
        "area": 10.0,
        "hasCustomShape": false,
        "comment": "Обои",
        "sections": [
          {
            "length": 2.0,
            "height": 2.5,
            "perimeter": 2.0,
            "hasCustomShape": false,
            "area": 5.0,
            "perimeterExcludingOpenings": 3.6,
            "comment": "Обои",
            "openings": [
              {
                "type": "WINDOW",
                "hasCustomShape": false,
                "width": 1.2,
                "height": 1.2,
                "heightFromFloor": 0.6,
                "area": 1.44,
                "perimeter": 4.8,
                "comment": "Окно во двор",
                "hasSlopes": true,
                "slopesWidth": 1.0
              }
            ]
          }
        ],
        "openings": [
          {
            "type": "DOOR",
            "hasCustomShape": false,
            "width": 0.9,
            "height": 2.1,
            "heightFromFloor": 0,
            "area": 1.89,
            "perimeter": 6.0,
            "comment": "Проем в кухню",
            "hasTrims": false,
            "trimsWidth": 0
          },
          {
            "type": "WINDOW",
            "hasCustomShape": false,
            "width": 1.2,
            "height": 1.2,
            "heightFromFloor": 0.6,
            "area": 1.44,
            "perimeter": 4.8,
            "comment": "Окно во двор",
            "hasSlopes": true,
            "slopesWidth": 1.0
          }
        ]
      },
    ],
    "floor": {
      "perimeter": 15.0,
      "perimeterExcludingOpenings": 8.6,
      "area": 14.0,
      "comment": "Ламинат",
      "hasCustomShape": true,
      "sections": [
        {
          "length": 2.0,
          "width": 2.5,
          "height": 0.2,
          "perimeter": 2.0,
          "area": 5.0,
          "hasCustomShape": false,
          "comment": "Плитка"
        },
      ],
      "baseboardLength": 15.0
    },
    "ceiling": {
      "length": 4.0,
      "width": 3.5,
      "perimeter": 15.0,
      "area": 14.0,
      "hasCustomShape": false,
      "comment": "Натяжной",
      "sections": [
        {
          "length": 2.0,
          "width": 2.5,
          "heightFromFloor": 2.3,
          "height": 0.2,
          "perimeter": 2.0,
          "area": 5.0,
          "hasCustomShape": false,
          "comment": "гипсокартон"
        },
      ],
      "moldingLength": 15.0
    }
  }
];

const nodeSelected = (node: any) => {
  const item = treePlan.value.getNodeByKey(node)
  console.log(node)
  if(!item){
    selectedNode.value = null;
    selectedNodeType.value = '';
    return;
  }
  selectedNode.value = item;
  selectedNodeType.value = item.type;
}
let globalIndex = 0;
const transformPlanJson = (planJson: any) => {
  globalIndex = 0;
  treeData.value = [];
  planJson.forEach((room: any) => {
    const roomNode = createRoom(room);
    // createWalls(roomNode.children, room.walls);
    treeData.value.push(roomNode);
  });
}
type TreeItem = {
  id: number,
  header: string,
  type: string,
  label: string,
  rawData: any,
  children: any[]
}
type Room = {
  id: number,
  header: 'room',
  type: 'room',
  label: string,
  rawData: object,
  children: any[]
}
type Wall = {
  id: number,
  index: number,
  header: string,
  type: string,
  label: string,
  rawData: object,
  children: any[]
}
type Walls = {
  id: number,
  header: string,
  type: string,
  label: string,
  rawData: object,
  children: any[]
}
type PlanOpening = {
  id: number,
  type: 'opening',
  label: string,
  rawData: object
}
const createRoom = (room:any)=>{
  const resultRoom:Room = {
    id: globalIndex++,
    header: 'room',
    type: 'room',
    label: room.comment,
    rawData: room,
    children: [ ]
  };
  const walls: Walls = {
    id: globalIndex++,
    header: 'root-walls',
    type: 'root-walls',
    label: `Стены`,
    rawData: room.walls,
    children: []
  }
  const transformedWalls = createWalls(room.walls);
  walls.children.push(...transformedWalls)
  resultRoom.children.push(walls);
  const rootFloor = transformRoomFloor(room.floor);
  const rootCeiling = transformRoomCeiling(room.ceiling);
  resultRoom.children.push(rootFloor);
  resultRoom.children.push(rootCeiling);
  // room.walls.forEach((wall: any,i:number) => {
  //   resultRoom.children.push(createWall(i,wall));
  // });
  return resultRoom;
}
const createWall = (i:number,wall:any)=>{
  return {
    id: globalIndex++,
    type: 'wall',
    label: `Стена-${i + 1} (${wall.comment})`,
    rawData: wall,
    children: []
  }
}
const createWalls = (walls: any) => {
  const resultWalls:Wall[] = [];

  walls.forEach((wall: any,i:number) => {
    const newWall:Wall = {
      id: globalIndex++,
      header: 'wall',
      type: 'wall',
      index: i+1,
      label: wall.comment,
      rawData: wall,
      children: []
    }
    createOpenings(newWall.children,wall.openings);
    const wallSections = creatWallSections(wall.sections);
    if(wallSections.length > 0) newWall.children.push(...wallSections);
    // const ceil:any = {
    //   id: globalIndex++,
    //   label: `Потолок`
    // }
    // newWall.children.push(ceil);
    resultWalls.push(newWall);
  });
  return resultWalls;
}
const creatWallSections = (sections:any)=>{
  const result:TreeItem[] = [];
  sections.forEach((section:any)=>{
    const newSection:TreeItem = {
      id: globalIndex++,
      header: 'wall-section',
      type: 'wall-section',
      label: section.comment,
      rawData: section,
      children: []
    }
    createOpenings(newSection.children,section.openings);
    // const openings = transformWallSectionOpenings(sections.openings);
    // if (openings.length > 0) newSection.children.push(...openings);
    result.push(newSection);
  });
  return result;
}
const transformWallSectionOpenings = (openings:any)=>{
  const result:TreeItem[] = [];
  if(!openings || openings.length === 0) return [];
  return result;
}
const transformRoomFloor = (floor:any)=>{
  if(!floor) return null;
  const result: TreeItem = {
    id: globalIndex++,
    header: 'root-floor',
    type: 'floor',
    label: floor.comment,
    rawData: floor,
    children: []
  }
  const sections = transformFloorSections(floor.sections);
  if(sections.length > 0) result.children.push(...sections);
  return result;
}
const transformRoomCeiling = (ceiling:any)=>{
  if(!ceiling) return null;
  const ceil:TreeItem = {
    id: globalIndex++,
    header: 'root-ceiling',
    type: 'ceiling',
    label: ceiling.comment,
    rawData: ceiling,
    children: []
  };
  const sections = transformCeilingSections(ceiling.sections);
  if(sections.length > 0) ceil.children.push(...sections)
  return ceil;
}
//TODO: Объеденить в один метод, передавать в него тип секции
const transformFloorSections = (sections: any) => {
  if (!sections || sections.length === 0) return [];
  const result: TreeItem[] = [];
  sections.forEach((section: any) => {
    const sectionNode = {
      id: globalIndex++,
      header: 'section',
      type: 'floor-section',
      label: section.comment,
      rawData: section,
      children: []
    }
    result.push(sectionNode);
  });
  return result;
}
const transformCeilingSections = (sections:any)=>{
  if(!sections || sections.length === 0) return [];
  const result:TreeItem[] = [];
  sections.forEach((section:any)=>{
    const sectionNode = {
      id: globalIndex++,
      header: 'section',
      type: 'ceiling-section',
      label: section.comment,
      rawData: section,
      children: []
    }
    result.push(sectionNode);
  });
  return result;
}
const createOpenings = (parent:any[],openings: any[]) => {
  // let result:PlanOpening[] = [];
  openings.forEach((opening: any,i:number) => {
    parent.push({
      id: globalIndex++,
      header: 'opening',
      type: 'opening',
      label: `${opening.comment}`,
      rawData: opening
    });
  })
  // return result;
}
transformPlanJson(planJson);

</script>

<style scoped>

</style>
