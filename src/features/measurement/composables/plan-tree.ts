import { storeToRefs } from "pinia"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { usePlanTreeStore } from "../stores/plan-tree-store"
import { tpcMeasurementApi } from "../api/tpc-measurement-api"
import { Room, TreeItem, Wall, Walls } from "../stores/types"


export const usePlanTreeService = () => {
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())
    const { planMeasurements, treeData } = storeToRefs(usePlanTreeStore())

    const requestPlanTree = async () => {
        const response = await tpcMeasurementApi.getTpcMeasurements(selectedInspectionId.value!)
        treeData.value =  transformPlanJson(response.data.rooms || [])
        planMeasurements.value = response.data
    }

    const savePlanTree = async () => {
        await tpcMeasurementApi.saveTpcMeasurements(selectedInspectionId.value!, planMeasurements.value)
    }

    return {
        savePlanTree,
        requestPlanTree
    }
}

const transformPlanJson = (planJson: any): object[] => {
  let globalIndex = 0;


const createRoom = (room: any) => {
  const resultRoom: Room = {
    id: globalIndex++,
    header: 'room',
    type: 'room',
    label: room.comment,
    rawData: room,
    children: []
  };
  const walls: Walls = {
    id: globalIndex++,
    header: 'root-walls',
    type: 'root-walls',
    label: `Стены`,
    rawData: room.walls,
    children: []
  }
  const movabelObjects: TreeItem = {
    id: globalIndex++,
    header: 'movable-objects',
    type: 'movable-objects',
    label: `Перемещаемые объекты`,
    rawData: room.objects || [],
    children: []
  }
  const transformedWalls = createWalls(room.walls);
  //walls.children.push(...transformedWalls)
  //resultRoom.children.push(walls);
  resultRoom.children.push(...transformedWalls);
  const rootFloor = transformRoomFloor(room.floor);
  const rootCeiling = transformRoomCeiling(room.ceiling);
  resultRoom.children.push(rootFloor);
  resultRoom.children.push(rootCeiling);
  const treeMovableObjects = transformMovableObjects(room.objects);
  if (treeMovableObjects.length > 0) {
    movabelObjects.children.push(...treeMovableObjects);
    resultRoom.children.push(movabelObjects);
  }
  // room.walls.forEach((wall: any,i:number) => {
  //   resultRoom.children.push(createWall(i,wall));
  // });
  return resultRoom;
}
const createWall = (i: number, wall: any) => {
  return {
    id: globalIndex++,
    type: 'wall',
    label: `Стена-${i + 1} (${wall.comment})`,
    rawData: wall,
    children: []
  }
}
const createWalls = (walls: any) => {
  const resultWalls: Wall[] = [];

  walls.forEach((wall: any, i: number) => {
    const newWall: Wall = {
      id: globalIndex++,
      header: 'wall',
      type: 'wall',
      index: i + 1,
      label: wall.comment,
      rawData: wall,
      children: []
    }
    createOpenings(newWall.children, wall.openings);
    const wallSections = creatWallSections(wall.sections);
    if (wallSections.length > 0) newWall.children.push(...wallSections);
    // const ceil:any = {
    //   id: globalIndex++,
    //   label: `Потолок`
    // }
    // newWall.children.push(ceil);
    resultWalls.push(newWall);
  });
  return resultWalls;
}
const creatWallSections = (sections: any) => {
  const result: TreeItem[] = [];
  sections.forEach((section: any) => {
    const newSection: TreeItem = {
      id: globalIndex++,
      header: 'wall-section',
      type: 'wall-section',
      label: section.comment,
      rawData: section,
      children: []
    }
    createOpenings(newSection.children, section.openings);
    // const openings = transformWallSectionOpenings(sections.openings);
    // if (openings.length > 0) newSection.children.push(...openings);
    result.push(newSection);
  });
  return result;
}
const transformWallSectionOpenings = (openings: any) => {
  const result: TreeItem[] = [];
  if (!openings || openings.length === 0) return [];
  return result;
}
const transformRoomFloor = (floor: any) => {
  if (!floor) return null;
  const result: TreeItem = {
    id: globalIndex++,
    header: 'root-floor',
    type: 'floor',
    label: floor.comment,
    rawData: floor,
    children: []
  }
  const sections = transformFloorSections(floor.sections);
  if (sections.length > 0) result.children.push(...sections);
  return result;
}
const transformRoomCeiling = (ceiling: any) => {
  if (!ceiling) return null;
  const ceil: TreeItem = {
    id: globalIndex++,
    header: 'root-ceiling',
    type: 'ceiling',
    label: ceiling.comment,
    rawData: ceiling,
    children: []
  };
  const sections = transformCeilingSections(ceiling.sections);
  if (sections.length > 0) ceil.children.push(...sections)
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
const transformCeilingSections = (sections: any) => {
  if (!sections || sections.length === 0) return [];
  const result: TreeItem[] = [];
  sections.forEach((section: any) => {
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
const createOpenings = (parent: any[], openings: any[]) => {
  // let result:PlanOpening[] = [];
  openings.forEach((opening: any, i: number) => {
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

const transformMovableObjects = (objects: any) => {
  if (!objects || objects.length === 0) return [];
  const result: TreeItem[] = [];
  objects.forEach((item: any) => {
    const objectNode:TreeItem = {
      id: globalIndex++,
      header: 'movable-item',
      type: 'movable-item',
      label: item.comment,
      rawData: item,
      children: []
    }
    result.push(objectNode);
  });
  return result;
}

  const result: object[] = [];
  planJson.forEach((room: any) => {
    const roomNode = createRoom(room);
    // createWalls(roomNode.children, room.walls);
    result.push(roomNode);
  });
  return result
}

