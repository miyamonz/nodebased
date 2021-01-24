import { atom } from "jotai";

import { createNodeAtom, NodeAtom } from "./Node";
export type { Node, NodeAtom, PositionAtom } from "./Node";
export type { InputSocket, OutputSocket } from "./Node";
export type { InputAtom, OutputAtom } from "./Node";

export {
  dragTargetAtom,
  connectTargetAtom,
  dragAtom,
  hoveredInputSocketAtom,
} from "./drag";

export const nodeAtomListAtom = atom<NodeAtom[]>([]);

export const addNodeAtom = atom(null, (get, set) => {
  const nodeAtom = createNodeAtom({ x: 100, y: 20 });
  set(nodeAtomListAtom, [...get(nodeAtomListAtom), nodeAtom]);
});
