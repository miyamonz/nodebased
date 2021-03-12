import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { SetStateAction } from "jotai/core/types";
import { createNodeByName } from "./Node";
import { currentGraphAtom } from "./Graph";
import type { Node } from "./Node";

export const currentNodesAtom = atom<Node[], SetStateAction<Node[]>>(
  (get) => get(get(currentGraphAtom).nodes),
  (get, set, action: SetStateAction<Node[]>) => {
    const graph = get(currentGraphAtom);
    set(graph.nodes, action);
  }
);

export const appendNode = atom(null, (_get, set, node: Node) => {
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

  nodes
    .flatMap((node) => node.inputs)
    .forEach((isocket) => {
      set(isocket.ref, atom(get(isocket.atom)));
    });

  set(currentNodesAtom, (prev) => prev.filter((na) => !nodes.includes(na)));
});

export function useRemoveNode() {
  return useUpdateAtom(removeNode);
}
