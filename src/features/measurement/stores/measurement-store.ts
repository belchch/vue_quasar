import { defineStore, storeToRefs } from "pinia"
import { OpeningMeasurement, RoomMeasurement, CeilSectionMeasurement, FloorSectionMeasurement, WallSectionMeasurement, FixedAssetMeasurament } from "./types"
import { computed, ref } from "vue"
import { useOpeningStore } from "src/features/lookup/opening/opening-store"
import InspectionLocations from "src/features/inspection/components/InspectionLocations.vue"
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import _ from "lodash"

export const useMeasurementStore = defineStore('room-measurements', () => {
    const roomMeasurements = ref<RoomMeasurement[]>()
    const openingMeasurements = ref<OpeningMeasurement[]>([])
    const ceilSectionMeasurements = ref<CeilSectionMeasurement[]>([])
    const floorSectionMeasurements = ref<FloorSectionMeasurement[]>([])
    const wallSectionMeasurements = ref<WallSectionMeasurement[]>([])
    const fixedAssetMeasurements = ref<FixedAssetMeasurament[]>([])
    const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())

    const allRoomMeasurements = computed(() => {
        const roomWithNum:RoomMeasurement[] = [];
        inspectionSpots.value.filter(item => item.inUse && item.spot.isRoom).forEach(item=>{
            for(let i=0;i<item.count;i++){
              roomWithNum.push({
                inspectionId: selectedInspectionId.value!,
                room: item.spot,
                roomNum : (item.count>1)?i+1:null
              })
            }
        });
        const resultWithNum = roomWithNum.map(item=>{
          const roomMeasurement = roomMeasurements.value?.find((rm) =>{
            if(rm.room.id != item.room.id) return false;
            if(rm.roomNum == item.roomNum) return true;
            if(rm.roomNum == null && item.roomNum == 1) return true;
            if(rm.roomNum == 1 && item.roomNum == null) return true;
            return false;
          });
          return roomMeasurement || item;
        });
        return _.sortBy(resultWithNum, 'room.name')
        // const result = inspectionSpots.value.filter(item => item.inUse && item.spot.isRoom)
        //     .map(item => {
        //         const roomMeasurement = roomMeasurements.value?.find(rm => rm.room.id == item.spot.id)

        //         return roomMeasurement || {
        //             inspectionId: selectedInspectionId.value!,
        //             room: item.spot,
        //         } as RoomMeasurement
        //     })

        // return _.sortBy(result, 'room.name')
    })
    type SectionsTypes = CeilSectionMeasurement[] | FloorSectionMeasurement[] | WallSectionMeasurement[] | FixedAssetMeasurament[];
    const _findItemsByIdAndNum = (items: SectionsTypes, id: number, num?: number | null) => {
      const filteredRoom = items.filter(item=>item.room.id == id);
      const result = [];
      for(let i=0;i<filteredRoom.length;i++){
        const fItem = filteredRoom[i];
        if(fItem?.roomNum == num) result.push(fItem);
        else if (num == null && fItem?.roomNum == 1) result.push(fItem);
      }
      return result;
      // if(typeof num === 'undefined') return filteredRoom;
      // return filteredRoom?.filter(item=>item.roomNum === num) || [];
    }
    const getRoomCeilSections = computed(() => {
      return (roomId:number,roomNum?:number)=>{
        return _findItemsByIdAndNum(ceilSectionMeasurements.value,roomId,roomNum);
        // const allRoomSections = ceilSectionMeasurements.value.filter(item=>item.room.id == roomId)
        // if(roomNum){
        //   return allRoomSections?.filter(item=>item.roomNum == roomNum) || [];
        // } else  return allRoomSections;
      }
    })

    const getFloorCeilSections = computed(() => {
      return (roomId:number,roomNum?:number)=>{
        return _findItemsByIdAndNum(floorSectionMeasurements.value,roomId,roomNum)
      }
    })
    const getWallCeilSections = computed(() => {
      return (roomId:number,roomNum?:number)=>{
        return _findItemsByIdAndNum(wallSectionMeasurements.value,roomId,roomNum)
      }
    })
    const getFixedAssets = computed(() => {
      return (roomId:number,roomNum?:number)=>{
        return _findItemsByIdAndNum(fixedAssetMeasurements.value,roomId,roomNum)
      }
    })
    return {
        allRoomMeasurements,
        roomMeasurements,
        openingMeasurements,
        ceilSectionMeasurements,
        floorSectionMeasurements,
        wallSectionMeasurements,
        fixedAssetMeasurements,
        getRoomCeilSections,
        getFloorCeilSections,
        getWallCeilSections,
        getFixedAssets
    }
})
