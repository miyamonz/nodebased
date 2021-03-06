import { atom, useAtom } from "jotai";
import type { NodeAtom } from "../Node";
import type { Rect } from "../Rect";

//drag rect
export const selectRectAtom = atom<Rect | null>(null);
export function useSelectRectAtom() {
  const [rect] = useAtom(selectRectAtom);
  return rect;
}

// selected nodes
export const selectedNodesAtom = atom<NodeAtom[]>([]);
export function useSelectedNodes() {
  const [nodes] = useAtom(selectedNodesAtom);
  return nodes;
}

export function useSetSelected() {
  return useAtom(selectedNodesAtom)[1];
}
