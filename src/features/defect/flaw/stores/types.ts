import {StructElem} from "src/features/lookup/struct-elem/stores/types";
import {Material} from "src/features/lookup/material/stores/types";
import {Standard} from "src/features/lookup/standard/stores/types";

export type Defect = {
  id?: number,
  template: string,
  structElem: StructElem,
  material?: Material,
  flaw?: Flaw,
  standard?: Standard,
  hasValue: boolean,
  hasCause: boolean
}

export type Flaw = {
  id?: number,
  name: string
}
