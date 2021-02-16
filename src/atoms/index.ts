import { atom } from "jotai";

export type { InputSocket, OutputSocket } from "../Socket";

export {
  dragTargetAtom,
  connectTargetAtom,
  dragAtom,
  hoveredInputSocketAtom,
} from "./drag";

//mouse
type Pos = readonly [number, number];
export const mousePosAtom = atom<Pos>([0, 0]);
