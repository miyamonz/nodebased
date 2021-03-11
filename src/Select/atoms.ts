import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { Node } from "../Node";
import { copyToClipboard } from "../util";

import { getGraphViewByNodes, graphToJson } from "../Graph";

// selected nodes
export const selectedNodesAtom = atom<Node[]>([]);
export function useSelectedNodes() {
  return useAtomValue(selectedNodesAtom);
}
export function useSetSelected() {
  return useUpdateAtom(selectedNodesAtom);
}

export const selectedGraphAtom = atom(() => {
  return getGraphViewByNodes(selectedNodesAtom);
});

const selectedAtomJSON = atom(
  (get) => {
    const graph = get(selectedGraphAtom);
    return graphToJson(get)(graph);
  },
  (get) => {
    const json = get(selectedAtomJSON);
    copyToClipboard(JSON.stringify(json));
  }
);

export function useCopyToClipboard() {
  const set = useUpdateAtom(selectedAtomJSON);
  return () => set();
}
