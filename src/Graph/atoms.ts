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
  onPop: (json: GraphJSON) => void;
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

const toGraphAtom = atom(
  null,
  (
    get,
    _set,
    { json, callback }: { json: GraphJSON; callback: (graph: Graph) => void }
  ) => {
    const graph = jsonToGraph(get)(json);
    callback(graph);
  }
);
export function usePushGraphJSON() {
  const callback = useUpdateAtom(pushGraphAtom);
  const setJson = useUpdateAtom(toGraphAtom);
  return (json: GraphJSON, onPop: GraphStack["onPop"]) => {
    setJson({ json, callback: (graph) => callback({ graph, onPop }) });
  };
}

export const popGraphAtom = atom(null, (get, set) => {
  set(graphStackAtom, (prev) => {
    const popped = prev[prev.length - 1];
    if ("onPop" in popped) {
      popped.onPop(graphToJson(get)(popped.graph));
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
    const osockets = nodes.flatMap((n) => get(n.osockets));
    const isockets = nodes.flatMap((n) => get(n.isockets));
    const shouldDisConnect = (c: Connection<unknown>) => {
      const from = osockets.map((s) => s.atom).includes(c.from.atom);
      const to = isockets.map((s) => s.ref).includes(c.to.ref);
      return from || to;
    };

    set(graph.connections, (prev) => [
      ...prev.filter((c) => !shouldDisConnect(c)),
    ]);

    // remove node
    set(graph.nodes, (prev) => prev.filter((na) => !nodes.includes(na)));
  }
);
