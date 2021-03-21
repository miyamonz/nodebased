import { atom, PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai/optics";
import { withImmer } from "jotai/immer";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { GraphJSON } from "./types";

import type { NodeJSON } from "../Node";

type GraphStack = {
  graph: typeof rootGraphJsonAtom;
  onPop: (json: GraphJSON) => void;
};

const rootGraphJsonAtom: PrimitiveAtom<GraphJSON> = atom<GraphJSON>({
  nodes: [],
});
export const graphStackAtom = atom<GraphStack[]>([]);

export const currentGraphJsonAtom: typeof rootGraphJsonAtom = atom(
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
export const currentNodesAtom = focusAtom(currentGraphJsonAtom, (optics) =>
  optics.prop("nodes")
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

export function usePushGraphJSON() {
  const push = useUpdateAtom(pushGraphAtom);
  return (json: GraphJSON, onPop: GraphStack["onPop"]) => {
    push({ graph: atom(json), onPop });
  };
}

export const popGraphAtom = atom(null, (get, set) => {
  const graph = get(currentGraphJsonAtom);
  set(graphStackAtom, (prev) => {
    const popped = prev[prev.length - 1];
    if ("onPop" in popped) {
      popped.onPop(graph);
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
    _get,
    set,
    {
      targetGraphAtom,
      nodes,
    }: { targetGraphAtom: typeof rootGraphJsonAtom; nodes: NodeJSON[] }
  ) => {
    // remove edge
    const osockets = nodes.flatMap((n) => n.osockets);

    set(withImmer(targetGraphAtom), (graph) => {
      graph.nodes.forEach((node) => {
        node.isockets.forEach((isocket) => {
          const disconnect =
            isocket.from !== undefined &&
            node.name === isocket.from.nodeId &&
            osockets.map((s) => s.name).includes(isocket.from.socketName);
          if (disconnect) {
            isocket.from = undefined;
          }
        });
      });
    });

    // remove node
    set(currentNodesAtom, (nodes) => nodes.filter((na) => !nodes.includes(na)));
  }
);
