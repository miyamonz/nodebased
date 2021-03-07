import { atom, useAtom } from "jotai";
import { createNodeAtomFromPosition } from "./Node";
import { currentScopeAtom } from "./Scope";
import type { NodeAtom } from "./Node";
import type { Position } from "./Position";

export const currentNodesAtom = atom((get) => get(get(currentScopeAtom).nodes));

export const appendNodeAtom = atom(null, (get, set, nodeAtom: NodeAtom) => {
  const currentScope = get(currentScopeAtom);
  set(currentScope.nodes, (prev) => [...prev, nodeAtom]);
});
export function useAppendNodeByName() {
  const [, append] = useAtom(appendNodeAtom);
  const set = ({ name, position }: { name: string; position: Position }) => {
    const nodeAtom = createNodeAtomFromPosition(name, position);
    append(nodeAtom);
  };
  return set;
}
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
