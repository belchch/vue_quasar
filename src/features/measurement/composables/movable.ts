
import { storeToRefs } from "pinia"
import { useMovableStore } from "../stores/movable-store"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { MovableObjectApi } from "../api/movable-object-api"
import { MovableCreateRequest, MovableUpdateRequest } from "../api/types"
export const useMovableSrvice = () => {
    const movableStore = useMovableStore();
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())
    const requestMovables = async () => {
      const response = await MovableObjectApi.get(selectedInspectionId.value!!);
      movableStore.movables = response.data;
    }
    const createMovable = async (request:MovableCreateRequest) => {
      const response = await MovableObjectApi.create(request);
      movableStore.addItem(response.data);
    }

    const deleteMovable = async (id: number) => {
      await MovableObjectApi.delete(id);
      movableStore.removeItemById(id);
    }
    const updateMovable = async (movableId:number,request: MovableUpdateRequest) => {
      await MovableObjectApi.update(movableId,request);
      await requestMovables();
    }

    return {
      requestMovables,
      createMovable,
      deleteMovable,
      updateMovable
    }

}
