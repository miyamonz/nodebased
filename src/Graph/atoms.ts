import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { atom } from "jotai";
import { createGraphByNode } from "./funcs";
import { useCreateGraph } from "./json";
import type { Graph, GraphJSON } from "./types";

const rootGraph = createGraphByNode([]);
export const currentGraphAtom = atom<Graph>(rootGraph);

const rootGraphAtom = atom<Graph>((_get) => rootGraph);
const setRootGraphAtom = atom(null, (get, set) => {
  set(currentGraphAtom, get(rootGraphAtom));
});

export function useCurrentIsRoot() {
  const currentGraph = useAtomValue(currentGraphAtom);
  return currentGraph === rootGraph;
}

const setGraphAtom = atom(null, (get, set, graph: Graph) => {
  set(currentGraphAtom, graph);
});
export function useSetGraphJSON() {
  const callback = useUpdateAtom(setGraphAtom);
  const jsonToGraph = useCreateGraph();
  return (json: GraphJSON) => {
    const graph = jsonToGraph(json);
    callback(graph);
  };
}

export function useSetRootGraph() {
  return useUpdateAtom(setRootGraphAtom);
}
