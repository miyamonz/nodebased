import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { SetStateAction } from "jotai/core/types";
import { createNodeByName } from "./Node";
import { currentGraphAtom } from "./Graph/atoms";
import { removeNodeFromGraphAtom } from "./Graph";
import type { Node } from "./Node";
import type { Edge } from "./Edge";
import type { Graph } from "./Graph";

import equal from "fast-deep-equal";

export { currentGraphAtom };
export const currentNodesAtom = atom<Node[], SetStateAction<Node[]>>(
  (get) => get(get(currentGraphAtom).nodes),
  (get, set, action: SetStateAction<Node[]>) => {
    const graph = get(currentGraphAtom);
    set(graph.nodes, action);
  }
);
export const currentEdgesAtom = atom<
  Edge<unknown>[],
  SetStateAction<Edge<unknown>[]>
>(
  (get) => get(get(currentGraphAtom).edges),
  (get, set, action: SetStateAction<Edge<unknown>[]>) => {
    const graph = get(currentGraphAtom);
    set(graph.edges, action);
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

const removeNode = atom(null, (get, set, args: Node | Node[]) => {
  const nodes = Array.isArray(args) ? args : [args];
  set(removeNodeFromGraphAtom, { targetGraphAtom: currentGraphAtom, nodes });
});

export function useRemoveNode() {
  return useUpdateAtom(removeNode);
}

// edge
export const appendEdgeAtom = atom(null, (get, set, edge: Edge<unknown>) => {
  const edgesAtom = get(currentGraphAtom).edges;
  set(edgesAtom, (prev) => [
    ...prev.filter((conn) => !equal(conn.to, edge.to)),
    edge,
  ]);
});

// graph
const mergeGraphAtom = atom(null, (get, set, graph: Graph) => {
  get(graph.edges).forEach((c) => {
    const edgesAtom = get(currentGraphAtom).edges;
    set(edgesAtom, (prev) => [...prev, c]);
  });
  get(graph.nodes).forEach((n) => set(appendNode, n));
});
export function useMergeGraph() {
  return useUpdateAtom(mergeGraphAtom);
}
