import { atom, useAtom } from "jotai";
import { createNodeAtomFromPosition } from "./Node";
import type { NodeAtom } from "./Node";
import { currentScopeAtom } from "./Scope";

export const currentNodesAtom = atom((get) => get(get(currentScopeAtom).nodes));

export type CreateNodeProps = Parameters<typeof createNodeAtomFromPosition>[0];
export const appendNodeAtom = atom(null, (get, set, args: CreateNodeProps) => {
  const nodeAtom = createNodeAtomFromPosition(args);

  const currentScope = get(currentScopeAtom);
  set(currentScope.nodes, (prev) => [...prev, nodeAtom]);
});
export function useAppendNode() {
  const [, set] = useAtom(appendNodeAtom);
  return set;
}

export const removeNodeAtom = atom(
  null,
  (get, set, args: NodeAtom | NodeAtom[]) => {
    const nodeAtoms = Array.isArray(args) ? args : [args];

    nodeAtoms
      .map(get)
      .flatMap((node) => node.inputs)
      .forEach((isocket) => {
        set(isocket.ref, atom(get(isocket.atom)));
      });

    const currentScope = get(currentScopeAtom);
    set(currentScope.nodes, (prev) =>
      prev.filter((na) => !nodeAtoms.includes(na))
    );
  }
);
