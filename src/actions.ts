import { atom, useAtom } from "jotai";
import { createNode } from "./Node";
import { currentScopeAtom } from "./Scope";
import type { Node } from "./Node";

export const currentNodesAtom = atom((get) => get(get(currentScopeAtom).nodes));

export const appendNode = atom(null, (get, set, node: Node) => {
  const currentScope = get(currentScopeAtom);
  set(currentScope.nodes, (prev) => [...prev, node]);
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

  const currentScope = get(currentScopeAtom);
  set(currentScope.nodes, (prev) => prev.filter((na) => !nodes.includes(na)));
});
