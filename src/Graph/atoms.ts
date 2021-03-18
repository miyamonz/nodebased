import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { Atom, PrimitiveAtom } from "jotai";
import { graphToJson } from "./json";
import { currentGraphAtom } from "../actions";
import type { Graph, GraphJSON } from "./types";

import type { Node } from "../Node";
import type { Connection } from "../Connect";

type GraphStack = {
  graph: PrimitiveAtom<GraphJSON>;
  onPop: (json: GraphJSON) => void;
};

const rootGraphJsonAtom = atom<GraphJSON>({ nodes: [], connections: [] });
export const graphStackAtom = atom<GraphStack[]>([]);

export const currentGraphJsonAtom: PrimitiveAtom<GraphJSON> = atom(
  (get) => {
    const stack = get(graphStackAtom);
    return stack.length > 0
      ? get(stack[stack.length - 1].graph)
      : get(rootGraphJsonAtom);
  },
  (get, set, newJson) => {
    const stack = get(graphStackAtom);
    const graphJsonAtom =
      stack.length > 0 ? stack[stack.length - 1].graph : rootGraphJsonAtom;
    set(graphJsonAtom, newJson);
  }
);

const dropStackAtom = atom(null, (get, set) => {
  let stack = get(graphStackAtom);
  for (let i = 0; i < stack.length; i++) {
    set(popGraphAtom, null);
  }
});

export function useCurrentIsRoot() {
  const stack = useAtomValue(graphStackAtom);
  return stack.length === 0;
}

const pushGraphAtom = atom(null, (_get, set, graphStack: GraphStack) => {
  set(graphStackAtom, (prev) => [...prev, graphStack]);
});

const saveAtom = atom(null, (get, set) => {
  // save graph to json
  const graph = get(currentGraphAtom);
  set(currentGraphJsonAtom, graphToJson(get)(graph));
});
export function usePushGraphJSON() {
  const save = useUpdateAtom(saveAtom);
  const push = useUpdateAtom(pushGraphAtom);
  return (json: GraphJSON, onPop: GraphStack["onPop"]) => {
    save();
    push({ graph: atom(json), onPop });
  };
}

export const popGraphAtom = atom(null, (get, set) => {
  const graph = get(currentGraphAtom);
  const json = graphToJson(get)(graph);
  set(graphStackAtom, (prev) => {
    const popped = prev[prev.length - 1];
    if ("onPop" in popped) {
      popped.onPop(json);
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
    const ids = nodes.map((n) => n.id);
    const shouldDisConnect = (c: Connection<unknown>) => {
      const from =
        osockets.map((s) => s.name).includes(c.from.name) &&
        ids.includes(c.from.nodeId);
      const to =
        isockets.map((s) => s.name).includes(c.to.name) &&
        ids.includes(c.to.nodeId);
      return from || to;
    };

    set(graph.connections, (prev) => [
      ...prev.filter((c) => !shouldDisConnect(c)),
    ]);

    // remove node
    set(graph.nodes, (prev) => prev.filter((na) => !nodes.includes(na)));
  }
);
