import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { NodeJSON } from "../Node";
import { copyToClipboard } from "../util";

import { currentGraphJsonAtom } from "../actions";
import { replaceNodeIds } from "../Graph";

// selected nodes
export const selectedNodesAtom = atom<NodeJSON[]>([]);
export function useSelectedNodes() {
  return useAtomValue(selectedNodesAtom);
}
export function useSetSelected() {
  return useUpdateAtom(selectedNodesAtom);
}

export const selectedGraphAtom = atom((get) => {
  const graph = get(currentGraphJsonAtom);
  return {
    nodes: get(selectedNodesAtom),
  };
});

const selectedAtomJSON = atom(
  (get) => {
    const graph = get(selectedGraphAtom);
    return graph;
  },
  (get) => {
    const json = get(selectedAtomJSON);
    const json_ = replaceNodeIds(json, (i) => i.toString());
    copyToClipboard(JSON.stringify(json_));
  }
);

export function useCopyToClipboard() {
  const set = useUpdateAtom(selectedAtomJSON);
  return () => set();
}
