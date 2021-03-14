import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { atom } from "jotai";
import type { Atom } from "jotai";
import { createGraph } from "./funcs";
import { jsonToGraph, graphToJson } from "./json";
import type { Graph, GraphJSON } from "./types";

import type { Node } from "../Node";
import type { Connection } from "../Connect";

type GraphStack = {
  graph: Graph;
  onPop: (graph: Graph) => void;
};

const rootGraph = createGraph([]); //empty graph
const graphStackAtom = atom<GraphStack[]>([]);

export const currentGraphAtom = atom<Graph>((get) => {
  const stack = get(graphStackAtom);
  return stack.length > 0 ? stack[stack.length - 1].graph : rootGraph;
});
export const currentGraphJsonAtom = atom<GraphJSON>((get) => {
  const graph = get(currentGraphAtom);
  return graphToJson(get)(graph);
});

const dropStackAtom = atom(null, (get, set) => {
  let stack = get(graphStackAtom);
  for (let i = 0; i < stack.length; i++) {
    set(popGraphAtom, null);
  }
});

export function useCurrentIsRoot() {
  const currentGraph = useAtomValue(currentGraphAtom);
  return currentGraph === rootGraph;
}

const pushGraphAtom = atom(null, (_get, set, graphStack: GraphStack) => {
  set(graphStackAtom, (prev) => [...prev, graphStack]);
});
export function usePushGraphJSON() {
  const callback = useUpdateAtom(pushGraphAtom);
  return (json: GraphJSON, onPop: GraphStack["onPop"]) => {
    const graph = jsonToGraph(json);
    callback({ graph, onPop });
  };
}

export const popGraphAtom = atom(null, (_get, set) => {
  set(graphStackAtom, (prev) => {
    const popped = prev[prev.length - 1];
    if ("onPop" in popped) {
      popped.onPop(popped.graph);
    }
    prev.pop();
    return [...prev];
  });
});

export function useSetRootGraph() {
  return useUpdateAtom(dropStackAtom);
}

// remove
export const removeNodeFromGraphAtom = atom(
  null,
  (
    get,
    set,
    { targetGraphAtom, nodes }: { targetGraphAtom: Atom<Graph>; nodes: Node[] }
  ) => {
    // remove connection
    const graph = get(targetGraphAtom);
    const shouldDisConnect = (c: Connection<unknown>) => {
      const from = nodes.flatMap((n) => n.outputs).includes(c.from);
      const to = nodes.flatMap((n) => n.inputs).includes(c.to);
      return from || to;
    };
    set(graph.connections, (prev) => [
      ...prev.filter((c) => !shouldDisConnect(c)),
    ]);

    //disconnect
    nodes
      .flatMap((node) => node.inputs)
      .forEach((isocket) => {
        set(isocket.ref, atom(get(isocket.atom)));
      });

    // remove node
    set(graph.nodes, (prev) => prev.filter((na) => !nodes.includes(na)));
  }
);
