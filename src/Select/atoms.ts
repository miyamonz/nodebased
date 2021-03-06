import { atom, useAtom } from "jotai";
import type { NodeAtom } from "../Node";

export const selectedNodesAtom = atom<NodeAtom[]>([]);
export function useSelectedNodes() {
  const [nodes] = useAtom(selectedNodesAtom);
  return nodes;
}

export function useSetSelected() {
  return useAtom(selectedNodesAtom)[1];
}
