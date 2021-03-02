import { atom, useAtom } from "jotai";
import { createNodeAtomFromPosition } from "./Node";
import type { NodeAtom } from "./Node";
import { currentScopeAtom } from "./Scope";

export const currentNodesAtom = atom((get) => get(get(currentScopeAtom).nodes));

export const appendNodeAtom = atom(
  null,
  (get, set, args: Parameters<typeof createNodeAtomFromPosition>[0]) => {
    const nodeAtom = createNodeAtomFromPosition(args);

    const currentScope = get(currentScopeAtom);
    set(currentScope.nodes, (prev) => [...prev, nodeAtom]);
  }
);
export function useAppendNode() {
  const [, set] = useAtom(appendNodeAtom);
  return set;
}

export const removeNodeAtom = atom(
  null,
  (get, set, args: NodeAtom | NodeAtom[]) => {
    const nodeAtoms = Array.isArray(args) ? args : [args];

    const currentScope = get(currentScopeAtom);
    set(currentScope.nodes, (prev) =>
      prev.filter((na) => !nodeAtoms.includes(na))
    );
  }
);
