import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { SetStateAction } from "jotai/core/types";
import { createNodeByName } from "./Node";
import { currentGraphAtom, removeNodeFromGraphAtom } from "./Graph";
import type { Node } from "./Node";
import type { Connection } from "./Connect";
import type { Graph } from "./Graph";

export const currentNodesAtom = atom<Node[], SetStateAction<Node[]>>(
  (get) => get(get(currentGraphAtom).nodes),
  (get, set, action: SetStateAction<Node[]>) => {
    const graph = get(currentGraphAtom);
    set(graph.nodes, action);
  }
);

// node
const appendNode = atom(null, (_get, set, node: Node) => {
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

const removeNode = atom(null, (_get, set, args: Node | Node[]) => {
  const nodes = Array.isArray(args) ? args : [args];
  set(removeNodeFromGraphAtom, { targetGraphAtom: currentGraphAtom, nodes });
});

export function useRemoveNode() {
  return useUpdateAtom(removeNode);
}

// connection
export const appendConnectionAtom = atom(
  null,
  (get, set, c: Connection<unknown>) => {
    const connectionsAtom = get(currentGraphAtom).connections;
    set(connectionsAtom, (prev) => [...prev, c]);
  }
);

// graph
const mergeGraphAtom = atom(null, (get, set, graph: Graph) => {
  get(graph.nodes).map((n) => set(appendNode, n));

  get(graph.connections).map((c) => {
    const connectionsAtom = get(currentGraphAtom).connections;
    set(connectionsAtom, (prev) => [...prev, c]);
  });
});
export function useMergeGraph() {
  return useUpdateAtom(mergeGraphAtom);
}
