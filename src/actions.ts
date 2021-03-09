import { atom, useAtom } from "jotai";
import type { SetStateAction } from "jotai/core/types";
import { createNode } from "./Node";
import { currentGraph } from "./Graph";
import type { Node } from "./Node";

export const currentNodesAtom = atom<Node[], SetStateAction<Node[]>>(
  (get) => get(get(currentGraph).nodes),
  (get, set, action: SetStateAction<Node[]>) => {
    const graph = get(currentGraph);
    set(graph.nodes, action);
  }
);

export const appendNode = atom(null, (_get, set, node: Node) => {
  set(currentNodesAtom, (prev) => [...prev, node]);
});

type NodeProp = Parameters<typeof createNode>[0];
export function useAppendNodeByName() {
  const [, append] = useAtom(appendNode);
  const set = (prop: NodeProp) => {
    const node = createNode(prop);
    append(node);
  };
  return set;
}
export function useAppendNode() {
  const [, set] = useAtom(appendNode);
  return set;
}

export const removeNode = atom(null, (get, set, args: Node | Node[]) => {
  const nodes = Array.isArray(args) ? args : [args];

  nodes
    .flatMap((node) => node.inputs)
    .forEach((isocket) => {
      set(isocket.ref, atom(get(isocket.atom)));
    });

  set(currentNodesAtom, (prev) => prev.filter((na) => !nodes.includes(na)));
});
