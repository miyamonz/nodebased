import { atom } from "jotai";

import { createNodeAtom, NodeAtom } from "./Node";
import type { Position } from "../types";
import type { Operator } from "../Operator";

export type { Node, NodeAtom, PositionAtom } from "./Node";
export type { InputSocket, OutputSocket } from "../Socket";
export type { InputAtom, OutputAtom } from "./Node";

export {
  dragTargetAtom,
  connectTargetAtom,
  dragAtom,
  hoveredInputSocketAtom,
} from "./drag";

export const nodeAtomListAtom = atom<NodeAtom<any, any>[]>([]);

export const addNodeAtom = atom(
  null,
  (get, set, { position, op }: { position: Position; op: Operator }) => {
    const nodeAtom = createNodeAtom({ position, op });
    set(nodeAtomListAtom, [...get(nodeAtomListAtom), nodeAtom]);
  }
);

//mouse
type Pos = readonly [number, number];
export const mousePosAtom = atom<Pos>([0, 0]);
