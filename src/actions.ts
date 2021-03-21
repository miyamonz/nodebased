import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { createNodeByName } from "./Node";
import { currentGraphJsonAtom, currentNodesAtom } from "./Graph/atoms";
import { removeNodeFromGraphAtom } from "./Graph";
import type { NodeJSON } from "./Node";
import type { GraphJSON } from "./Graph";

export { currentGraphJsonAtom, currentNodesAtom };

// node
const appendNode = atom(null, (_get, set, node: NodeJSON) => {
  set(currentNodesAtom, (prev) => [...prev, node]);
});

type NodeProp = Parameters<typeof createNodeByName>[0];
export function useAppendNodeByName() {
  const append = useUpdateAtom(appendNode);
  const set = (prop: NodeProp) => {
    const node = createNodeByName(prop);
    append(node);
  };
  return set;
}
export function useAppendNode() {
  return useUpdateAtom(appendNode);
}

const removeNode = atom(null, (_get, set, args: NodeJSON | NodeJSON[]) => {
  const nodes = Array.isArray(args) ? args : [args];
  set(removeNodeFromGraphAtom, {
    targetGraphAtom: currentGraphJsonAtom,
    nodes,
  });
});
export function useRemoveNode() {
  return useUpdateAtom(removeNode);
}

// graph
const mergeGraphAtom = atom(null, (_get, set, graph: GraphJSON) => {
  graph.nodes.map((n) => set(appendNode, n));
});
export function useMergeGraph() {
  return useUpdateAtom(mergeGraphAtom);
}
